import React, { useState } from 'react';
import { createVault, unlockVault } from '../lib/vault';
import { markVaultExists } from '../lib/settings';
import type { Vault } from '../types';

const DEFAULT_FIELDS = [
    { key: 'first_name', label: 'First Name', value: '', category: 'personal' as const },
    { key: 'last_name', label: 'Last Name', value: '', category: 'personal' as const },
    { key: 'date_of_birth', label: 'Date of Birth', value: '', category: 'personal' as const },
    { key: 'gender', label: 'Gender', value: '', category: 'personal' as const },
    { key: 'email', label: 'Email Address', value: '', category: 'contact' as const },
    { key: 'phone', label: 'Phone Number', value: '', category: 'contact' as const },
    { key: 'address_line1', label: 'Address Line 1', value: '', category: 'address' as const },
    { key: 'address_line2', label: 'Address Line 2', value: '', category: 'address' as const },
    { key: 'city', label: 'City', value: '', category: 'address' as const },
    { key: 'state', label: 'State / Province', value: '', category: 'address' as const },
    { key: 'postal_code', label: 'Postal Code', value: '', category: 'address' as const },
    { key: 'country', label: 'Country', value: '', category: 'address' as const },
    { key: 'national_id', label: 'National ID / SSN', value: '', category: 'identity' as const },
    { key: 'passport_number', label: 'Passport Number', value: '', category: 'identity' as const },
    { key: 'drivers_license', label: "Driver's License", value: '', category: 'identity' as const },
];

interface Props {
    onVaultCreated: (vault: Vault, password: string) => void;
}

export function VaultSetup({ onVaultCreated }: Props) {
    const [step, setStep] = useState<'password' | 'profile'>('password');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fields, setFields] = useState(DEFAULT_FIELDS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const passwordStrength = (): { strength: number; label: string; color: string } => {
        const pw = password;
        let score = 0;
        if (pw.length >= 8) score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (score <= 1) return { strength: score, label: 'Weak', color: '#ef4444' };
        if (score <= 3) return { strength: score, label: 'Fair', color: '#f59e0b' };
        return { strength: score, label: 'Strong', color: '#10b981' };
    };

    const handlePasswordNext = () => {
        setError('');
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setStep('profile');
    };

    const handleFieldChange = (key: string, value: string) => {
        setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
    };

    const handleCreate = async () => {
        setLoading(true);
        setError('');
        try {
            await createVault(password, fields);
            await markVaultExists(true);
            const vault = await unlockVault(password);
            onVaultCreated(vault, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create vault.');
        } finally {
            setLoading(false);
        }
    };

    const pw = passwordStrength();

    const categorized = {
        personal: fields.filter((f) => f.category === 'personal'),
        contact: fields.filter((f) => f.category === 'contact'),
        address: fields.filter((f) => f.category === 'address'),
        identity: fields.filter((f) => f.category === 'identity'),
    };

    return (
        <div className="p-4 space-y-4 animate-slide-up">
            {/* Hero */}
            <div className="text-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-primary-600/30">
                    🔐
                </div>
                <h2 className="text-lg font-bold text-white">Create Your Vault</h2>
                <p className="text-sm text-surface-500 mt-1">
                    Your data is encrypted locally. We never see it.
                </p>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 px-2">
                <div className={`flex-1 h-1.5 rounded-full ${step === 'password' ? 'bg-primary-500' : 'bg-emerald-500'}`} />
                <div className={`flex-1 h-1.5 rounded-full ${step === 'profile' ? 'bg-primary-500' : 'bg-surface-700'}`} />
            </div>

            {step === 'password' && (
                <div className="space-y-4 animate-slide-up">
                    <div className="card space-y-3">
                        <div>
                            <label className="label" htmlFor="vault-password">Master Password</label>
                            <div className="relative">
                                <input
                                    id="vault-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Choose a strong password"
                                    autoComplete="new-password"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white"
                                    type="button"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 bg-surface-700 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{
                                                width: `${(pw.strength / 5) * 100}%`,
                                                backgroundColor: pw.color,
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium" style={{ color: pw.color }}>
                                        {pw.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="label" htmlFor="vault-confirm">Confirm Password</label>
                            <input
                                id="vault-confirm"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="card bg-amber-500/5 border-amber-500/20 text-xs text-amber-300/80 flex gap-2 items-start">
                        <span className="text-base shrink-0">⚠️</span>
                        <p>Your master password cannot be recovered. Store it safely. All your data is AES-256 encrypted.</p>
                    </div>

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                    <button id="btn-next-password" className="btn-primary" onClick={handlePasswordNext}>
                        <span>Next: Fill Profile</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {step === 'profile' && (
                <div className="space-y-4 animate-slide-up">
                    <p className="text-xs text-surface-500 text-center">
                        Fill in what you want auto-filled. You can also scan a document to pre-fill.
                    </p>

                    {/* Document Intake Card */}
                    <div className="card border-dashed border-primary-500/50 bg-primary-500/5 p-4 text-center">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-primary-400">📄 Smart Scan</p>
                            {loading && <span className="w-3 h-3 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />}
                        </div>
                        <p className="text-[10px] text-surface-500 mb-3">Upload an ID or document to extract your information instantly.</p>
                        <label className="btn-secondary py-2 cursor-pointer w-full inline-block">
                            <span>📁 Upload Document</span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setLoading(true);
                                    setError('');
                                    try {
                                        const reader = new FileReader();
                                        const base64Promise = new Promise<string>((resolve) => {
                                            reader.onload = () => resolve((reader.result as string).split(',')[1]);
                                            reader.readAsDataURL(file);
                                        });
                                        const fileBase64 = await base64Promise;

                                        const response = await new Promise<{ success: boolean; data?: any; error?: string }>((resolve) => {
                                            chrome.runtime.sendMessage({
                                                type: 'EXTRACT_DOCUMENT',
                                                fileBase64,
                                                fileType: file.type,
                                                vaultKeys: fields.map(f => f.key)
                                            }, resolve);
                                        });

                                        if (response.success && response.data) {
                                            const result = response.data;
                                            setFields(prev => prev.map(f => ({
                                                ...f,
                                                value: result[f.key] || f.value
                                            })));
                                        } else {
                                            throw new Error(response.error || 'Extraction failed');
                                        }
                                    } catch (err) {
                                        setError(err instanceof Error ? err.message : 'Failed to extract data');
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                accept="image/*,.pdf"
                                disabled={loading}
                            />
                        </label>
                    </div>

                    {(Object.entries(categorized) as [string, typeof fields][]).map(([cat, catFields]) => (
                        <div key={cat} className="card space-y-3">
                            <p className="section-header capitalize">{cat} Info</p>
                            {catFields.map((field) => (
                                <div key={field.key}>
                                    <label className="label" htmlFor={`field-${field.key}`}>{field.label}</label>
                                    <input
                                        id={`field-${field.key}`}
                                        type={field.key.includes('date') ? 'date' : field.key.includes('password') ? 'password' : 'text'}
                                        value={field.value}
                                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                        placeholder={field.label}
                                        autoComplete="off"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                    <div className="flex gap-2">
                        <button className="btn-secondary" onClick={() => setStep('password')}>
                            Back
                        </button>
                        <button
                            id="btn-create-vault"
                            className="btn-primary"
                            onClick={handleCreate}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating…
                                </span>
                            ) : (
                                'Create Secure Vault 🔐'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
