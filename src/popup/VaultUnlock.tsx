import React, { useState } from 'react';
import { unlockVault } from '../lib/vault';
import type { Vault } from '../types';

interface Props {
    onUnlocked: (vault: Vault, password: string) => void;
    onSetup: () => void;
}

export function VaultUnlock({ onUnlocked, onSetup }: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setLoading(true);
        setError('');

        try {
            const vault = await unlockVault(password);
            onUnlocked(vault, password);
        } catch (err) {
            setAttempts((a) => a + 1);
            setError(
                err instanceof Error
                    ? err.message
                    : 'Incorrect password. Please try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-[420px] animate-slide-up">
            {/* Lock icon */}
            <div className="mb-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-surface-700 to-surface-800 flex items-center justify-center text-4xl mx-auto mb-4 border border-surface-600/60 shadow-xl">
                    🔒
                </div>
                <h2 className="text-lg font-bold text-white">Vault Locked</h2>
                <p className="text-xs text-surface-500 mt-1">
                    Enter your master password to continue
                </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
                <div className="relative">
                    <input
                        id="unlock-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Master password"
                        autoFocus
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white transition-colors"
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-xs text-red-400 flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {attempts >= 3 && (
                    <p className="text-xs text-surface-500 text-center">
                        Forgotten your password?{' '}
                        <button
                            type="button"
                            onClick={onSetup}
                            className="text-red-400 hover:text-red-300 underline"
                        >
                            Reset vault (clears all data)
                        </button>
                    </p>
                )}

                <button
                    id="btn-unlock"
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !password}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Unlocking…
                        </span>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 018 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            Unlock Vault
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-[10px] text-surface-600">
                    Protected with AES-256 + PBKDF2 (100k iterations)
                </p>
            </div>
        </div>
    );
}
