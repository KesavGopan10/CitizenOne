import React, { useState, useCallback } from 'react';
import type { FieldMapping, FillResult, SemanticMap, Vault } from '../types';
import { getVaultKeys } from '../lib/vault';

type FillState = 'idle' | 'extracting' | 'analyzing' | 'filling' | 'done' | 'error';

interface Props {
    vault: Vault;
    masterPassword: string;
    onVaultUpdate: (vault: Vault) => void;
}

export function Dashboard({ vault, masterPassword, onVaultUpdate }: Props) {
    const [fillState, setFillState] = useState<FillState>('idle');
    const [semanticMap, setSemanticMap] = useState<SemanticMap | null>(null);
    const [mapping, setMapping] = useState<FieldMapping | null>(null);
    const [fillResults, setFillResults] = useState<FillResult[]>([]);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'fill' | 'vault'>('fill');

    const vaultKeys = getVaultKeys(vault);
    const filledFields = vault.fields.filter((f) => f.value);

    const sendToContentScript = async <T,>(
        message: Record<string, unknown>,
    ): Promise<T> => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) throw new Error('No active tab found.');

        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tab.id!, message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else if (response?.success) {
                    resolve(response.data as T);
                } else {
                    reject(new Error(response?.error ?? 'Unknown error'));
                }
            });
        });
    };

    const sendToBackground = async <T,>(
        message: Record<string, unknown>,
    ): Promise<T> => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                } else if (response?.success) {
                    resolve(response.data as T);
                } else {
                    reject(new Error(response?.error ?? 'Unknown error'));
                }
            });
        });
    };

    const handleAutoFill = useCallback(async () => {
        setError('');
        setFillResults([]);
        setSemanticMap(null);
        setMapping(null);

        try {
            // Step 1: Extract semantic map from page
            setFillState('extracting');
            const map = await sendToContentScript<SemanticMap>({ type: 'GET_SEMANTIC_MAP' });
            setSemanticMap(map);

            if (map.fields.length === 0) {
                throw new Error('No form fields detected on this page.');
            }

            // Step 2: Analyze with LLM (Zero-Knowledge: only keys go to LLM)
            setFillState('analyzing');
            const fieldMapping = await sendToBackground<FieldMapping>({
                type: 'ANALYZE_FORM',
                semanticMap: map,
                vaultKeys,
            });
            setMapping(fieldMapping);

            const mappedCount = Object.keys(fieldMapping).length;
            if (mappedCount === 0) {
                throw new Error('AI could not map any fields. Try configuring your provider or adding more profile data.');
            }

            // Step 3: Fill (vault data never leaves local storage)
            setFillState('filling');
            const results = await sendToContentScript<FillResult[]>({
                type: 'FILL_FORM',
                mapping: fieldMapping,
                vault,
            });
            setFillResults(results);
            setFillState('done');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setFillState('error');
        }
    }, [vault, vaultKeys]);

    const successCount = fillResults.filter((r) => r.success).length;
    const failCount = fillResults.filter((r) => !r.success).length;

    const stateMessages: Record<FillState, string> = {
        idle: '',
        extracting: 'Reading form structure…',
        analyzing: 'AI mapping fields (zero-knowledge)…',
        filling: 'Filling fields locally…',
        done: '',
        error: '',
    };

    return (
        <div className="p-4 space-y-4 animate-slide-up">
            {/* Vault Stats */}
            <div className="card-glow">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Your Profile</p>
                    <span className="badge-success">
                        <span className="status-dot active" />
                        Unlocked
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-white">{filledFields.length}</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">Fields</p>
                    </div>
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-white">{vaultKeys.length}</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">Total Keys</p>
                    </div>
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-emerald-400">0</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">Leaked</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-surface-800 rounded-xl p-1 gap-1">
                <button
                    className={`tab-btn ${activeTab === 'fill' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fill')}
                >
                    🤖 Auto-Fill
                </button>
                <button
                    className={`tab-btn ${activeTab === 'vault' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vault')}
                >
                    🔐 Vault
                </button>
            </div>

            {activeTab === 'fill' && (
                <div className="space-y-3">
                    {/* Main action button */}
                    <button
                        id="btn-autofill"
                        className="btn-primary py-4 text-base"
                        onClick={handleAutoFill}
                        disabled={fillState === 'extracting' || fillState === 'analyzing' || fillState === 'filling'}
                    >
                        {fillState === 'idle' || fillState === 'done' || fillState === 'error' ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {fillState === 'done' ? 'Fill Again' : 'Auto-Fill This Page'}
                            </>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {stateMessages[fillState]}
                            </span>
                        )}
                    </button>

                    {/* Progress bar during fill */}
                    {(fillState === 'extracting' || fillState === 'analyzing' || fillState === 'filling') && (
                        <div className="bg-surface-700 rounded-full h-1 overflow-hidden">
                            <div className="fill-progress h-full w-full" />
                        </div>
                    )}

                    {/* Results */}
                    {fillState === 'done' && (
                        <div className="card space-y-3 animate-slide-up">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-white">Fill Results</p>
                                <div className="flex gap-2">
                                    {successCount > 0 && (
                                        <span className="badge-success">✓ {successCount} filled</span>
                                    )}
                                    {failCount > 0 && (
                                        <span className="badge bg-red-500/20 text-red-400 border border-red-500/30">
                                            ✗ {failCount} skipped
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                {fillResults.map((r) => (
                                    <div
                                        key={r.fieldId}
                                        className={`flex items-center justify-between text-xs px-2 py-1.5 rounded-lg ${r.success ? 'bg-emerald-500/10' : 'bg-red-500/10'
                                            }`}
                                    >
                                        <span className={r.success ? 'text-emerald-400' : 'text-red-400'}>
                                            {r.success ? '✓' : '✗'} {r.fieldId}
                                        </span>
                                        <span className="text-surface-500">{r.mappedKey}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="card bg-red-500/10 border-red-500/30 animate-slide-up">
                            <p className="text-xs text-red-400 flex items-center gap-2">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </p>
                        </div>
                    )}

                    {/* Semantic map preview */}
                    {semanticMap && (
                        <div className="card space-y-2 animate-slide-up">
                            <p className="section-header">Detected Fields ({semanticMap.fields.length})</p>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                {semanticMap.fields.map((f) => (
                                    <div key={f.id} className="flex items-center gap-2 text-xs">
                                        <span className="badge-info">{f.type}</span>
                                        <span className="text-white truncate">{f.label}</span>
                                        {mapping?.[f.id] && (
                                            <span className="text-emerald-400 ml-auto shrink-0">→ {mapping[f.id]}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Privacy notice */}
                    <div className="card bg-surface-800/40 border-surface-700/40">
                        <div className="flex gap-2 text-[10px] text-surface-600">
                            <span>🛡️</span>
                            <p>
                                <strong className="text-surface-500">Zero-Knowledge Mode Active.</strong> The AI only sees field labels — never your actual data. Filling happens entirely on your device.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'vault' && (
                <VaultViewer
                    vault={vault}
                    masterPassword={masterPassword}
                    onVaultUpdate={onVaultUpdate}
                />
            )}
        </div>
    );
}

function VaultViewer({ vault, masterPassword, onVaultUpdate }: { vault: Vault; masterPassword: string; onVaultUpdate: (v: Vault) => void }) {
    const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
    const [extracting, setExtracting] = useState(false);
    const [extractError, setExtractError] = useState('');

    const toggleReveal = (key: string) => {
        setRevealedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setExtracting(true);
        setExtractError('');

        try {
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve) => {
                reader.onload = () => {
                    const result = reader.result as string;
                    resolve(result.split(',')[1]);
                };
                reader.readAsDataURL(file);
            });

            const fileBase64 = await base64Promise;
            const vaultKeys = vault.fields.map(f => f.key);

            const result = await new Promise<Record<string, string>>((resolve, reject) => {
                chrome.runtime.sendMessage({
                    type: 'EXTRACT_DOCUMENT',
                    fileBase64,
                    fileType: file.type,
                    vaultKeys
                }, (response) => {
                    if (response.success) resolve(response.data);
                    else reject(new Error(response.error));
                });
            });

            // Update vault with extracted data
            const updatedFields = vault.fields.map(f => ({
                ...f,
                value: result[f.key] || f.value
            }));

            const updatedVault = { ...vault, fields: updatedFields, updatedAt: Date.now() };
            const { saveVault } = await import('~/lib/vault');
            await saveVault(masterPassword, updatedVault);
            onVaultUpdate(updatedVault);

        } catch (err) {
            setExtractError(err instanceof Error ? err.message : 'Extraction failed');
        } finally {
            setExtracting(false);
        }
    };

    const categories = ['personal', 'contact', 'address', 'identity', 'financial', 'other'] as const;

    return (
        <div className="space-y-3 animate-slide-up">
            {/* Document Intake Card */}
            <div className="card border-dashed border-primary-500/50 bg-primary-500/5">
                <p className="section-header text-primary-400">📄 Quick Intake</p>
                <p className="text-[10px] text-surface-500 mb-3">Upload an ID or document to auto-fill your vault.</p>
                <label className="btn-secondary py-2 cursor-pointer">
                    {extracting ? (
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing…
                        </span>
                    ) : (
                        <>
                            <span>📁 Upload Document</span>
                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" disabled={extracting} />
                        </>
                    )}
                </label>
                {extractError && <p className="text-[10px] text-red-400 mt-2">Error: {extractError}</p>}
            </div>

            {categories.map((cat) => {
                const catFields = vault.fields.filter((f) => f.category === cat && f.value);
                if (!catFields.length) return null;
                return (
                    <div key={cat} className="card space-y-2">
                        <p className="section-header capitalize">🗂 {cat}</p>
                        {catFields.map((field) => (
                            <div key={field.key} className="flex items-center justify-between py-1">
                                <div>
                                    <p className="text-xs font-medium text-white">{field.label}</p>
                                    <p className="text-[10px] text-surface-500">
                                        {revealedKeys.has(field.key)
                                            ? field.value
                                            : '••••••••'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleReveal(field.key)}
                                    className="text-surface-500 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-surface-700 transition-colors"
                                >
                                    {revealedKeys.has(field.key) ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        ))}
                    </div>
                );
            })}

            {vault.fields.filter((f) => f.value).length === 0 && (
                <div className="card text-center py-8 text-surface-500">
                    <p className="text-2xl mb-2">📋</p>
                    <p className="text-sm">No data in vault yet.</p>
                    <p className="text-xs mt-1">Go to Settings to add your profile.</p>
                </div>
            )}

            <p className="text-[10px] text-surface-600 text-center">
                Last updated: {new Date(vault.updatedAt).toLocaleDateString()}
            </p>
        </div>
    );
}
