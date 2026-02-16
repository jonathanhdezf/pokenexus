"use client";

import { useState, useEffect } from "react";
import { useAudio } from "@/lib/audio-engine";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ArrowRight, XCircle } from "lucide-react";

export default function AgeVerification() {
    const [isVisible, setIsVisible] = useState(false);
    const { unlockAudio, playSFX } = useAudio();

    useEffect(() => {
        const isVerified = localStorage.getItem("age-verified");
        if (!isVerified) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleVerify = () => {
        // Unlock audio context and play pikachu sound
        unlockAudio();
        playSFX("/audio/pikachu.mp3", 0.8);

        localStorage.setItem("age-verified", "true");

        // Wait a small moment for the sound to start before closing
        setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "";
        }, 800);
    };

    const handleDecline = () => {
        window.location.href = "https://www.pokemon.com";
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-hidden"
            >
                {/* Immersive Dark Backdrop */}
                <div className="absolute inset-0 bg-[#02040a]/95 backdrop-blur-3xl" />

                {/* Dynamic Energy Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 0.4, 0],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                            className="absolute w-1 h-20 bg-primary/20 blur-xl"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: '40%'
                            }}
                        />
                    ))}
                </div>

                {/* THE MASTER BALL CONTAINER */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative w-[340px] md:w-[480px] aspect-square rounded-full shadow-[0_0_100px_rgba(0,0,0,1)] border-4 border-black group"
                >
                    {/* TOP HALF (RED) */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="h-1/2 w-full bg-gradient-to-b from-[#ff1f1f] via-[#d00000] to-black relative">
                            {/* Metallic Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

                            {/* Content Top */}
                            <div className="absolute inset-x-0 bottom-12 flex flex-col items-center">
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2"
                                >
                                    Sistema de Verificación
                                </motion.span>
                                <h2 className="text-2xl md:text-3xl font-black font-display text-white tracking-tighter">ACCESO POKENEXUS</h2>
                            </div>
                        </div>

                        {/* BOTTOM HALF (WHITE) */}
                        <div className="h-1/2 w-full bg-gradient-to-t from-[#f0f0f0] via-[#ffffff] to-[#555] relative">
                            {/* Inner Shadow */}
                            <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]" />

                            {/* Content Bottom */}
                            <div className="absolute inset-x-0 top-16 px-8 text-center">
                                <p className="text-black/60 text-[10px] md:text-xs font-bold leading-tight uppercase tracking-tight">
                                    Acceso restringido para mayores de <span className="text-black font-black">18 años</span>.
                                </p>
                                <p className="text-black/40 text-[9px] md:text-[10px] mt-2 leading-tight">
                                    Requerido para el intercambio de <span className="text-black/60">Juego de Cartas Coleccionables (JCC)</span> y gestión de tu <span className="text-black/60">Billetera Digital (Wallet)</span>.
                                </p>

                                <button
                                    onClick={handleDecline}
                                    className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-red-600 transition-colors"
                                >
                                    Cerrar y Salir
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CENTRAL SEAM */}
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-black -translate-y-1/2 z-10 shadow-xl" />

                    {/* THE CORE BUTTON */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative"
                        >
                            {/* Rotating Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full border-b-4 border-r-4 border-primary/30"
                            />

                            {/* Main Button Shell */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleVerify}
                                className="absolute inset-4 rounded-full bg-black border-[6px] border-[#333] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center group/btn overflow-hidden"
                            >
                                {/* Inner Glow (The Heart) */}
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 10px #00f2ff", "0 0 40px #00f2ff", "0 0 10px #00f2ff"],
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex flex-col items-center justify-center p-1"
                                >
                                    <span className="text-[10px] md:text-[12px] font-black text-black leading-none uppercase">SOY</span>
                                    <span className="text-[10px] md:text-[12px] font-black text-black leading-none uppercase">MAYOR</span>
                                </motion.div>

                                {/* Shimmer Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Holographic Overlays */}
                    <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-holo-card mix-blend-overlay opacity-10" />
                    </div>
                </motion.div>

                {/* Footer Warning */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 text-center"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                        PokéNexus Cryptography Protocol • Beta 2.5
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
