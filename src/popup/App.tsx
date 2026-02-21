import React, { useState, useEffect } from 'react';
import { VaultSetup } from './VaultSetup';
import { VaultUnlock } from './VaultUnlock';
import { Dashboard } from './Dashboard';
import { SettingsPage } from './SettingsPage';
import { vaultExists } from '../lib/vault';
import type { Vault } from '../types';

export type AppView = 'setup' | 'unlock' | 'dashboard' | 'settings';

export default function App() {
    const [view, setView] = useState<AppView>('unlock');
    const [vault, setVault] = useState<Vault | null>(null);
    const [masterPassword, setMasterPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        vaultExists().then((exists) => {
            setView(exists ? 'unlock' : 'setup');
            setLoading(false);
        });
    }, []);

    const handleVaultReady = (unlockedVault: Vault, password: string) => {
        setVault(unlockedVault);
        setMasterPassword(password);
        setView('dashboard');
    };

    const handleLock = () => {
        setVault(null);
        setMasterPassword('');
        setView('unlock');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-surface-900">
                <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-surface-500 text-sm">Loading CitizenOne…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-900 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-surface-700/60 bg-surface-900/95 sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center text-base font-bold shadow-lg shadow-primary-600/30">
                        C
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white leading-none">CitizenOne</h1>
                        <p className="text-[10px] text-surface-500 leading-none mt-0.5">Smart Form Filler</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {vault && (
                        <>
                            <button
                                id="btn-settings"
                                onClick={() => setView(view === 'settings' ? 'dashboard' : 'settings')}
                                className="p-1.5 rounded-lg hover:bg-surface-700 transition-colors text-surface-400 hover:text-white"
                                title="Settings"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button
                                id="btn-lock"
                                onClick={handleLock}
                                className="p-1.5 rounded-lg hover:bg-surface-700 transition-colors text-surface-400 hover:text-white"
                                title="Lock Vault"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto animate-slide-up">
                {view === 'setup' && (
                    <VaultSetup onVaultCreated={handleVaultReady} />
                )}
                {view === 'unlock' && (
                    <VaultUnlock onUnlocked={handleVaultReady} onSetup={() => setView('setup')} />
                )}
                {view === 'dashboard' && vault && (
                    <Dashboard
                        vault={vault}
                        masterPassword={masterPassword}
                        onVaultUpdate={(v) => setVault(v)}
                    />
                )}
                {view === 'settings' && vault && (
                    <SettingsPage
                        vault={vault}
                        masterPassword={masterPassword}
                        onBack={() => setView('dashboard')}
                        onLock={handleLock}
                    />
                )}
            </main>
        </div>
    );
}
