"use client";

import Link from "next/link";
import { ArrowRight, Flame, Search, TrendingUp, ShieldCheck } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import { motion } from "framer-motion";

export default function Home() {
    const featuredCards = [
        {
            id: 1,
            name: "Ultra Pro Penny Sleeves",
            set: "Protection Essentials",
            price: "$2.99",
            imageUrl: "https://m.media-amazon.com/images/I/61+7Xr-VqGL._AC_SL1000_.jpg",
            rarity: "common" as const,
        },
        {
            id: 2,
            name: "Tech Sticker: Gengar",
            set: "Ascended Heroes",
            price: "$15.99",
            imageUrl: "https://images.pokemontcg.io/swsh8/271_hires.png",
            rarity: "rare" as const,
        },
        {
            id: 3,
            name: "Marnie Premium Coin",
            set: "Champion's Path",
            price: "$4.50",
            imageUrl: "https://images.pokemontcg.io/swsh3/169_hires.png",
            rarity: "rare" as const,
        },
        {
            id: 4,
            name: "Mega Dream ex Box",
            set: "Japanese Exclusive",
            price: "$85.00",
            imageUrl: "https://product-images.tcgplayer.com/fit-in/437x437/484988.jpg",
            rarity: "ultra-rare" as const,
        },
        {
            id: 5,
            name: "Phantasmal Flames Pack",
            set: "Mega Evolution",
            price: "$4.99",
            imageUrl: "https://images.pokemontcg.io/xy2/pack_charizard_hires.png",
            rarity: "common" as const,
        },
    ];

    return (
        <main className="flex flex-col min-h-screen bg-nexus">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
                    <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-legendary/10 blur-[120px] rounded-full animate-pulse-glow" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 group cursor-default">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary transition-colors">
                                Acceso Beta ya Abierto
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black font-display leading-[0.9] mb-8">
                            EL NEXUS <br />
                            <span className="text-holographic animate-shimmer">PREMIUM</span> <br />
                            <span className="text-white">DE TCG.</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                            La plataforma definitiva para coleccionistas de élite. <br className="hidden md:block" />
                            Compra, vende y analiza cartas con <span className="text-white font-medium">datos de mercado en tiempo real</span>.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/marketplace"
                                className="px-8 py-4 bg-primary text-black font-black uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                            >
                                Explorar Mercado
                            </Link>
                            <Link
                                href="/auctions"
                                className="px-8 py-4 bg-white/5 text-white font-black uppercase tracking-wider rounded-xl hover:bg-white/10 border border-white/10 transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md"
                            >
                                Ver Subastas
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-[320px] md:w-[450px] aspect-[3/4] animate-float">
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[40px] opacity-50" />

                            {/* Main Card Image Overlay */}
                            <div className="absolute inset-0 glass-premium rounded-[32px] p-4 flex flex-col justify-end overflow-hidden group cursor-pointer shadow-2xl">
                                <div className="absolute inset-0 bg-[url('https://images.pokemontcg.io/swsh7/215_hires.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="relative z-10 flex justify-between items-end">
                                    <div>
                                        <h3 className="text-2xl font-black text-white">Umbreon VMAX</h3>
                                        <p className="text-primary font-bold text-xs uppercase tracking-widest">Evolving Skies</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Valor de Mercado</p>
                                        <p className="text-2xl font-black text-white">$650.00</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-holo-card mix-blend-overlay animate-holofoil bg-[length:200%_200%]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    { icon: TrendingUp, title: "Valores en Vivo", desc: "Accede instantáneamente a datos de ventas verificados de las casas de subastas más prestigiosas." },
                    { icon: ShieldCheck, title: "Certificación Elite", desc: "Cada carta es verificada mediante nuestro proceso de autenticación digital avanzada." },
                    { icon: Search, title: "Análisis de Portafolio", desc: "Rastrea el valor histórico de tu colección con herramientas de análisis de nivel profesional." }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[32px] glass hover:border-primary/30 transition-all group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                            <feature.icon className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-white transition-colors">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* Trending Section */}
            <section className="w-full px-6 py-32 border-t border-white/5 relative bg-black/20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 font-display">TENDENCIAS DE HOY</h2>
                            <p className="text-gray-400">Las piezas más codiciadas que se mueven en el mercado global.</p>
                        </div>
                        <Link href="/marketplace" className="px-6 py-2 rounded-full border border-white/10 text-sm font-bold text-gray-400 hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2 group">
                            Ver Todo el Mercado <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {featuredCards.map((card, i) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <InteractiveCard
                                    id={card.id.toString()}
                                    name={card.name}
                                    set={card.set}
                                    price={card.price}
                                    imageUrl={card.imageUrl}
                                    rarity={card.rarity}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
