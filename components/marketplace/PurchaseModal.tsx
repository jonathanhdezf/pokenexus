"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck, Wallet, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                        <Loader2 className="w-16 h-16 text-primary animate-spin relative" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Verifying Transaction</h2>
                                    <p className="text-gray-400 max-w-xs">
                                        Authenticating card ownership and processing payment on the PokéNexus chain...
                                    </p>
                                </div>
                            )}

                            {step === "success" && (
                                <div className="animate-in zoom-in duration-500 flex flex-col items-center justify-center text-center py-8">
                                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 relative">
                                        <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full animate-pulse" />
                                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-3">Card Secured!</h2>
                                    <p className="text-gray-400 mb-8 max-w-xs">
                                        Congratulations! <span className="text-white font-bold">{card.name}</span> has been added to your vault.
                                    </p>

                                    <div className="w-full space-y-3">
                                        <button
                                            onClick={goToDashboard}
                                            className="w-full py-4 bg-primary text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-primary/20"
                                        >
                                            Go to Vault
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-full py-4 bg-surface-highlight text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                                        >
                                            Maybe Later
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
