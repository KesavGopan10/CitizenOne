import React, { useState, useEffect, useCallback } from 'react';
import { Vault } from '../types';

interface Props {
    vault: Vault;
    onUpdateVault: (vault: Vault) => void;
}

export function VoiceAssistant({ vault, onUpdateVault }: Props) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };

    const handleVoiceInput = async (text: string) => {
        setLoading(true);
        setTranscript(text);
        try {
            const vaultData = vault.fields.map(f => `${f.label}: ${f.value || 'Not set'}`).join('\n');
            const prompt = `User said: "${text}"\n\nYour Vault data:\n${vaultData}\n\nTask: Answer the user's question or help them manage their vault. If they want to update something, respond with a JSON block: {"action": "update", "key": "field_key", "value": "new_value"}. Otherwise just respond with text. Clear and concise.`;

            const res = await new Promise<{ success: boolean; data?: string; error?: string }>((resolve) => {
                chrome.runtime.sendMessage({
                    type: 'VOICE_QUERY',
                    prompt,
                }, resolve);
            });

            if (res.success && res.data) {
                let aiText = res.data;
                try {
                    // Check if AI returned a JSON action
                    const jsonMatch = aiText.match(/\{.*\}/s);
                    if (jsonMatch) {
                        const action = JSON.parse(jsonMatch[0]);
                        if (action.action === 'update' && action.key && action.value) {
                            const updatedFields = vault.fields.map(f =>
                                f.key === action.key ? { ...f, value: action.value } : f
                            );
                            onUpdateVault({ ...vault, fields: updatedFields, updatedAt: Date.now() });
                            aiText = `Okay, I've updated your ${action.key.replace('_', ' ')} to ${action.value}.`;
                        }
                    }
                } catch (e) {
                    console.error('Failed to parse AI action', e);
                }

                setResponse(aiText);
                speak(aiText);
            } else {
                setResponse("Sorry, I couldn't process that.");
                speak("Sorry, I couldn't process that.");
            }
        } catch (err) {
            setResponse("Error communicating with AI.");
        } finally {
            setLoading(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            handleVoiceInput(text);
        };

        recognition.start();
    };

    return (
        <div className="card space-y-4 animate-slide-up bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-white">Voice Assistant</h3>
                    <p className="text-[10px] text-surface-500">Ask about your vault or update data.</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-surface-600'}`} />
            </div>

            <div className="flex flex-col items-center justify-center py-4 space-y-3">
                <button
                    onClick={toggleListening}
                    disabled={loading}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isListening
                            ? 'bg-red-500 shadow-red-500/40 scale-110'
                            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/40'
                        }`}
                >
                    {loading ? (
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <span className="text-2xl">{isListening ? '🛑' : '🎙️'}</span>
                    )}
                </button>
                <p className="text-xs text-indigo-400 font-medium h-4">
                    {isListening ? 'Listening...' : loading ? 'Thinking...' : 'Tap to speak'}
                </p>
            </div>

            {(transcript || response) && (
                <div className="space-y-3 pt-2 border-t border-indigo-500/10">
                    {transcript && (
                        <div className="flex justify-end">
                            <div className="bg-indigo-600/20 text-indigo-200 text-xs py-2 px-3 rounded-2xl rounded-tr-none max-w-[80%]">
                                {transcript}
                            </div>
                        </div>
                    )}
                    {response && (
                        <div className="flex justify-start">
                            <div className="bg-surface-700/60 text-white text-xs py-2 px-3 rounded-2xl rounded-tl-none max-w-[80%] border border-surface-600/50">
                                {response}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
