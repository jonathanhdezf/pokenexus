"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search, TrendingUp, ShieldCheck, Loader2 } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cards, setCards] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch initial trending cards
    useEffect(() => {
        handleSearch("rarity:\"Rare Holo VMAX\"");
    }, []);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        try {
            const q = query || "rarity:\"Rare Holo VMAX\"";
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"*${q}*"&pageSize=6`);
            const data = await response.json();
            setCards(data.data || []);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const mapRarity = (rarity: string): "common" | "rare" | "ultra-rare" | "secret" => {
        const r = rarity?.toLowerCase() || "";
        if (r.includes("secret")) return "secret";
        if (r.includes("vmax") || r.includes("vstar") || r.includes("ultra")) return "ultra-rare";
        if (r.includes("rare")) return "rare";
        return "common";
    };

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
                                Marketplace Tiempo Real
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black font-display leading-[0.9] mb-8">
                            EL NEXUS <br />
                            <span className="text-holographic animate-shimmer">PREMIUM</span> <br />
                            <span className="text-white">DE TCG.</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                            Accede a la base de datos más grande del mundo. <br className="hidden md:block" />
                            Consulta precios reales, rarezas y <span className="text-white font-medium">disponibilidad global</span>.
                        </p>

                        <div className="relative group max-w-md">
                            <input
                                type="text"
                                placeholder="Busca Charizard, Mewtwo, Umbreon..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-all font-medium pr-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                            />
                            <button
                                onClick={() => handleSearch(searchTerm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-[320px] md:w-[450px] aspect-[3/4] animate-float">
                            <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[40px] opacity-50" />
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
                    { icon: TrendingUp, title: "Datos Reales", desc: "Sincronizado directamente con la API oficial de Pokémon TCG para precios y specs." },
                    { icon: ShieldCheck, title: "Filtros Avanzados", desc: "Encuentra cualquier carta por set, rareza o tipo de ataque con precisión quirúrgica." },
                    { icon: Search, title: "Tendencias Globales", desc: "Visualiza que cartas están subiendo de precio en tiempo real en los mercados internacionales." }
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

            {/* Dynamic Card Gallery Section */}
            <section className="w-full px-6 py-32 border-t border-white/5 relative bg-black/20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 font-display">
                                {searchTerm ? `RESULTADOS PARA "${searchTerm.toUpperCase()}"` : "CARTAS DESTACADAS"}
                            </h2>
                            <p className="text-gray-400">Datos verificados en tiempo real por el Nexus.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                            <Link href="/marketplace" className="px-6 py-2 rounded-full border border-white/10 text-sm font-bold text-gray-400 hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2 group">
                                Ver Catálogo Completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {cards.map((card, i) => (
                                <motion.div
                                    key={card.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <InteractiveCard
                                        id={card.id}
                                        name={card.name}
                                        set={card.set.name}
                                        price={card.cardmarket?.prices?.averageSellPrice ? `$${card.cardmarket.prices.averageSellPrice}` : "N/A"}
                                        imageUrl={card.images.large}
                                        rarity={mapRarity(card.rarity)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {!isLoading && cards.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                                <Search className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-xl font-display uppercase tracking-widest">No se encontraron cartas</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
