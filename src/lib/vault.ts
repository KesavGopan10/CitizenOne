// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – AES-256 Encrypted Local Vault
// Uses CryptoJS for encryption so there's no Web Crypto API dependency issues
// in the extension context.
// ─────────────────────────────────────────────────────────────────────────────

import CryptoJS from 'crypto-js';
import type { Vault, VaultField } from '../types';

const VAULT_STORAGE_KEY = 'citizen_one_vault_encrypted';
const VAULT_SALT_KEY = 'citizen_one_vault_salt';
const VAULT_CHECK_KEY = 'citizen_one_vault_check';
const CHECK_PLAINTEXT = 'CITIZEN_ONE_VAULT_OK';

// ─── Key Derivation ──────────────────────────────────────────────────────────

function deriveKey(password: string, salt: string): string {
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 100_000,
        hasher: CryptoJS.algo.SHA256,
    });
    return key.toString();
}

function generateSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

// ─── Encrypt / Decrypt ───────────────────────────────────────────────────────

function encrypt(plaintext: string, key: string): string {
    return CryptoJS.AES.encrypt(plaintext, key).toString();
}

function decrypt(ciphertext: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// ─── Chrome Storage Helpers (promise-wrapped) ─────────────────────────────

async function storageGet<T>(keys: string[]): Promise<Record<string, T>> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (result) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                resolve(result as Record<string, T>);
            }
        });
    });
}

async function storageSet(items: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(items, () => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                resolve();
            }
        });
    });
}

// ─── Vault API ────────────────────────────────────────────────────────────────

/**
 * Returns true if a vault has been created (salt exists in storage).
 */
export async function vaultExists(): Promise<boolean> {
    const result = await storageGet<string>([VAULT_SALT_KEY]);
    return !!result[VAULT_SALT_KEY];
}

/**
 * Creates a brand-new vault protected by `masterPassword`.
 * Overwrites any existing vault.
 */
export async function createVault(
    masterPassword: string,
    initialFields: VaultField[] = [],
): Promise<void> {
    const salt = generateSalt();
    const key = deriveKey(masterPassword, salt);

    const emptyVault: Vault = { fields: initialFields, updatedAt: Date.now() };
    const encryptedVault = encrypt(JSON.stringify(emptyVault), key);
    const encryptedCheck = encrypt(CHECK_PLAINTEXT, key);

    await storageSet({
        [VAULT_SALT_KEY]: salt,
        [VAULT_STORAGE_KEY]: encryptedVault,
        [VAULT_CHECK_KEY]: encryptedCheck,
    });
}

/**
 * Unlocks the vault and returns the decrypted Vault object.
 * Throws if the password is wrong.
 */
export async function unlockVault(masterPassword: string): Promise<Vault> {
    const result = await storageGet<string>([
        VAULT_SALT_KEY,
        VAULT_STORAGE_KEY,
        VAULT_CHECK_KEY,
    ]);

    const salt = result[VAULT_SALT_KEY];
    const encryptedVault = result[VAULT_STORAGE_KEY];
    const encryptedCheck = result[VAULT_CHECK_KEY];

    if (!salt || !encryptedVault || !encryptedCheck) {
        throw new Error('No vault found. Please create one first.');
    }

    const key = deriveKey(masterPassword, salt);

    // Verify password before decrypting vault
    let checkPlain: string;
    try {
        checkPlain = decrypt(encryptedCheck, key);
    } catch {
        throw new Error('Incorrect master password.');
    }

    if (checkPlain !== CHECK_PLAINTEXT) {
        throw new Error('Incorrect master password.');
    }

    const vaultJson = decrypt(encryptedVault, key);
    return JSON.parse(vaultJson) as Vault;
}

/**
 * Saves the updated vault back to storage (requires re-encrypting).
 */
export async function saveVault(
    masterPassword: string,
    vault: Vault,
): Promise<void> {
    const result = await storageGet<string>([VAULT_SALT_KEY]);
    const salt = result[VAULT_SALT_KEY];

    if (!salt) {
        throw new Error('No vault found. Create one first.');
    }

    const key = deriveKey(masterPassword, salt);
    vault.updatedAt = Date.now();
    const encryptedVault = encrypt(JSON.stringify(vault), key);

    await storageSet({ [VAULT_STORAGE_KEY]: encryptedVault });
}

/**
 * Changes the master password by re-encrypting the vault with a new key.
 */
export async function changeMasterPassword(
    oldPassword: string,
    newPassword: string,
): Promise<void> {
    const vault = await unlockVault(oldPassword);
    await createVault(newPassword, vault.fields);
}

/**
 * Wipes the vault entirely from storage.
 */
export async function destroyVault(): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove(
            [VAULT_SALT_KEY, VAULT_STORAGE_KEY, VAULT_CHECK_KEY],
            () => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    resolve();
                }
            },
        );
    });
}

/**
 * Returns only vault field keys (labels) — safe to send to LLM.
 */
export function getVaultKeys(vault: Vault): string[] {
    return vault.fields.map((f) => f.key);
}

/**
 * Retrieves the value for a given key from the vault (in-memory only).
 */
export function getVaultValue(vault: Vault, key: string): string | undefined {
    return vault.fields.find((f) => f.key === key)?.value;
}
