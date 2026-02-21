// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – BYOK Provider Factory
// Zero-Knowledge: LLM only sees form field labels/IDs, never PII values.
// ─────────────────────────────────────────────────────────────────────────────

import type { FieldMapping, ProviderKey, SemanticMap } from '../types';

// ─── System Prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(vaultKeys: string[]): string {
    return `You are CitizenOne, a privacy-first form assistant.
Your task is to analyze a web form and map each form field to the correct data key.

Available data keys from the user's local vault:
${vaultKeys.map((k) => `  - ${k}`).join('\n')}

Rules:
1. Respond ONLY with a valid JSON object mapping field IDs to vault keys.
2. Only include fields you can confidently map. Skip fields you are unsure about.
3. Do NOT invent or hallucinate keys not in the vault list above.
4. Format: { "field_id_or_name": "vault_key" }
5. Example: { "first-name": "first_name", "dob": "date_of_birth" }

Output ONLY the JSON object. No explanation, no markdown fences.`;
}

function buildUserPrompt(map: SemanticMap): string {
    const fieldLines = map.fields
        .map((f) => {
            const parts = [`id="${f.id}"`, `type="${f.type}"`, `label="${f.label}"`];
            if (f.placeholder) parts.push(`placeholder="${f.placeholder}"`);
            if (f.name) parts.push(`name="${f.name}"`);
            if (f.options?.length) parts.push(`options=[${f.options.slice(0, 8).join(', ')}]`);
            if (f.required) parts.push(`required`);
            if (f.context) parts.push(`context="${f.context.slice(0, 80)}"`);
            return `  { ${parts.join(', ')} }`;
        })
        .join(',\n');

    return `Form URL: ${map.url}
Form Title: ${map.title}
Fields:\n[\n${fieldLines}\n]

Map these fields to vault keys.`;
}

// ─── Provider Implementations ─────────────────────────────────────────────────

async function callGemini(
    apiKey: string,
    model: string,
    system: string,
    user: string,
): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: system }] },
            contents: [{ parts: [{ text: user }], role: 'user' }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 1024,
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return text.trim();
}

async function callOpenAICompat(
    baseUrl: string,
    apiKey: string,
    model: string,
    system: string,
    user: string,
): Promise<string> {
    const url = `${baseUrl}/chat/completions`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            temperature: 0.1,
            max_tokens: 1024,
            response_format: { type: 'json_object' },
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? '';
    return text.trim();
}

// ─── Provider Factory ─────────────────────────────────────────────────────────

export interface ProviderOptions {
    key: ProviderKey;
    apiKey?: string;
    baseUrl?: string;
    model?: string;
}

const PROVIDER_DEFAULTS: Record<ProviderKey, { baseUrl: string; model: string }> = {
    gemini: {
        baseUrl: 'https://generativelanguage.googleapis.com',
        model: 'gemini-1.5-flash',
    },
    groq: {
        baseUrl: 'https://api.groq.com/openai/v1',
        model: 'llama3-8b-8192',
    },
    nvidia: {
        baseUrl: 'https://integrate.api.nvidia.com/v1',
        model: 'meta/llama-3.1-70b-instruct',
    },
    ollama: {
        baseUrl: 'http://localhost:11434/v1',
        model: 'llama3',
    },
};

/**
 * Analyzes a form and returns a field→vaultKey mapping.
 * Zero-Knowledge: vaultKeys are semantic labels only (e.g. "first_name").
 * Actual PII values are NEVER sent to the LLM.
 */
export async function analyzeForm(
    opts: ProviderOptions,
    semanticMap: SemanticMap,
    vaultKeys: string[],
): Promise<FieldMapping> {
    const defaults = PROVIDER_DEFAULTS[opts.key];
    const model = opts.model ?? defaults.model;
    const baseUrl = opts.baseUrl ?? defaults.baseUrl;

    const systemPrompt = buildSystemPrompt(vaultKeys);
    const userPrompt = buildUserPrompt(semanticMap);

    let rawJson: string;

    if (opts.key === 'gemini') {
        if (!opts.apiKey) throw new Error('Gemini API key is required.');
        rawJson = await callGemini(opts.apiKey, model, systemPrompt, userPrompt);
    } else {
        // groq, nvidia, ollama — all OpenAI-compatible
        if (opts.key !== 'ollama' && !opts.apiKey) {
            throw new Error(`${opts.key} API key is required.`);
        }
        rawJson = await callOpenAICompat(
            baseUrl,
            opts.apiKey ?? 'ollama',
            model,
            systemPrompt,
            userPrompt,
        );
    }

    // Parse and validate
    let mapping: FieldMapping;
    try {
        // Strip potential markdown fences
        const cleaned = rawJson.replace(/```json\n?|```\n?/g, '').trim();
        mapping = JSON.parse(cleaned) as FieldMapping;
    } catch {
        throw new Error(`Failed to parse LLM response as JSON. Raw: ${rawJson}`);
    }

    // Validate that all mapped keys are in the vault
    const validKeys = new Set(vaultKeys);
    const validated: FieldMapping = {};
    for (const [fieldId, vaultKey] of Object.entries(mapping)) {
        if (validKeys.has(vaultKey)) {
            validated[fieldId] = vaultKey;
        }
    }

    return validated;
}

/**
 * Extracts PII from a document using multimodal LLM.
 */
export async function extractFromDocument(
    opts: ProviderOptions,
    fileBase64: string,
    fileType: string,
    targetKeys: string[],
): Promise<Record<string, string>> {
    if (opts.key !== 'gemini') {
        throw new Error('Document extraction currently only supported via Gemini 1.5 Flash.');
    }

    const systemPrompt = `You are CitizenOne, a document processing assistant.
Extract information from this document that matches the following labels:
${targetKeys.join(', ')}

Rules:
1. Return ONLY a JSON object mapping labels to extracted values.
2. If a label is not found, do not include it.
3. If multiple values exist (e.g. multiple addresses), pick the primary/permanent one.
4. Format: { "first_name": "John", "postal_code": "12345" }`;

    const apiKey = opts.apiKey;
    if (!apiKey) throw new Error('Gemini API key is required.');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${opts.model ?? 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: systemPrompt },
                    {
                        inline_data: {
                            mime_type: fileType,
                            data: fileBase64,
                        }
                    }
                ]
            }],
            generationConfig: {
                temperature: 0.1,
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Extraction failed: ${err}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`Failed to parse extraction result: ${text}`);
    }
}

/**
 * Tests provider connectivity with a minimal ping request.
 */
export async function testProvider(opts: ProviderOptions): Promise<string> {
    const pingMap: SemanticMap = {
        url: 'https://test.example',
        title: 'Test Form',
        fields: [
            { id: 'first_name_field', type: 'text', label: 'First Name', required: true },
        ],
        totalFields: 1,
    };

    await analyzeForm(opts, pingMap, ['first_name', 'last_name', 'email']);
    return 'Connection successful!';
}
