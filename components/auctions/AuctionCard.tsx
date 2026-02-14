"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Gavel, User } from "lucide-react";

interface AuctionCardProps {
    id: string; // Listing ID
    cardName: string;
    cardImage: string;
    currentBid: number;
    endsAt: string;
    topBidderName?: string | null;
}

export default function AuctionCard({ id, cardName, cardImage, currentBid, endsAt, topBidderName }: AuctionCardProps) {
    const [timeLeft, setTimeLeft] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const end = new Date(endsAt).getTime();
            const distance = end - now;

            if (distance < 0) {
                setTimeLeft("Closed");
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endsAt]);

    return (
        <Link href={`/auctions/${id}`} className="block group">
            <motion.div
                className="relative bg-surface border border-white/10 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:border-primary/50 hover:shadow-primary/20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Card Image Area */}
                <div className="aspect-[3/4] relative bg-black flex items-center justify-center p-4">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />

                    <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1">
                        {cardImage ? (
                            <img src={cardImage} alt={cardName} className="w-full h-full object-contain drop-shadow-2xl" />
                        ) : (
                            <div className="text-gray-600 font-bold text-2xl">?</div>
                        )}
                    </div>

                    {/* Live Indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded-full backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Live</span>
                    </div>

                    {/* Timer Badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 border border-white/10 rounded-lg backdrop-blur-md flex items-center gap-2">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-xs font-mono font-bold text-white">{timeLeft}</span>
                    </div>
                </div>

                {/* Info Area */}
                <div className="p-4 border-t border-white/5 bg-surfaceHighlight/50 backdrop-blur-sm">
                    <h3 className="font-bold text-white text-lg truncate mb-1">{cardName}</h3>

                    <div className="flex justify-between items-end mt-3">
                        <div>
                            <p className="text-xs text-gray-400 uppercase mb-0.5">Current Bid</p>
                            <p className="text-xl font-mono font-bold text-primary flex items-center gap-1">
                                ${currentBid.toLocaleString()}
                            </p>
                            {topBidderName && (
                                <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                                    <User className="w-3 h-3" />
                                    <span>{topBidderName}</span>
                                </div>
                            )}
                        </div>
                        <button className={`p-2 rounded-lg bg-white text-black transition-all transform active:scale-95 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            <Gavel className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
