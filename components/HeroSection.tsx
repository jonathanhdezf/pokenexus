"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    // We could pass props if needed, but for now it's static content
}

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full animate-pulse-glow" />
                <div className="absolute bottom-[0%] right-[-5%] w-[50%] h-[50%] bg-legendary/10 blur-[130px] rounded-full animate-pulse-glow" />

                {/* Subtle Scanlines/Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

                {/* Floating Background Pokémon */}
                <motion.div
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    animate={{ opacity: 0.15, x: 0, rotate: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute top-40 left-[-5%] hidden xl:block"
                >
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png" alt="" className="w-96 h-96 grayscale hover:grayscale-0 transition-all duration-1000" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100, rotate: 20 }}
                    animate={{ opacity: 0.1, x: 0, rotate: 10 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="absolute bottom-20 right-[5%] hidden xl:block"
                >
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" alt="" className="w-80 h-80 grayscale" />
                </motion.div>

                {/* Floating Items */}
                <div className="absolute inset-0">
                    {[
                        { id: 1, x: '15%', y: '20%', icon: 'master-ball', delay: 0 },
                        { id: 2, x: '85%', y: '15%', icon: 'ultra-ball', delay: 2 },
                        { id: 3, x: '10%', y: '80%', icon: 'rare-candy', delay: 1 },
                        { id: 4, x: '90%', y: '70%', icon: 'exp-share', delay: 3 },
                        { id: 5, x: '50%', y: '10%', icon: 'poke-ball', delay: 4 },
                    ].map((item) => (
                        <motion.img
                            key={item.id}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.icon}.png`}
                            alt=""
                            className="absolute w-8 h-8 opacity-20"
                            style={{ left: item.x, top: item.y }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 360],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 5,
                                delay: item.delay,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 blur-none hover:border-primary/30 transition-all group cursor-default"
                    >
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary transition-colors">
                            Marketplace Tiempo Real • Beta v2.5
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black font-display leading-[0.9] mb-8"
                    >
                        EL NEXUS <br />
                        <span className="text-holographic animate-shimmer">PREMIUM</span> <br />
                        <span className="text-white">DE TCG.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
                    >
                        Accede a la base de datos más grande del mundo. <br className="hidden md:block" />
                        Consulta precios reales, rarezas y <span className="text-white font-medium">disponibilidad global</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a
                            href="#catalog-section"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20"
                        >
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" className="w-5 h-5" />
                            Explorar Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-[320px] md:w-[450px] aspect-[3/4] animate-float group cursor-pointer">
                        {/* 1. Underlying Glow */}
                        <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[40px] opacity-50" />

                        {/* 2. Elemental Aura Layer */}
                        <div className="absolute inset-0 elemental-border elemental-lightning rounded-[32px] pointer-events-none z-0" />

                        {/* 3. Main Card Content */}
                        <div className="absolute inset-0 glass-premium rounded-[32px] p-4 flex flex-col justify-end overflow-hidden shadow-2xl border border-white/10 z-10">
                            {/* Animated lightning bolt particles */}
                            {[0, 1, 2, 3].map((i) => (
                                <svg key={i} className="lightning-bolt" width="16" height="24" viewBox="0 0 16 24" fill="none">
                                    <path d="M10 0L0 14h6L4 24l12-16H10L14 0h-4z" fill="#ffd700" />
                                </svg>
                            ))}

                            <div className="absolute inset-0 bg-[url('https://images.pokemontcg.io/swsh12pt5/160_hires.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="relative z-20 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-black text-white">Pikachu VMAX</h3>
                                    <p className="text-primary font-bold text-xs uppercase tracking-widest">Crown Zenith</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Valor de Mercado</p>
                                    <p className="text-2xl font-black text-white">$250.00</p>
                                </div>
                            </div>

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                <div className="absolute inset-0 bg-holo-card mix-blend-overlay animate-holofoil bg-[length:200%_200%]" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
