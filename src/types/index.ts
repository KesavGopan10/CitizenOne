// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – Shared Types
// ─────────────────────────────────────────────────────────────────────────────

/** Supported AI provider keys */
export type ProviderKey = 'gemini' | 'groq' | 'nvidia' | 'ollama';

/** A single profile field stored in the vault */
export interface VaultField {
    key: string;        // e.g. "first_name"
    label: string;      // e.g. "First Name"
    value: string;      // encrypted at rest, decrypted in memory
    category: VaultCategory;
}

export type VaultCategory =
    | 'personal'
    | 'address'
    | 'identity'
    | 'contact'
    | 'financial'
    | 'other';

/** The full vault structure (decrypted in-memory) */
export interface Vault {
    fields: VaultField[];
    updatedAt: number;
}

/** Provider configuration stored in extension settings */
export interface ProviderConfig {
    key: ProviderKey;
    apiKey?: string;
    baseUrl?: string;
    model?: string;
    enabled: boolean;
}

/** Extension settings (stored unencrypted) */
export interface ExtensionSettings {
    activeProvider: ProviderKey;
    providers: Record<ProviderKey, ProviderConfig>;
    vaultExists: boolean;
    autoFill: boolean;
    highlightFields: boolean;
}

/** A stripped form element for the LLM */
export interface SemanticField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    name?: string;
    options?: string[]; // for select elements
    required?: boolean;
    context?: string;   // surrounding text context
}

/** The semantic map sent to the LLM */
export interface SemanticMap {
    url: string;
    title: string;
    fields: SemanticField[];
    totalFields: number;
}

/** LLM response: mapping field IDs to vault keys */
export type FieldMapping = Record<string, string>;

/** Fill result for a single field */
export interface FillResult {
    fieldId: string;
    success: boolean;
    mappedKey?: string;
    error?: string;
}

/** Messages between popup/options and background/content */
export type MessageType =
    | { type: 'GET_SEMANTIC_MAP' }
    | { type: 'FILL_FORM'; mapping: FieldMapping; vault: Vault }
    | { type: 'HIGHLIGHT_FIELD'; fieldId: string }
    | { type: 'MARK_SUCCESS'; fieldId: string }
    | { type: 'GET_SETTINGS' }
    | { type: 'SAVE_SETTINGS'; settings: ExtensionSettings }
    | { type: 'ANALYZE_FORM'; semanticMap: SemanticMap; vaultKeys: string[] }
    | { type: 'EXTRACT_DOCUMENT'; fileBase64: string; fileType: string };

export type MessageResponse<T = unknown> =
    | { success: true; data: T }
    | { success: false; error: string };
