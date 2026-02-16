"use client";

import { useState, useEffect } from "react";
import { useAudio } from "@/lib/audio-engine";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ArrowRight, XCircle } from "lucide-react";

export default function AgeVerification() {
    const [isVisible, setIsVisible] = useState(false);
    const { unlockAudio } = useAudio();

    useEffect(() => {
        const isVerified = localStorage.getItem("age-verified");
        if (!isVerified) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleVerify = () => {
        unlockAudio();
        localStorage.setItem("age-verified", "true");
        setIsVisible(false);
        document.body.style.overflow = "";
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
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            >
                {/* Backdrop Layer */}
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.15, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-legendary/20 blur-[150px] rounded-full"
                    />
                </div>

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="relative w-full max-w-lg bg-surface/80 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Decorative Pokeball Background */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 mb-8">
                            <ShieldAlert className="w-10 h-10 text-primary" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black font-display mb-6 tracking-tight">
                            VERIFICACIÓN DE <br />
                            <span className="text-holographic animate-shimmer text-4xl md:text-5xl">EDAD</span>
                        </h2>

                        <div className="space-y-4 mb-10 text-gray-400 leading-relaxed text-sm md:text-base">
                            <p>
                                PokéNexus incluye funciones de <span className="text-white font-bold">Mercado Real</span>,
                                subastas y gestión de <span className="text-white font-bold">Wallet Digital</span>.
                            </p>
                            <p className="bg-white/5 p-4 rounded-2xl border border-white/5 italic">
                                Al ingresar, confirmas que tienes <span className="text-primary font-black">18 años o más</span> y aceptas nuestra política de transacciones.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 242, 255, 0.9)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleVerify}
                                className="px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                            >
                                Soy Mayor <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDecline}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all flex items-center justify-center gap-2 group"
                            >
                                Salir <XCircle className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </div>

                        <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                            PokéNexus © 2026 • Acceso Restringido
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
