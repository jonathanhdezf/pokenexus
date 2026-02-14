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
                className="relative w-72 h-96 rounded-xl bg-surface border border-white/10 shadow-xl cursor-pointer hover:border-primary/50 transition-colors"
            >
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-4 rounded-lg overflow-hidden bg-black"
                >
                    {/* Placeholder image if not provided */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-500">
                        {imageUrl ? (
                            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>

                    {/* Holographic overlay */}
                    <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay ${rarity === 'secret' ? 'bg-rainbow-gradient' : ''}`} />
                </div>

                <div
                    style={{ transform: "translateZ(75px)" }}
                    className="absolute bottom-6 left-6 right-6"
                >
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{set}</span>
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md truncate">{name}</h3>
                    <div className="flex justify-between items-end">
                        <span className="text-sm text-gray-400">Market Price</span>
                        <span className="text-lg font-mono text-cyan-400 font-bold">{price}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
