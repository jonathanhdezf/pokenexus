"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
    playSFX: (url: string, volume?: number) => void;
    playTheme: () => void;
    stopTheme: () => void;
    unlockAudio: () => void;
    isUnlocked: boolean;
    isThemePlaying: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isThemePlaying, setIsThemePlaying] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const themeOscillators = useRef<OscillatorNode[]>([]);
    const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const unlockAudio = () => {
        if (isUnlocked) return;

        const ContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (ContextClass) {
            const ctx = new ContextClass();
            audioCtxRef.current = ctx;

            // Resume context and play a silent buffer
            ctx.resume().then(() => {
                const buffer = ctx.createBuffer(1, 1, 22050);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.start(0);

                setIsUnlocked(true);
                console.log("Audio Engine Unlocked 🚀");
            });
        }
    };

    const playSFX = (url: string, volume: number = 0.5) => {
        // Fallback to Synthetic 8-bit sounds if local files fail or for immediate response
        if (url.includes("login-success")) {
            playSyntheticSuccess();
            return;
        }
        if (url.includes("catch")) {
            playSyntheticCatch();
            return;
        }
        if (url.includes("throw")) {
            playSyntheticThrow();
            return;
        }

        const audio = new Audio(url);
        audio.volume = volume;
        audio.play().catch(err => {
            console.log("SFX Playback failed, falling back to synthetic", err);
            if (url.includes("success")) playSyntheticSuccess();
            if (url.includes("catch")) playSyntheticCatch();
        });
    };

    const playSyntheticSuccess = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.5);
    };

    const playSyntheticCatch = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(880, now); // A5
        osc.frequency.setValueAtTime(440, now + 0.1); // A4
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.3);
    };

    const playSyntheticThrow = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.2);
    };

    const playSyntheticTheme = () => {
        const ctx = audioCtxRef.current;
        if (!ctx || !isUnlocked) return;

        const melody = [
            { f: 523.25, d: 0.4 }, { f: 587.33, d: 0.4 }, { f: 659.25, d: 0.4 }, { f: 783.99, d: 0.4 },
            { f: 783.99, d: 0.4 }, { f: 659.25, d: 0.4 }, { f: 523.25, d: 0.4 }
        ];

        let time = ctx.currentTime;
        melody.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "square";
            osc.frequency.setValueAtTime(note.f, time);
            gain.gain.setValueAtTime(0.04, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + note.d);
            themeOscillators.current.push(osc);
            time += note.d;
        });

        const totalDuration = melody.reduce((acc, n) => acc + n.d, 0);
        loopTimeoutRef.current = setTimeout(() => {
            playSyntheticTheme();
        }, totalDuration * 1000);
    };

    const playTheme = () => {
        setIsThemePlaying(true);
        playSyntheticTheme();
    };

    const stopTheme = () => {
        setIsThemePlaying(false);
        if (loopTimeoutRef.current) {
            clearTimeout(loopTimeoutRef.current);
            loopTimeoutRef.current = null;
        }
        themeOscillators.current.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        themeOscillators.current = [];
    };

    return (
        <AudioContext.Provider value={{ playSFX, playTheme, stopTheme, unlockAudio, isUnlocked, isThemePlaying }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};
