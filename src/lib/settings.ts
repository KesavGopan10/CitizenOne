// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – Extension Settings (chrome.storage.local, unencrypted)
// ─────────────────────────────────────────────────────────────────────────────

import type { ExtensionSettings, ProviderConfig, ProviderKey } from '../types';

const SETTINGS_KEY = 'citizen_one_settings';

const DEFAULT_SETTINGS: ExtensionSettings = {
    activeProvider: 'gemini',
    providers: {
        gemini: {
            key: 'gemini',
            model: 'gemini-1.5-flash',
            enabled: true,
        },
        groq: {
            key: 'groq',
            model: 'llama3-8b-8192',
            enabled: false,
        },
        nvidia: {
            key: 'nvidia',
            baseUrl: 'https://integrate.api.nvidia.com/v1',
            model: 'meta/llama-3.1-70b-instruct',
            enabled: false,
        },
        ollama: {
            key: 'ollama',
            baseUrl: 'http://localhost:11434/v1',
            model: 'llama3',
            enabled: false,
        },
    },
    vaultExists: false,
    autoFill: false,
    highlightFields: true,
};

export async function getSettings(): Promise<ExtensionSettings> {
    return new Promise((resolve) => {
        chrome.storage.local.get([SETTINGS_KEY], (result) => {
            if (result[SETTINGS_KEY]) {
                // Merge with defaults to handle new fields in updates
                resolve({ ...DEFAULT_SETTINGS, ...result[SETTINGS_KEY] });
            } else {
                resolve(DEFAULT_SETTINGS);
            }
        });
    });
}

export async function saveSettings(settings: ExtensionSettings): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [SETTINGS_KEY]: settings }, () => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                resolve();
            }
        });
    });
}

export async function updateProvider(
    key: ProviderKey,
    config: Partial<ProviderConfig>,
): Promise<void> {
    const settings = await getSettings();
    settings.providers[key] = { ...settings.providers[key], ...config };
    await saveSettings(settings);
}

export async function setActiveProvider(key: ProviderKey): Promise<void> {
    const settings = await getSettings();
    settings.activeProvider = key;
    await saveSettings(settings);
}

export async function markVaultExists(exists: boolean): Promise<void> {
    const settings = await getSettings();
    settings.vaultExists = exists;
    await saveSettings(settings);
}
