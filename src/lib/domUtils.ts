// ─────────────────────────────────────────────────────────────────────────────
// CitizenOne – DOM Semantic Map Extractor + Form Filler (Content Script)
// Runs inside the page context. Communicates with the background via messages.
// ─────────────────────────────────────────────────────────────────────────────

import type { FieldMapping, FillResult, SemanticField, SemanticMap, Vault } from '../types';
import { getVaultValue } from '../lib/vault';

const MAX_TOKENS_BYTES = 2048;
const FILL_HIGHLIGHT_COLOR = '#3b82f620';
const FILL_BORDER_COLOR = '#3b82f6';
const SUCCESS_COLOR = '#10b98120';
const SUCCESS_BORDER = '#10b981';
const ERROR_COLOR = '#ef444420';
const ERROR_BORDER = '#ef4444';

// ─── Label Resolution ─────────────────────────────────────────────────────────

function resolveLabel(el: HTMLElement): string {
    // 1. aria-label
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel.trim();

    // 2. aria-labelledby
    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
        const labelEl = document.getElementById(labelledBy);
        if (labelEl) return (labelEl.textContent ?? '').trim();
    }

    // 3. <label for="id">
    const id = el.id;
    if (id) {
        const label = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
        if (label) return (label.textContent ?? '').trim();
    }

    // 4. Wrapping <label>
    const wrappingLabel = el.closest('label');
    if (wrappingLabel) {
        // Get text without the input's own text
        const clone = wrappingLabel.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('input,select,textarea').forEach((e) => e.remove());
        const text = (clone.textContent ?? '').trim();
        if (text) return text;
    }

    // 5. Placeholder as fallback
    const placeholder = (el as HTMLInputElement).placeholder;
    if (placeholder) return placeholder.trim();

    // 6. Name attribute
    const name = el.getAttribute('name');
    if (name) return name.replace(/[_-]/g, ' ').trim();

    return '';
}

function getContext(el: HTMLElement): string {
    // Grab surrounding text for context
    const parent = el.closest('div, section, fieldset, form') ?? el.parentElement;
    if (!parent) return '';
    const text = (parent.textContent ?? '').replace(/\s+/g, ' ').trim();
    return text.slice(0, 100);
}

// ─── Semantic Map Builder ────────────────────────────────────────────────────

export function getSemanticMap(): SemanticMap {
    const INTERACTIVE_SELECTOR =
        'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea';

    const elements = Array.from(
        document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR),
    );

    const fields: SemanticField[] = [];
    let bytesUsed = 0;

    for (const el of elements) {
        if (!el.offsetParent && el.getAttribute('type') !== 'hidden') continue; // skip invisible
        if (bytesUsed >= MAX_TOKENS_BYTES) break;

        const id =
            el.id ||
            el.getAttribute('name') ||
            `field_${fields.length}`;

        const type =
            el.tagName === 'SELECT'
                ? 'select'
                : el.tagName === 'TEXTAREA'
                    ? 'textarea'
                    : (el as HTMLInputElement).type || 'text';

        const label = resolveLabel(el);
        if (!label) continue; // skip unlabeled fields — LLM can't map them

        const field: SemanticField = {
            id,
            type,
            label,
        };

        const placeholder = (el as HTMLInputElement).placeholder;
        if (placeholder && placeholder !== label) field.placeholder = placeholder;

        const name = el.getAttribute('name');
        if (name && name !== id) field.name = name;

        if (el.tagName === 'SELECT') {
            const opts = Array.from((el as HTMLSelectElement).options)
                .map((o) => o.text.trim())
                .filter((t) => t && t.toLowerCase() !== 'select' && t !== '--');
            if (opts.length) field.options = opts.slice(0, 10);
        }

        if ((el as HTMLInputElement).required) field.required = true;

        const context = getContext(el);
        if (context && context !== label) field.context = context;

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

// ─── Field Locator ────────────────────────────────────────────────────────────

function findElement(fieldId: string): HTMLElement | null {
    // Try by ID first
    let el = document.getElementById(fieldId) as HTMLElement | null;
    if (el) return el;

    // Try by name
    el = document.querySelector<HTMLElement>(`[name="${CSS.escape(fieldId)}"]`);
    if (el) return el;

    // Try data-testid or aria-label
    el = document.querySelector<HTMLElement>(`[data-testid="${CSS.escape(fieldId)}"]`);
    return el;
}

// ─── Field Highlighter ───────────────────────────────────────────────────────

export function highlightField(fieldId: string): void {
    const el = findElement(fieldId) as HTMLInputElement | null;
    if (!el) return;

    el.style.backgroundColor = FILL_HIGHLIGHT_COLOR;
    el.style.borderColor = FILL_BORDER_COLOR;
    el.style.boxShadow = `0 0 0 2px ${FILL_BORDER_COLOR}`;
    el.style.outline = 'none';
    el.style.transition = 'all 0.2s ease';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function markFieldSuccess(fieldId: string): void {
    const el = findElement(fieldId) as HTMLInputElement | null;
    if (!el) return;

    el.style.backgroundColor = SUCCESS_COLOR;
    el.style.borderColor = SUCCESS_BORDER;
    el.style.boxShadow = `0 0 0 2px ${SUCCESS_BORDER}`;

    // Add success icon overlay
    const wrapper = el.parentElement;
    if (wrapper) {
        const existing = wrapper.querySelector('.citizen-one-check');
        if (!existing) {
            const check = document.createElement('span');
            check.className = 'citizen-one-check';
            check.textContent = '✓';
            check.style.cssText = `
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: #10b981;
        font-weight: bold;
        font-size: 16px;
        pointer-events: none;
        z-index: 9999;
      `;
            if (getComputedStyle(wrapper).position === 'static') {
                wrapper.style.position = 'relative';
            }
            wrapper.appendChild(check);
        }
    }
}

export function markFieldError(fieldId: string): void {
    const el = findElement(fieldId) as HTMLInputElement | null;
    if (!el) return;

    el.style.backgroundColor = ERROR_COLOR;
    el.style.borderColor = ERROR_BORDER;
    el.style.boxShadow = `0 0 0 2px ${ERROR_BORDER}`;
}

// ─── Zero-Knowledge Form Filler ───────────────────────────────────────────────

export async function fillForm(mapping: FieldMapping, vault: Vault): Promise<FillResult[]> {
    const results: FillResult[] = [];

    for (const [fieldId, vaultKey] of Object.entries(mapping)) {
        const value = getVaultValue(vault, vaultKey);
        const el = findElement(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

        if (!el) {
            results.push({ fieldId, success: false, mappedKey: vaultKey, error: 'Element not found' });
            continue;
        }

        if (!value) {
            results.push({ fieldId, success: false, mappedKey: vaultKey, error: 'No vault value for key: ' + vaultKey });
            continue;
        }

        highlightField(fieldId);
        await sleep(150); // Visual feedback delay

        try {
            if (el.tagName === 'SELECT') {
                fillSelect(el as HTMLSelectElement, value);
            } else {
                fillInput(el as HTMLInputElement | HTMLTextAreaElement, value);
            }
            markFieldSuccess(fieldId);
            results.push({ fieldId, success: true, mappedKey: vaultKey });
        } catch (err) {
            markFieldError(fieldId);
            results.push({
                fieldId,
                success: false,
                mappedKey: vaultKey,
                error: err instanceof Error ? err.message : 'Unknown error',
            });
        }

        await sleep(100);
    }

    return results;
}

function fillInput(el: HTMLInputElement | HTMLTextAreaElement, value: string): void {
    // Native input value setter (needed for React-controlled inputs)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        el.tagName === 'TEXTAREA'
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype,
        'value',
    )?.set;

    if (nativeInputValueSetter) {
        nativeInputValueSetter.call(el, value);
    } else {
        el.value = value;
    }

    // Dispatch events to trigger React/Vue/Angular listeners
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
}

function fillSelect(el: HTMLSelectElement, value: string): void {
    // Try exact option value match
    for (const option of el.options) {
        if (
            option.value.toLowerCase() === value.toLowerCase() ||
            option.text.toLowerCase() === value.toLowerCase()
        ) {
            el.value = option.value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        }
    }

    // Try partial match
    for (const option of el.options) {
        if (
            option.text.toLowerCase().includes(value.toLowerCase()) ||
            value.toLowerCase().includes(option.text.toLowerCase())
        ) {
            el.value = option.value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        }
    }

    throw new Error(`No matching option for value: ${value}`);
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
