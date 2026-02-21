// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – Content Script
// Injected into pages to extract semantic maps and fill forms.
// ─────────────────────────────────────────────────────────────────────────────

import {
    getSemanticMap,
    fillForm,
    highlightField,
    markFieldSuccess,
    markFieldError,
} from '~/lib/domUtils';
import type { FieldMapping, Vault } from '~/types';

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_idle',

    main() {
        console.log('[CitizenOne] Content script loaded.');

        chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
            handleContentMessage(message, sendResponse);
            return true;
        });
    },
});

function handleContentMessage(
    message: { type: string;[key: string]: unknown },
    sendResponse: (response: unknown) => void,
): void {
    switch (message.type) {
        case 'GET_SEMANTIC_MAP': {
            try {
                const map = getSemanticMap();
                sendResponse({ success: true, data: map });
            } catch (err) {
                sendResponse({ success: false, error: String(err) });
            }
            break;
        }

        case 'FILL_FORM': {
            const mapping = message.mapping as FieldMapping;
            const vault = message.vault as Vault;

            fillForm(mapping, vault)
                .then((results) => sendResponse({ success: true, data: results }))
                .catch((err) => sendResponse({ success: false, error: String(err) }));
            break;
        }

        case 'HIGHLIGHT_FIELD': {
            highlightField(message.fieldId as string);
            sendResponse({ success: true, data: null });
            break;
        }

        case 'MARK_SUCCESS': {
            markFieldSuccess(message.fieldId as string);
            sendResponse({ success: true, data: null });
            break;
        }

        case 'MARK_ERROR': {
            markFieldError(message.fieldId as string);
            sendResponse({ success: true, data: null });
            break;
        }

        case 'TRIGGER_AUTOFILL': {
            // Self-contained auto-fill flow triggered by background
            (async () => {
                try {
                    const map = getSemanticMap();
                    // Get settings and vault via background (storage access is limited in content scripts for MV3 sometimes, but chrome.storage.local works.
                    // However, we need to call analyzeForm which is a background task)
                    const vaultResult = await chrome.storage.local.get(['citizen_one_vault_encrypted', 'citizen_one_settings']);
                    if (!vaultResult.citizen_one_vault_encrypted) throw new Error('Vault not found.');

                    // Request analysis from background
                    const response = await chrome.runtime.sendMessage({
                        type: 'ANALYZE_FORM',
                        semanticMap: map,
                        vaultKeys: [] // Background will handle keys if we pass them, or we can fetch them here.
                    });

                    if (response.success) {
                        // We need the decrypted vault to fill.
                        // For privacy, we don't store the decrypted vault.
                        // So one-click fill ONLY works if the popup is open or if we store the session key (which we don't yet).
                        // I'll show a notification if vault is locked.
                        console.log('[CitizenOne] One-click fill requires an unlocked vault.');
                        // Send message back to background to show a notification or open popup
                    }
                } catch (err) {
                    console.error('[CitizenOne] Trigger fill error:', err);
                }
            })();
            sendResponse({ success: true });
            break;
        }

        default:
            sendResponse({ success: false, error: `Unknown message: ${message.type}` });
    }
}
