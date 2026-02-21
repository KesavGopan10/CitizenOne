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
    const handledRadios = new Set<string>();

    for (const el of elements) {
        if (!el.offsetParent && el.getAttribute('type') !== 'hidden') continue; // skip invisible
        if (bytesUsed >= MAX_TOKENS_BYTES) break;

        const type =
            el.tagName === 'SELECT'
                ? 'select'
                : el.tagName === 'TEXTAREA'
                    ? 'textarea'
                    : (el as HTMLInputElement).type || 'text';

        // Group radio buttons by name
        if (type === 'radio') {
            const name = el.getAttribute('name');
            if (name && handledRadios.has(name)) continue;
            if (name) handledRadios.add(name);
        }

        const id =
            el.id ||
            el.getAttribute('name') ||
            `field_${fields.length}`;

        const label = resolveLabel(el);
        // If it's a radio group, we might want to find the fieldset label or similar
        const groupLabel = type === 'radio' ? resolveGroupLabel(el) : '';
        const finalLabel = (groupLabel || label || '').trim();

        if (!finalLabel) continue;

        const field: SemanticField = {
            id,
            type,
            label: finalLabel,
        };

        const placeholder = (el as HTMLInputElement).placeholder;
        if (placeholder && placeholder !== finalLabel) field.placeholder = placeholder;

        const name = el.getAttribute('name');
        if (name && name !== id) field.name = name;

        if (el.tagName === 'SELECT') {
            const opts = Array.from((el as HTMLSelectElement).options)
                .map((o) => o.text.trim())
                .filter((t) => t && t.toLowerCase() !== 'select' && t !== '--');
            if (opts.length) field.options = opts.slice(0, 15); // Increased to 15
        }

        if (type === 'radio') {
            const name = el.getAttribute('name');
            if (name) {
                const group = document.querySelectorAll(`input[type="radio"][name="${CSS.escape(name)}"]`);
                const opts = Array.from(group).map(r => {
                    const rLabel = resolveLabel(r as HTMLElement);
                    return rLabel || (r as HTMLInputElement).value;
                }).filter(Boolean);
                if (opts.length) field.options = opts;
            }
        }

        if ((el as HTMLInputElement).required) field.required = true;

        const context = getContext(el);
        if (context && context !== finalLabel) field.context = context;

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

/**
 * Searches for a label for a group (e.g. for radios)
 */
function resolveGroupLabel(el: HTMLElement): string {
    const fieldset = el.closest('fieldset');
    if (fieldset) {
        const legend = fieldset.querySelector('legend');
        if (legend) return legend.textContent || '';
    }

    // Look for a preceding heading or bold text
    const parent = el.parentElement;
    if (parent) {
        const textNodes = Array.from(parent.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
            .map(n => n.textContent?.trim());
        if (textNodes.length) return textNodes[0] || '';
    }

    return '';
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
    const failedFields: Array<{ fieldId: string, vaultKey: string }> = [];

    // First Pass
    for (const [fieldId, vaultKey] of Object.entries(mapping)) {
        const value = getVaultValue(vault, vaultKey);
        const el = findElement(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

        if (!el || !value) continue;

        highlightField(fieldId);
        await sleep(100);

        try {
            await fillField(el, value);
            markFieldSuccess(fieldId);
            results.push({ fieldId, success: true, mappedKey: vaultKey });
        } catch (err) {
            failedFields.push({ fieldId, vaultKey });
        }
    }

    // Second Pass (Retry failed fields after a delay - handles dependencies like Country -> State)
    if (failedFields.length > 0) {
        await sleep(500); // Wait for potential dynamic loads
        for (const { fieldId, vaultKey } of failedFields) {
            const value = getVaultValue(vault, vaultKey);
            const el = findElement(fieldId) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
            if (!el || !value) continue;

            try {
                await fillField(el, value);
                markFieldSuccess(fieldId);
                results.push({ fieldId, success: true, mappedKey: vaultKey });
            } catch (err) {
                markFieldError(fieldId);
                results.push({ fieldId, success: false, mappedKey: vaultKey, error: err instanceof Error ? err.message : 'Retry failed' });
            }
        }
    }

    return results;
}

async function fillField(el: HTMLElement, value: string): Promise<void> {
    if (el.tagName === 'SELECT') {
        fillSelect(el as HTMLSelectElement, value);
    } else if ((el as HTMLInputElement).type === 'radio' || (el as HTMLInputElement).type === 'checkbox') {
        fillCheckable(el as HTMLInputElement, value);
    } else {
        fillInput(el as HTMLInputElement | HTMLTextAreaElement, value);
    }
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
    el.dispatchEvent(new Event('focus', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
}

function fillCheckable(el: HTMLInputElement, value: string): void {
    const type = el.type;
    const name = el.name;

    if (type === 'radio' && name) {
        const group = document.querySelectorAll<HTMLInputElement>(`input[name="${CSS.escape(name)}"]`);
        for (const radio of group) {
            const label = resolveLabel(radio).toLowerCase();
            const rValue = radio.value.toLowerCase();
            const target = value.toLowerCase();

            if (label === target || rValue === target || label.includes(target) || target.includes(label)) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                radio.dispatchEvent(new Event('click', { bubbles: true }));
                return;
            }
        }
    } else if (type === 'checkbox') {
        const label = resolveLabel(el).toLowerCase();
        const target = value.toLowerCase();
        const shouldBeChecked = target === 'true' || target === 'yes' || target === '1' || label.includes(target);

        if (el.checked !== shouldBeChecked) {
            el.checked = shouldBeChecked;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('click', { bubbles: true }));
        }
    }
}

function fillSelect(el: HTMLSelectElement, value: string): void {
    const targetValue = value.toLowerCase();

    // Trigger mousedown/focus to help with some dynamic dropdowns
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    el.focus();

    // 1. Try exact option value or text match
    for (const option of el.options) {
        if (
            option.value.toLowerCase() === targetValue ||
            option.text.toLowerCase() === targetValue
        ) {
            el.value = option.value;
            triggerSelectEvents(el);
            return;
        }
    }

    // 2. Try partial match
    for (const option of el.options) {
        const text = option.text.toLowerCase();
        if (text.includes(targetValue) || targetValue.includes(text)) {
            el.value = option.value;
            triggerSelectEvents(el);
            return;
        }
    }

    throw new Error(`No matching option for value: ${value}`);
}

function triggerSelectEvents(el: HTMLSelectElement): void {
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
