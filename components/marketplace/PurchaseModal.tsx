"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck, Wallet, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";

interface PurchaseModalProps {
    card: {
        id: string;
        name: string;
        imageUrl: string;
        price: number | string;
        set: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function PurchaseModal({ card, isOpen, onClose }: PurchaseModalProps) {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [step, setStep] = useState<"confirm" | "processing" | "success">("confirm");
    const [error, setError] = useState("");
    const throwSfxRef = useRef<HTMLAudioElement | null>(null);
    const catchSfxRef = useRef<HTMLAudioElement | null>(null);

    const userBalance = Number((session?.user as any)?.walletBalance || 0);
    const cardPrice = typeof card.price === 'string'
        ? Number(card.price.replace(/[$,]/g, ''))
        : card.price;

    const handleConfirm = async () => {
        if (userBalance < cardPrice) {
            setError("Insufficient funds in your wallet.");
            return;
        }

        setStep("processing");
        setError("");

        // Play throw sound
        if (throwSfxRef.current) {
            throwSfxRef.current.volume = 0.8;
            throwSfxRef.current.play().catch(() => { });
        }

        try {
            const res = await fetch("/api/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardId: card.id }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Purchase failed");
            }

            // Update the session balance locally
            await update({
                ...session,
                user: {
                    ...session?.user,
                    walletBalance: data.newBalance
                }
            });

            // Play capture sound on success
            if (catchSfxRef.current) {
                catchSfxRef.current.volume = 0.9;
                catchSfxRef.current.play().catch(() => { });
            }

            setStep("success");
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
            setStep("confirm");
        }
    };

    const goToDashboard = () => {
        onClose();
        router.push("/dashboard");
        router.refresh();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <audio
                        ref={throwSfxRef}
                        src="https://play.pokemonshowdown.com/audio/sfx/pokeballsign.mp3"
                        className="hidden"
                    />
                    <audio
                        ref={catchSfxRef}
                        src="https://archive.org/download/caught-a-pokemon/Caught%20a%20Pokemon%21.mp3"
                        className="hidden"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            {step === "confirm" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <Wallet className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Confirm Purchase</h2>
                                            <p className="text-gray-400 text-sm">Review your order details below.</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6 flex gap-4">
                                        <div className="w-20 h-28 relative rounded-lg overflow-hidden bg-gray-900 border border-white/5 shadow-inner">
                                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div className="flex-1 py-2">
                                            <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{card.set}</div>
                                            <h3 className="text-lg font-bold truncate mb-2">{card.name}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <ShieldCheck className="w-4 h-4 text-green-500" /> Inspected & Authenticated
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Card Price</span>
                                            <span className="font-mono text-white font-bold">${cardPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Processing Fee</span>
                                            <span className="font-mono text-green-400 font-bold">$0.00</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-1" />
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="font-bold">Total</span>
                                            <span className="font-mono text-cyan-400 font-bold tracking-tighter text-2xl">
                                                ${cardPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm mb-6 flex gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleConfirm}
                                            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all transform active:scale-[0.98] shadow-lg shadow-white/5"
                                        >
                                            Confirm Transaction
                                        </button>
                                        <div className="text-center">
                                            <span className="text-xs text-gray-500">Your balance: </span>
                                            <span className="text-xs font-mono font-bold text-gray-300">${userBalance.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === "processing" && (
                                <div className="py-12 flex flex-col items-center justify-center text-center overflow-hidden">
                                    <div className="relative w-64 h-64 flex items-center justify-center">
                                        {/* Red beam effect from Poke ball */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: [0, 1.5, 0],
                                                opacity: [0, 0.7, 0],
                                            }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute w-20 h-40 bg-red-500 blur-3xl z-10 origin-bottom"
                                            style={{ bottom: '45%' }}
                                        />

                                        {/* The Card being captured */}
                                        <motion.div
                                            initial={{ scale: 1, opacity: 1, y: -40, rotate: 0 }}
                                            animate={{
                                                scale: [1, 0.3, 0],
                                                y: [-40, -10, 40],
                                                rotate: [0, 45, 180],
                                                opacity: [1, 1, 0]
                                            }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute w-28 h-40 z-0 overflow-hidden rounded-lg border border-white/20 shadow-2xl"
                                        >
                                            <img src={card.imageUrl} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-red-500/30 mix-blend-overlay" />
                                        </motion.div>

                                        {/* The Pokéball */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 10 }}
                                            className="relative z-20"
                                        >
                                            <motion.img
                                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                                className="w-24 h-24 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                                animate={{
                                                    rotate: [0, -15, 15, -15, 15, 0],
                                                    x: [0, -4, 4, -4, 4, 0]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatDelay: 0.5,
                                                    times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                                                }}
                                            />

                                            {/* Button Light */}
                                            <motion.div
                                                animate={{
                                                    backgroundColor: ["rgb(255,255,255)", "rgb(255,0,0)", "rgb(255,255,255)"]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                                className="absolute top-[48%] left-[48%] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 z-30"
                                            />
                                        </motion.div>
                                    </div>

                                    <h2 className="text-2xl font-black font-display mb-2 mt-4 tracking-tight uppercase">¡Capturando Carta!</h2>
                                    <p className="text-gray-400 max-w-xs text-sm">
                                        Validando transacción en la PokéNexus Chain...
                                    </p>
                                </div>
                            )}

                            {step === "success" && (
                                <div className="animate-in zoom-in duration-500 flex flex-col items-center justify-center text-center py-8 relative">
                                    <div className="relative mb-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
                                            transition={{ duration: 0.5 }}
                                            className="w-32 h-32 rounded-full bg-green-500/10 flex items-center justify-center relative border border-green-500/20"
                                        >
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" className="w-20 h-20 opacity-40 absolute blur-[2px]" />
                                            <CheckCircle2 className="w-16 h-16 text-green-500 relative z-10" />
                                        </motion.div>

                                        {/* Capture stars */}
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, x: 0, y: 0 }}
                                                animate={{
                                                    scale: [0, 1, 0.5, 0],
                                                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                                                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                                                    rotate: [0, 180]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl pointer-events-none"
                                            >
                                                ✨
                                            </motion.div>
                                        ))}
                                    </div>

                                    <h2 className="text-3xl font-black font-display mb-3 tracking-tighter text-holographic animate-shimmer uppercase">¡CARTA CAPTURADA!</h2>
                                    <p className="text-gray-400 mb-8 max-w-xs text-sm leading-relaxed">
                                        ¡Excelente lanzamiento! <span className="text-white font-bold">{card.name}</span> ahora forma parte de tu colección.
                                    </p>

                                    <div className="w-full space-y-3 relative z-10">
                                        <button
                                            onClick={goToDashboard}
                                            className="group w-full py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                                        >
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                            Ir a mi Colección
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all"
                                        >
                                            Seguir Comprando
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
