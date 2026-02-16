import Link from "next/link";
import { ArrowRight, Flame, Search, TrendingUp, ShieldCheck } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";

export default function Home() {
    const featuredCards = [
        {
            id: 1,
            name: "Charizard Holo",
            set: "Base Set (First Edition)",
            price: "$350,000",
            imageUrl: "https://images.pokemontcg.io/base1/4_hires.png",
            rarity: "secret" as const,
        },
        {
            id: 2,
            name: "Pikachu Illustrator",
            set: "Promo",
            price: "$4,200,000",
            imageUrl: "https://images.pokemontcg.io/pl3/112_hires.png", // Placeholder
            rarity: "ultra-rare" as const,
        },
        {
            id: 3,
            name: "Umbreon VMAX (Alt Art)",
            set: "Evolving Skies",
            price: "$650",
            imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
            rarity: "secret" as const,
        },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-purple-900/10 to-background pointer-events-none" />

                <div className="z-10 max-w-5xl px-4 animate-fade-in-up">
                    <div className="mb-6 flex justify-center space-x-2">
                        <span className="px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/30 rounded-full bg-primary/10 uppercase drop-shadow-glow">
                            Acceso Beta ya Abierto
                        </span>
                        <span className="px-3 py-1 text-xs font-bold tracking-wider text-secondary border border-secondary/30 rounded-full bg-secondary/10 uppercase drop-shadow-glow">
                            Subastas en Vivo
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-xl font-display">
                        POKÉ<span className="text-primary">NEXUS</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        El mercado principal para coleccionistas de élite. <br className="hidden md:block" />
                        Compra, vende y analiza cartas con <span className="text-white font-medium">datos de mercado en tiempo real</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/marketplace"
                            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explorar Mercado <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
                        </Link>

                        <Link
                            href="/auctions"
                            className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <Flame className="w-5 h-5 text-orange-500" /> Subastas en Vivo
                        </Link>
                    </div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
            </section>

            {/* Features Grid */}
            <section className="w-full max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: TrendingUp, title: "Valores en Tiempo Real", desc: "Accede instantáneamente a datos de ventas verificados de eBay, TCGPlayer y PWCC." },
                    { icon: ShieldCheck, title: "Garantía de Autenticidad", desc: "Cada carta graduada es verificada contra bases de datos de certificación oficiales." },
                    { icon: Search, title: "Seguimiento de Portafolio", desc: "Rastrea el valor de tu colección a lo largo del tiempo con análisis avanzados." }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/20 transition-colors group">
                        <feature.icon className="w-12 h-12 text-gray-500 group-hover:text-primary mb-6 transition-colors" />
                        <h3 className="text-2xl font-bold mb-3 font-display">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Live Drops Preview */}
            <section className="w-full px-6 py-24 border-t border-white/5 bg-black/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2 font-display">Tendencias de Hoy</h2>
                            <p className="text-gray-400">Las cartas más calientes moviéndose en el mercado esta hora.</p>
                        </div>
                        <Link href="/marketplace" className="text-primary hover:text-white transition-colors flex items-center gap-2">
                            Ver Todo <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {featuredCards.map((card) => (
                            <InteractiveCard
                                key={card.id}
                                id={card.id.toString()}
                                name={card.name}
                                set={card.set}
                                price={card.price}
                                imageUrl={card.imageUrl}
                                rarity={card.rarity}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
