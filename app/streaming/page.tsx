"use client";

import { motion } from "framer-motion";
import { Tv, Info, Play, Signal } from "lucide-react";

export default function StreamingPage() {
    return (
        <main className="min-h-screen bg-nexus pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
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
                            Desde las aventuras clásicas en Kanto hasta las batallas más recientes,
                            vive la experiencia Master sin salir de PokéNexus.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-6"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Canal Oficial</p>
                            <p className="text-white font-bold">Pluto TV Latino</p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center border border-white/10">
                            <Tv className="w-8 h-8 text-primary" />
                        </div>
                    </motion.div>
                </div>

                {/* Player Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-video w-full rounded-[40px] overflow-hidden border border-white/10 shadow-3xl group"
                >
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all duration-500" />

                    {/* The Iframe */}
                    <iframe
                        src="https://pluto.tv/latam/live-tv/6870072ca9d5c45c3e9466f1?msockid=0c2e9bd020c663e914428d3d21596216"
                        className="w-full h-full border-none"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>

                    {/* Overlay Decor */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {[
                        {
                            icon: Play,
                            title: "Programación 24/7",
                            desc: "Episodios continuos de todas las temporadas de la serie animada de Pokémon."
                        },
                        {
                            icon: Info,
                            title: "Contenido Oficial",
                            desc: "Transmisión legal cortesía de Pluto TV para toda la comunidad Nexus."
                        },
                        {
                            icon: Signal,
                            title: "Alta Definición",
                            desc: "Disfruta de la mejor calidad visual disponible para streaming en vivo."
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
            </div>
        </main>
    );
}
