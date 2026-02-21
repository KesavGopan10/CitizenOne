import React, { useState, useCallback } from 'react';
import type { FieldMapping, FillResult, SemanticMap, Vault } from '../types';
import { getVaultKeys, saveVault } from '../lib/vault';
import { VoiceAssistant } from './VoiceAssistant';

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
    const [activeTab, setActiveTab] = useState<'fill' | 'vault' | 'voice'>('fill');

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
            setFillState('extracting');
            const map = await sendToContentScript<SemanticMap>({ type: 'GET_SEMANTIC_MAP' });
            setSemanticMap(map);

            if (map.fields.length === 0) {
                throw new Error('No form fields detected on this page.');
            }

            setFillState('analyzing');
            const fieldMapping = await sendToBackground<FieldMapping>({
                type: 'ANALYZE_FORM',
                semanticMap: map,
                vaultKeys,
            });
            setMapping(fieldMapping);

            const mappedCount = Object.keys(fieldMapping).length;
            if (mappedCount === 0) {
                throw new Error('AI could not map any fields.');
            }

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
        analyzing: 'AI mapping fields…',
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
                    <div className="flex gap-2">
                        <span className="badge-success">
                            <span className="status-dot active" />
                            Unlocked
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-white">{filledFields.length}</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">Fields</p>
                    </div>
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-white">{vaultKeys.length}</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">Total</p>
                    </div>
                    <div className="bg-surface-700/60 rounded-lg py-2.5">
                        <p className="text-xl font-bold text-emerald-400">Secure</p>
                        <p className="text-[10px] text-surface-500 mt-0.5">AES-256</p>
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
                <button
                    className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
                    onClick={() => setActiveTab('voice')}
                >
                    🎙️ Voice
                </button>
            </div>

            {activeTab === 'fill' && (
                <div className="space-y-3">
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

                    {error && (
                        <div className="card bg-red-500/10 border-red-500/30 animate-slide-up">
                            <p className="text-xs text-red-400 flex items-center gap-2">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </p>
                        </div>
                    )}

                    {fillState === 'done' && (
                        <div className="card space-y-3 animate-slide-up">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-white">Fill Results</p>
                                <div className="flex gap-2">
                                    <span className="badge-success">✓ {successCount} filled</span>
                                    {failCount > 0 && <span className="badge-info">✗ {failCount} skipped</span>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'vault' && (
                <VaultViewer
                    vault={vault}
                    masterPassword={masterPassword}
                    onVaultUpdate={onVaultUpdate}
                />
            )}

            {activeTab === 'voice' && (
                <VoiceAssistant
                    vault={vault}
                    onUpdateVault={onVaultUpdate}
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
                reader.onload = () => resolve((reader.result as string).split(',')[1]);
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

            const updatedFields = vault.fields.map(f => ({
                ...f,
                value: result[f.key] || f.value
            }));

            const updatedVault = { ...vault, fields: updatedFields, updatedAt: Date.now() };
            await saveVault(updatedVault, masterPassword);
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
            <div className="card b-primary-500/50 bg-primary-500/5">
                <p className="section-header text-primary-400">📄 Quick Intake</p>
                <label className="btn-secondary py-2 cursor-pointer mt-2 block text-center">
                    {extracting ? 'Analyzing…' : '📁 Upload Document'}
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" disabled={extracting} />
                </label>
                {extractError && <p className="text-[10px] text-red-400 mt-2">{extractError}</p>}
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
                                    <p className="text-[10px] text-surface-500">{revealedKeys.has(field.key) ? field.value : '••••••••'}</p>
                                </div>
                                <button onClick={() => toggleReveal(field.key)} className="text-surface-500 text-xs px-2 py-1 rounded-md hover:bg-surface-700">
                                    {revealedKeys.has(field.key) ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
