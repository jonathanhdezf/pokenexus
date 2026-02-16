"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Calendar, Clock, Gavel, User, ArrowLeft, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Bid {
    id: string;
    amount: number;
    placedAt: string;
    user: {
        name: string | null;
        username: string | null;
        image: string | null;
    };
}

interface AuctionDetailProps {
    listingId: string;
    initialPrice: number;
    initialBids: any[];
    endsAt: string;
    card: {
        name: string;
        imageUrl: string;
        set: string;
        rarity: string;
        condition: string;
    };
}

export default function AuctionDetail({ listingId, initialPrice, initialBids, endsAt, card }: AuctionDetailProps) {
    const router = useRouter();
    const { data: session, update } = useSession(); // Access session update to refresh balance

    const [currentPrice, setCurrentPrice] = useState(initialPrice);
    const [bids, setBids] = useState<Bid[]>(initialBids);
    const [timeLeft, setTimeLeft] = useState("");
    const [bidAmount, setBidAmount] = useState("");
    const [isEnded, setIsEnded] = useState(false);

    // Feedback States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // 1. Timer Logic
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const end = new Date(endsAt).getTime();
            const distance = end - now;

            if (distance < 0) {
                setTimeLeft("Subasta Finalizada");
                setIsEnded(true);
                if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [endsAt]);

    // 2. Real-time Polling Logic
    useEffect(() => {
        if (isEnded) return;

        const fetchUpdates = async () => {
            try {
                const res = await fetch(`/api/auctions/${listingId}`);
                if (!res.ok) return;
                const data = await res.json();

                setCurrentPrice(Number(data.price));
                setBids(data.bids.map((b: any) => ({
                    ...b,
                    amount: Number(b.amount),
                    placedAt: b.placedAt, // string from JSON
                    user: b.user
                })));

                if (data.status !== 'ACTIVE' || new Date(data.endsAt) < new Date()) {
                    setIsEnded(true);
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        // Poll every 3 seconds
        pollIntervalRef.current = setInterval(fetchUpdates, 3000);
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [listingId, isEnded]);

    // 3. Bid Logic
    const handleBid = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            setError("Por favor inicia sesión para pujar.");
            return;
        }

        const amount = Number(bidAmount);
        if (!amount || amount <= currentPrice) {
            setError("La puja debe ser mayor al precio actual.");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            const res = await fetch(`/api/auctions/${listingId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to place bid");
            }

            setSuccessMsg("¡Puja realizada con éxito!");
            setBidAmount("");

            // Optimistic Update
            setCurrentPrice(amount);
            // Force session update to reflect new balance
            update();

            // Refresh data immediately
            // router.refresh(); // Optional, polling handles it
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const minBid = currentPrice < 100 ? currentPrice + 5 : currentPrice + 10;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Image */}
            <div className="lg:col-span-5">
                <div className="relative aspect-[3/4] w-full max-w-sm mx-auto group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                        {card.imageUrl ? (
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain p-4" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">Sin Imagen</div>
                        )}
                    </div>

                    {/* Live Badge */}
                    {!isEnded && (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full backdrop-blur-md z-10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Subasta en Vivo</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Bidding Interface */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                            {card.rarity || 'Rare'}
                        </span>
                        <span className="text-gray-500 text-sm font-medium">{card.set}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white">{card.name}</h1>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex-1 min-w-[200px] bg-surface/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Puja Actual</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-mono font-bold text-white">${currentPrice.toLocaleString()}</span>
                                {bids.length > 0 && <span className="text-green-500 text-xs font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> {bids.length} pujas</span>}
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] bg-surface/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Tiempo Restante</p>
                            <div className="text-3xl font-mono font-bold text-primary flex items-center gap-2">
                                <Clock className="w-6 h-6 animate-pulse" />
                                {timeLeft}
                            </div>
                        </div>
                    </div>
                </div>

                {!isEnded ? (
                    <div className="bg-surface border border-white/10 rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-primary" /> Realizar una Puja
                        </h3>

                        <form onSubmit={handleBid} className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    className="w-full pl-8 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white text-lg font-mono outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                                    placeholder={`Ingresa $${minBid}+`}
                                    min={minBid}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm">
                                <button type="button" onClick={() => setBidAmount(String(currentPrice + 10))} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors">
                                    + $10
                                </button>
                                <button type="button" onClick={() => setBidAmount(String(currentPrice + 25))} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors">
                                    + $25
                                </button>
                                <button type="button" onClick={() => setBidAmount(String(currentPrice + 50))} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors">
                                    + $50
                                </button>
                                <button type="button" onClick={() => setBidAmount(String(currentPrice + 100))} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors">
                                    + $100
                                </button>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                                </div>
                            )}

                            {successMsg && (
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <span className="animate-pulse">Procesando...</span> : 'Pujar'}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-2">
                                Tu saldo de billetera: <span className="text-white font-bold">${Number((session?.user as any)?.walletBalance || 0).toLocaleString()}</span>
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="bg-surface border border-white/10 rounded-2xl p-8 text-center opacity-75">
                        <h3 className="text-2xl font-bold mb-2 text-gray-300">Subasta Finalizada</h3>
                        <p className="text-gray-500">Este listado ya no acepta pujas.</p>
                        {bids.length > 0 && (
                            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <p className="text-green-500 font-bold">Vendido por ${currentPrice.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mt-1">Ganador: {bids[0].user?.username || 'Usuario Privado'}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Bid History */}
                <div className="bg-surface/30 border border-white/5 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Historial de Pujas</h3>
                        <span className="text-xs text-gray-500">{bids.length} pujas en total</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        {bids.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">Sin pujas aún. ¡Sé el primero!</div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                <AnimatePresence>
                                    {bids.map((bid) => (
                                        <motion.div
                                            key={bid.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                                    {bid.user?.username?.[0].toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-white">{bid.user?.username || 'User'}</div>
                                                    <div className="text-xs text-gray-500">{new Date(bid.placedAt).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                            <div className="font-mono font-bold text-primary">
                                                ${bid.amount.toLocaleString()}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
