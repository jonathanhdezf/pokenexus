"use client";

import { motion } from "framer-motion";
import { Tv, Info, Play, Signal, Share2, Heart, Award, Zap } from "lucide-react";

export default function StreamingPage() {
    return (
        <main className="min-h-screen bg-nexus pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Floating Sprites */}
            <div className="absolute top-40 right-[10%] opacity-15 hidden lg:block">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
                    alt="Rayquaza"
                    className="w-80 h-80 animate-pulse-glow"
                />
            </div>
            <div className="absolute bottom-20 left-[5%] opacity-10 hidden lg:block">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png"
                    alt="Arcanine"
                    className="w-60 h-60"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-recorder.png" alt="" className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Now</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black font-display mb-6 leading-tight">
                            POKÉMON <br />
                            <span className="text-holographic animate-shimmer">STREAMING</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Disfruta de la programación oficial de Pokémon las 24 horas del día.
                            Desde las aventuras clásicas en Kanto hasta las batallas más recientes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-6"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Canal Oficial</p>
                            <p className="text-white font-black text-xl">Pluto TV Latino</p>
                        </div>
                        <div className="w-20 h-20 rounded-3xl glass-premium flex items-center justify-center border border-white/10 shadow-2xl shadow-primary/20">
                            <Tv className="w-10 h-10 text-primary" />
                        </div>
                    </motion.div>
                </div>

                {/* Player Container */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 rounded-[42px] blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-shimmer" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-video w-full rounded-[40px] overflow-hidden border border-white/10 shadow-3xl bg-black"
                    >
                        <iframe
                            src="https://pluto.tv/latam/live-tv/6870072ca9d5c45c3e9466f1?msockid=0c2e9bd020c663e914428d3d21596216"
                            className="absolute inset-0 w-full h-full border-none z-0"
                            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; volume"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </div>

                {/* Engagement Stats Bar */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                    {[
                        { label: "Viendo Ahora", value: "3,420", icon: <Signal className="w-4 h-4 text-green-400 animate-pulse" /> },
                        { label: "Me Gusta", value: "125.4K", icon: <Heart className="w-4 h-4 text-red-400" /> },
                        { label: "Compartido", value: "45.2K", icon: <Share2 className="w-4 h-4 text-blue-400" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-2xl glass hover:border-white/20 transition-all">
                            {stat.icon}
                            <div className="flex items-center gap-2">
                                <span className="text-white font-black">{stat.value}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    {[
                        {
                            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
                            title: "Programación 24/7",
                            desc: "Episodios continuos de todas las temporadas de la serie animada de Pokémon, desde Kanto hasta Galar.",
                            color: "bg-blue-500/10",
                            textColor: "text-blue-400"
                        },
                        {
                            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png",
                            title: "Sin Costo para la Comunidad",
                            desc: "Transmisión legal cortesía de Pluto TV. Disfruta del contenido oficial de forma gratuita en tu portal favorito.",
                            color: "bg-green-500/10",
                            textColor: "text-green-400"
                        },
                        {
                            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
                            title: "Experiencia Premium",
                            desc: "Interfaz optimizada para una visualización inmersiva. Compatible con todos tus dispositivos.",
                            color: "bg-purple-500/10",
                            textColor: "text-purple-400"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[40px] glass hover:border-primary/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <img src={item.icon} alt="" className="w-32 h-32" />
                            </div>
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 shrink-0 border border-white/5`}>
                                <img src={item.icon} alt="" className="w-9 h-9" />
                            </div>
                            <h3 className="text-2xl font-black font-display mb-4 text-white uppercase tracking-tight">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${item.textColor} group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100`}>
                                Más Información <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon / Newsletter */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 md:p-16 rounded-[48px] glass relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10" />
                    <div className="absolute -bottom-10 -right-10 opacity-10">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-60 h-60" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <Award className="w-6 h-6" />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">Próximamente</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black font-display mb-6 uppercase leading-tight">Canales <br />de la Comunidad</h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Estamos trabajando para permitir que los Streamers del Nexus puedan transmitir directamente en nuestra plataforma. ¡Prepárate para las noches de apertura de sobres en vivo!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all flex items-center justify-center gap-3">
                                <Zap className="w-5 h-5" /> Notificarme
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all">
                                Ver Calendario
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}

const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
);
