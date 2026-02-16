"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv, Info, Play, Signal } from "lucide-react";

export default function StreamingPage() {
    const [isTheaterMode, setIsTheaterMode] = useState(false);

    return (
        <main className={`min-h-screen bg-nexus transition-all duration-700 ${isTheaterMode ? 'pt-20 bg-black' : 'pt-32 pb-20 px-6'}`}>
            <div className={`max-w-7xl mx-auto transition-all duration-700 ${isTheaterMode ? 'max-w-none px-0' : ''}`}>
                {/* Hero Header - Hidden in Theater Mode */}
                {!isTheaterMode && (
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <Signal className="w-3 h-3 text-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Now</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-4">
                                POKÉMON <span className="text-holographic animate-shimmer">STREAMING</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl leading-relaxed">
                                Disfruta de la programación oficial de Pokémon las 24 horas del día.
                                Vive la experiencia Master en modo teatro y alta fidelidad sonora.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-6"
                        >
                            <button
                                onClick={() => setIsTheaterMode(true)}
                                className="px-6 py-3 rounded-xl glass-premium border border-white/10 hover:border-primary/50 text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all group"
                            >
                                <Play className="w-4 h-4 text-primary fill-primary group-hover:scale-110 transition-transform" />
                                Modo Teatro
                            </button>
                            <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center border border-white/10">
                                <Tv className="w-8 h-8 text-primary" />
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Player Container */}
                <motion.div
                    layout
                    className={`relative transition-all duration-700 overflow-hidden shadow-3xl bg-black ${isTheaterMode
                        ? 'w-full h-[85vh] rounded-none'
                        : 'aspect-video w-full rounded-[40px] border border-white/10'
                        }`}
                >
                    {/* The Iframe with Specific Latam Channel requested by User */}
                    <iframe
                        src="https://pluto.tv/latam/live-tv/6870072ca9d5c45c3e9466f1/embed?autoplay=true"
                        className="absolute inset-0 w-full h-full border-none z-0"
                        allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; volume"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>

                    {/* Theater Mode Exit Button - Placed inside a safe container to not block video controls */}
                    {isTheaterMode && (
                        <div className="absolute top-0 right-0 p-6 z-50">
                            <button
                                onClick={() => setIsTheaterMode(false)}
                                className="px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 shadow-2xl"
                            >
                                Salir del Modo Teatro
                            </button>
                        </div>
                    )}

                    {/* Visual Overlay - Only pointer-events-none to never block clicks */}
                    {!isTheaterMode && (
                        <div className="absolute inset-0 pointer-events-none z-10">
                            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent opacity-60" />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                        </div>
                    )}
                </motion.div>

                {/* Info Cards - Hidden in Theater Mode */}
                {!isTheaterMode && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {[
                            {
                                icon: Play,
                                title: "Programación 24/7",
                                desc: "Episodios continuos de todas las temporadas de la serie animada de Pokémon."
                            },
                            {
                                icon: Info,
                                title: "Control de Sonido",
                                desc: "Interactúa con el reproductor para habilitar el audio y ajustar el volumen a tu gusto."
                            },
                            {
                                icon: Signal,
                                title: "Experiencia Cine",
                                desc: "Activa el modo teatro para una inmersión total en el mundo Pokémon."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[32px] glass-premium group hover:border-primary/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10">
                                    <item.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-display">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
