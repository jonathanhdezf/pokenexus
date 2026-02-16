"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
    id: string; // Add ID for routing
    name: string;
    set: string;
    price: string;
    imageUrl: string;
    rarity: "common" | "rare" | "ultra-rare" | "secret";
}

export default function InteractiveCard({ id, name, set, price, imageUrl, rarity }: CardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <Link href={`/marketplace/${id}`}>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-72 h-96 rounded-xl bg-surface border border-white/10 shadow-xl cursor-pointer hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
                {/* Gloss/Reflection Layer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                        mixBlendMode: "overlay"
                    }}
                />

                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-4 rounded-lg overflow-hidden bg-black shadow-inner"
                >
                    {/* Card Image */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-500">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <span>Sin Imagen</span>
                        )}
                    </div>

                    {/* Dynamic Holographic Effect */}
                    <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-color-dodge z-20`}
                        style={{
                            background: rarity === 'secret' || rarity === 'ultra-rare'
                                ? "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.4) 60%, transparent 80%)"
                                : "none",
                            backgroundSize: "200% 200%",
                        }}
                    />

                    {/* Secret Rare Rainbow Effect */}
                    {rarity === 'secret' && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none bg-rainbow-gradient mix-blend-overlay z-10 animate-pulse" />
                    )}
                </div>

                <div
                    style={{ transform: "translateZ(75px)" }}
                    className="absolute bottom-6 left-6 right-6 z-30"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-tighter px-1.5 py-0.5 bg-primary/10 border border-primary/20 rounded">
                            {set}
                        </span>
                        {rarity !== 'common' && (
                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-tighter px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded">
                                {rarity}
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
                        {name}
                    </h3>
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-400 font-medium tracking-wide">VALOR DE MERCADO</span>
                        <span className="text-xl font-mono text-cyan-400 font-black drop-shadow-glow">
                            {price}
                        </span>
                    </div>
                </div>

                {/* Bottom Shine Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />
            </motion.div>
        </Link>
    );
}
