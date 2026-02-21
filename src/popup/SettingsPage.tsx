import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../lib/settings';
import { destroyVault, saveVault, changeMasterPassword } from '../lib/vault';
import { testProvider } from '../lib/providers';
import type {
    ExtensionSettings,
    ProviderKey,
    Vault,
    VaultField,
} from '../types';

interface Props {
    vault: Vault;
    masterPassword: string;
    onBack: () => void;
    onLock: () => void;
}

const PROVIDER_INFO: Record<ProviderKey, { name: string; icon: string; tier: string; desc: string }> = {
    gemini: {
        name: 'Gemini 1.5 Flash',
        icon: '✨',
        tier: 'Free Tier',
        desc: 'Google AI Studio — Fast & free with generous limits',
    },
    groq: {
        name: 'Groq (Llama 3)',
        icon: '⚡',
        tier: 'Free Tier',
        desc: 'Ultra-fast inference — Sub-second response times',
    },
    nvidia: {
        name: 'NVIDIA NIM',
        icon: '🟢',
        tier: '1000 Free Credits',
        desc: 'Llama 3.1 70B — High-reasoning power at zero cost',
    },
    ollama: {
        name: 'Ollama (Local)',
        icon: '🦙',
        tier: '100% Free',
        desc: 'Fully local — No API key needed, total privacy',
    },
};

type SettingsTab = 'providers' | 'vault' | 'about';

export function SettingsPage({ vault, masterPassword, onBack, onLock }: Props) {
    const [tab, setTab] = useState<SettingsTab>('providers');
    const [settings, setSettings] = useState<ExtensionSettings | null>(null);
    const [testingKey, setTestingKey] = useState<ProviderKey | null>(null);
    const [testResults, setTestResults] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [editedVault, setEditedVault] = useState<Vault>(vault);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changingPw, setChangingPw] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        getSettings().then(setSettings);
    }, []);

    if (!settings) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const updateProviderField = (key: ProviderKey, field: string, value: string) => {
        setSettings((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                providers: {
                    ...prev.providers,
                    [key]: { ...prev.providers[key], [field]: value },
                },
            };
        });
    };

    const handleSaveProviders = async () => {
        setSaving(true);
        try {
            await saveSettings(settings);
            setStatusMsg('Settings saved!');
            setTimeout(() => setStatusMsg(''), 2000);
        } catch (err) {
            setStatusMsg('Failed to save: ' + String(err));
        } finally {
            setSaving(false);
        }
    };

    const handleTestProvider = async (key: ProviderKey) => {
        setTestingKey(key);
        const provider = settings.providers[key];
        try {
            const result = await testProvider({
                key,
                apiKey: provider.apiKey,
                baseUrl: provider.baseUrl,
                model: provider.model,
            });
            setTestResults((prev) => ({ ...prev, [key]: `✓ ${result}` }));
        } catch (err) {
            setTestResults((prev) => ({
                ...prev,
                [key]: `✗ ${err instanceof Error ? err.message : String(err)}`,
            }));
        } finally {
            setTestingKey(null);
        }
    };

    const handleVaultFieldChange = (k: string, value: string) => {
        setEditedVault((prev) => ({
            ...prev,
            fields: prev.fields.map((f) => (f.key === k ? { ...f, value } : f)),
        }));
    };

    const handleSaveVault = async () => {
        setSaving(true);
        try {
            await saveVault(editedVault, masterPassword);
            setStatusMsg('Vault saved!');
            setTimeout(() => setStatusMsg(''), 2000);
        } catch (err) {
            setStatusMsg('Failed: ' + String(err));
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        setChangingPw(true);
        try {
            await changeMasterPassword(oldPassword, newPassword);
            setStatusMsg('Password changed!');
            setOldPassword('');
            setNewPassword('');
            setTimeout(() => setStatusMsg(''), 2000);
        } catch (err) {
            setStatusMsg('Failed: ' + String(err));
        } finally {
            setChangingPw(false);
        }
    };

    const handleDestroyVault = async () => {
        if (!confirm('This will permanently delete your vault. Are you sure?')) return;
        await destroyVault();
        onLock();
    };

    return (
        <div className="flex flex-col h-full animate-slide-up">
            {/* Status toast */}
            {statusMsg && (
                <div className="mx-4 mt-4 px-3 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-xs text-emerald-400 text-center animate-fade-in">
                    {statusMsg}
                </div>
            )}

            {/* Sub-tabs */}
            <div className="flex gap-1 mx-4 mt-4 bg-surface-800 rounded-xl p-1">
                {(['providers', 'vault', 'about'] as SettingsTab[]).map((t) => (
                    <button
                        key={t}
                        className={`tab-btn text-[11px] ${tab === t ? 'active' : ''}`}
                        onClick={() => setTab(t)}
                    >
                        {t === 'providers' ? '🤖 Providers' : t === 'vault' ? '🔐 Vault' : 'ℹ️ About'}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* ── PROVIDERS TAB ── */}
                {tab === 'providers' && (
                    <div className="space-y-4">
                        <p className="text-xs text-surface-500">
                            Configure API keys for AI providers. Only one is used at a time.
                        </p>

                        {/* Active provider selector */}
                        <div className="card space-y-2">
                            <p className="section-header">Active Provider</p>
                            <div className="grid grid-cols-2 gap-2">
                                {(Object.keys(PROVIDER_INFO) as ProviderKey[]).map((key) => {
                                    const info = PROVIDER_INFO[key];
                                    return (
                                        <button
                                            key={key}
                                            id={`provider-${key}`}
                                            onClick={() => setSettings((s) => s ? { ...s, activeProvider: key } : s)}
                                            className={`p-2.5 rounded-xl text-left text-xs transition-all border ${settings.activeProvider === key
                                                ? 'bg-primary-600/20 border-primary-500/60 text-white'
                                                : 'bg-surface-700/40 border-surface-700 text-surface-400 hover:border-surface-600'
                                                }`}
                                        >
                                            <div className="text-lg mb-1">{info.icon}</div>
                                            <div className="font-semibold">{key.toUpperCase()}</div>
                                            <div className="text-[10px] text-emerald-400 mt-0.5">{info.tier}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Individual provider configs */}
                        {(Object.keys(PROVIDER_INFO) as ProviderKey[]).map((key) => {
                            const info = PROVIDER_INFO[key];
                            const config = settings.providers[key];
                            const testResult = testResults[key];
                            const isSuccess = testResult?.startsWith('✓');

                            return (
                                <div key={key} className="card space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{info.icon}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{info.name}</p>
                                                <p className="text-[10px] text-surface-500">{info.desc}</p>
                                            </div>
                                        </div>
                                        <span className="badge-success text-[10px]">{info.tier}</span>
                                    </div>

                                    {key !== 'ollama' && (
                                        <div>
                                            <label className="label" htmlFor={`apikey-${key}`}>API Key</label>
                                            <input
                                                id={`apikey-${key}`}
                                                type="password"
                                                value={config.apiKey ?? ''}
                                                onChange={(e) => updateProviderField(key, 'apiKey', e.target.value)}
                                                placeholder={`Paste your ${key} API key`}
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="col-span-3">
                                            <label className="label" htmlFor={`model-${key}`}>Model</label>
                                            <input
                                                id={`model-${key}`}
                                                type="text"
                                                value={config.model ?? ''}
                                                onChange={(e) => updateProviderField(key, 'model', e.target.value)}
                                                placeholder="model name"
                                            />
                                        </div>
                                        {(key === 'nvidia' || key === 'ollama') && (
                                            <div className="col-span-2">
                                                <label className="label" htmlFor={`baseurl-${key}`}>Base URL</label>
                                                <input
                                                    id={`baseurl-${key}`}
                                                    type="text"
                                                    value={config.baseUrl ?? ''}
                                                    onChange={(e) => updateProviderField(key, 'baseUrl', e.target.value)}
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {testResult && (
                                        <p className={`text-xs ${isSuccess ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {testResult}
                                        </p>
                                    )}

                                    <button
                                        id={`btn-test-${key}`}
                                        className="btn-secondary py-2"
                                        onClick={() => handleTestProvider(key)}
                                        disabled={testingKey === key}
                                    >
                                        {testingKey === key ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Testing…
                                            </span>
                                        ) : (
                                            'Test Connection'
                                        )}
                                    </button>
                                </div>
                            );
                        })}

                        <button
                            id="btn-save-providers"
                            className="btn-primary"
                            onClick={handleSaveProviders}
                            disabled={saving}
                        >
                            {saving ? 'Saving…' : 'Save Provider Settings'}
                        </button>
                    </div>
                )}

                {/* ── VAULT TAB ── */}
                {tab === 'vault' && (
                    <div className="space-y-4">
                        <p className="text-xs text-surface-500">
                            Edit your stored profile data. Changes are re-encrypted with your master password.
                        </p>

                        {editedVault.fields.map((field) => (
                            <div key={field.key}>
                                <label className="label" htmlFor={`edit-${field.key}`}>{field.label}</label>
                                <input
                                    id={`edit-${field.key}`}
                                    type={field.key.includes('date') ? 'date' : 'text'}
                                    value={field.value}
                                    onChange={(e) => handleVaultFieldChange(field.key, e.target.value)}
                                    placeholder={field.label}
                                />
                            </div>
                        ))}

                        <button
                            id="btn-save-vault"
                            className="btn-primary"
                            onClick={handleSaveVault}
                            disabled={saving}
                        >
                            {saving ? 'Saving…' : '💾 Save Vault Data'}
                        </button>

                        <hr className="border-surface-700" />

                        {/* Change password */}
                        <div className="card space-y-3">
                            <p className="section-header">Change Master Password</p>
                            <input
                                id="old-password"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Current password"
                            />
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password (min 8 chars)"
                            />
                            <button
                                id="btn-change-password"
                                className="btn-secondary"
                                onClick={handleChangePassword}
                                disabled={changingPw || !oldPassword || !newPassword}
                            >
                                {changingPw ? 'Changing…' : 'Change Password'}
                            </button>
                        </div>

                        <hr className="border-surface-700" />

                        {/* Danger zone */}
                        <div className="card border-red-900/40 bg-red-950/20">
                            <p className="section-header text-red-500">⚠️ Danger Zone</p>
                            <p className="text-xs text-surface-500 mb-3">
                                Permanently deletes all your stored data. This cannot be undone.
                            </p>
                            <button
                                id="btn-destroy-vault"
                                className="btn-danger"
                                onClick={handleDestroyVault}
                            >
                                🗑️ Destroy Vault
                            </button>
                        </div>
                    </div>
                )}

                {/* ── ABOUT TAB ── */}
                {tab === 'about' && (
                    <div className="space-y-4 animate-slide-up">
                        <div className="card text-center py-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-3xl mx-auto mb-3">
                                C1
                            </div>
                            <h3 className="text-lg font-bold text-white">CitizenOne</h3>
                            <p className="text-xs text-surface-500 mt-1">Version 1.0.0 (Phase 1)</p>
                            <p className="text-xs text-surface-500 mt-3 leading-relaxed px-4">
                                Open-source, privacy-first autonomous agent for automating government and bureaucratic forms.
                            </p>
                        </div>

                        <div className="card space-y-3">
                            <p className="section-header">Security Architecture</p>
                            {[
                                ['🔐', 'AES-256 Encryption', 'All PII encrypted at rest'],
                                ['🔑', 'PBKDF2 Key Derivation', '100,000 iterations with SHA-256'],
                                ['🙈', 'Zero-Knowledge AI', 'LLM never sees actual values'],
                                ['📴', 'Local-First', 'Data never leaves your device'],
                                ['🧹', 'Shadow Form Strategy', 'DOM stripped to labels only'],
                            ].map(([icon, title, desc]) => (
                                <div key={title} className="flex gap-3 items-start">
                                    <span className="text-lg">{icon}</span>
                                    <div>
                                        <p className="text-xs font-semibold text-white">{title}</p>
                                        <p className="text-[10px] text-surface-500">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card space-y-2">
                            <p className="section-header">Supported Providers</p>
                            {(Object.entries(PROVIDER_INFO) as [ProviderKey, typeof PROVIDER_INFO[ProviderKey]][]).map(([key, info]) => (
                                <div key={key} className="flex items-center justify-between text-xs">
                                    <span className="text-white">{info.icon} {info.name}</span>
                                    <span className="badge-success">{info.tier}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
