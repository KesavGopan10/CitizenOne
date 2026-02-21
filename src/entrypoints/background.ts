// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – Background Service Worker (MV3)
// Orchestrates: tab injection, provider calls, message routing.
// ─────────────────────────────────────────────────────────────────────────────

import { getSettings } from '~/lib/settings';
import { analyzeForm, type ProviderOptions } from '~/lib/providers';
import type {
    FieldMapping,
    MessageResponse,
    SemanticMap,
} from '~/types';

export default defineBackground(() => {
    console.log('[CitizenOne] Background service worker started.');

    // One-Click Auto-Fill: Trigger flow when the icon is clicked
    chrome.action.onClicked.addListener(async (tab) => {
        if (!tab.id) return;
        chrome.tabs.sendMessage(tab.id, { type: 'TRIGGER_AUTOFILL' });
    });

    chrome.runtime.onMessage.addListener(
        (
            message: { type: string;[key: string]: unknown },
            sender,
            sendResponse,
        ) => {
            handleMessage(message, sender, sendResponse);
            return true; // Keep channel open for async response
        },
    );
});

async function handleMessage(
    message: { type: string;[key: string]: unknown },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void,
): Promise<void> {
    try {
        switch (message.type) {
            case 'ANALYZE_FORM': {
                const semanticMap = message.semanticMap as SemanticMap;
                const vaultKeys = message.vaultKeys as string[];

                const settings = await getSettings();
                const activeProviderConfig = settings.providers[settings.activeProvider];

                const opts: ProviderOptions = {
                    key: settings.activeProvider,
                    apiKey: activeProviderConfig.apiKey,
                    baseUrl: activeProviderConfig.baseUrl,
                    model: activeProviderConfig.model,
                };

                const mapping: FieldMapping = await analyzeForm(opts, semanticMap, vaultKeys);
                sendResponse({ success: true, data: mapping });
                break;
            }

            case 'INJECT_AND_GET_MAP': {
                const tabId = sender.tab?.id ?? (message.tabId as number | undefined);
                if (!tabId) {
                    sendResponse({ success: false, error: 'No tab ID provided.' });
                    return;
                }

                // Inject the content script and retrieve the semantic map
                const results = await chrome.scripting.executeScript({
                    target: { tabId },
                    func: getSemanticMapFromPage,
                });

                const semanticMap = results?.[0]?.result as SemanticMap | undefined;
                if (!semanticMap) {
                    sendResponse({ success: false, error: 'Failed to extract semantic map.' });
                    return;
                }

                sendResponse({ success: true, data: semanticMap });
                break;
            }

            case 'TEST_PROVIDER': {
                const { providerKey, apiKey, baseUrl, model } = message as {
                    type: string;
                    providerKey: string;
                    apiKey?: string;
                    baseUrl?: string;
                    model?: string;
                };

                const { testProvider } = await import('~/lib/providers');
                const result = await testProvider({
                    key: providerKey as never,
                    apiKey,
                    baseUrl,
                    model,
                });
                sendResponse({ success: true, data: result });
                break;
            }

            case 'EXTRACT_DOCUMENT': {
                const { fileBase64, fileType, vaultKeys } = message as {
                    type: string;
                    fileBase64: string;
                    fileType: string;
                    vaultKeys: string[];
                };

                const settings = await getSettings();
                const activeProviderConfig = settings.providers[settings.activeProvider];

                const { extractFromDocument } = await import('~/lib/providers');
                const result = await extractFromDocument(
                    {
                        key: settings.activeProvider,
                        apiKey: activeProviderConfig.apiKey,
                        baseUrl: activeProviderConfig.baseUrl,
                        model: activeProviderConfig.model,
                    },
                    fileBase64,
                    fileType,
                    vaultKeys,
                );
                sendResponse({ success: true, data: result });
                break;
            }

            case 'VOICE_QUERY': {
                const { prompt } = message as { type: string; prompt: string };
                const settings = await getSettings();
                const activeProviderConfig = settings.providers[settings.activeProvider];

                // Simplified AI call for voice/text reasoning
                const url = activeProviderConfig.baseUrl
                    ? `${activeProviderConfig.baseUrl}/chat/completions`
                    : `https://generativelanguage.googleapis.com/v1beta/models/${activeProviderConfig.model || 'gemini-1.5-flash'}:generateContent?key=${activeProviderConfig.apiKey}`;

                let aiResponse: string;

                if (settings.activeProvider === 'gemini') {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
                        })
                    });
                    const json = await res.json();
                    aiResponse = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response';
                } else {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${activeProviderConfig.apiKey}`
                        },
                        body: JSON.stringify({
                            model: activeProviderConfig.model,
                            messages: [{ role: 'user', content: prompt }],
                            temperature: 0.7,
                            max_tokens: 512
                        })
                    });
                    const json = await res.json();
                    aiResponse = json?.choices?.[0]?.message?.content ?? 'No response';
                }

                sendResponse({ success: true, data: aiResponse });
                break;
            }

            default:
                sendResponse({ success: false, error: `Unknown message type: ${message.type}` });
        }
    } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('[CitizenOne] Background error:', errorMsg);
        sendResponse({ success: false, error: errorMsg });
    }
}

// This function is serialized and injected into the page
function getSemanticMapFromPage(): SemanticMap {
    // Inline version for injection context (no module imports available here)
    const MAX_BYTES = 2048;

    function resolveLabel(el: HTMLElement): string {
        const ariaLabel = el.getAttribute('aria-label');
        if (ariaLabel) return ariaLabel.trim();

        const labelledBy = el.getAttribute('aria-labelledby');
        if (labelledBy) {
            const labelEl = document.getElementById(labelledBy);
            if (labelEl) return (labelEl.textContent ?? '').trim();
        }

        const id = el.id;
        if (id) {
            const label = document.querySelector<HTMLLabelElement>(
                `label[for="${CSS.escape(id)}"]`,
            );
            if (label) return (label.textContent ?? '').trim();
        }

        const wrapping = el.closest('label');
        if (wrapping) {
            const clone = wrapping.cloneNode(true) as HTMLElement;
            clone.querySelectorAll('input,select,textarea').forEach((e) => e.remove());
            const text = (clone.textContent ?? '').trim();
            if (text) return text;
        }

        const placeholder = (el as HTMLInputElement).placeholder;
        if (placeholder) return placeholder.trim();

        const name = el.getAttribute('name');
        if (name) return name.replace(/[_-]/g, ' ').trim();

        return '';
    }

    const selector =
        'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea';

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const fields: SemanticField[] = [];
    let bytesUsed = 0;

    for (const el of elements) {
        if (!el.offsetParent) continue;
        if (bytesUsed >= MAX_BYTES) break;

        const id = el.id || el.getAttribute('name') || `field_${fields.length}`;
        const type =
            el.tagName === 'SELECT'
                ? 'select'
                : el.tagName === 'TEXTAREA'
                    ? 'textarea'
                    : (el as HTMLInputElement).type || 'text';

        const label = resolveLabel(el);
        if (!label) continue;

        const field: SemanticField = { id, type, label };

        const placeholder = (el as HTMLInputElement).placeholder;
        if (placeholder && placeholder !== label) field.placeholder = placeholder;

        const name = el.getAttribute('name');
        if (name && name !== id) field.name = name;

        if (el.tagName === 'SELECT') {
            const opts = Array.from((el as HTMLSelectElement).options)
                .map((o) => o.text.trim())
                .filter((t) => t && t.toLowerCase() !== 'select');
            if (opts.length) field.options = opts.slice(0, 10);
        }

        if ((el as HTMLInputElement).required) field.required = true;

        fields.push(field);
        bytesUsed += JSON.stringify(field).length;
    }

    return {
        url: window.location.href,
        title: document.title,
        fields,
        totalFields: elements.length,
    };
}

// Types needed in injected context (must be defined locally)
interface SemanticField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    name?: string;
    options?: string[];
    required?: boolean;
}

interface SemanticMap {
    url: string;
    title: string;
    fields: SemanticField[];
    totalFields: number;
}
