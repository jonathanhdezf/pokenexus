"use client";

import { motion } from "framer-motion";
import {
    Layers,
    Package,
    Box,
    ShieldCheck,
    Grid,
    Archive,
    ShoppingBag,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "singles",
        name: "Cartas sueltas",
        description: "Encuentra esa carta específica que le falta a tu colección.",
        icon: Layers,
        color: "from-cyan-500 to-blue-600",
        href: "/marketplace?category=singles",
        count: "12,450+ artículos"
    },
    {
        id: "packs",
        name: "Sobres",
        description: "Prueba tu suerte con sobres individuales de expansiones nuevas y clásicas.",
        icon: Package,
        color: "from-purple-500 to-indigo-600",
        href: "/marketplace?category=packs",
        count: "850+ artículos"
    },
    {
        id: "boxes",
        name: "Caja de Sobres",
        description: "Cajas selladas de 36 sobres para los coleccionistas más serios.",
        icon: Box,
        color: "from-orange-500 to-red-600",
        href: "/marketplace?category=boxes",
        count: "320+ artículos"
    },
    {
        id: "sealed",
        name: "Productos Sellados",
        description: "Elite Trainer Boxes, latas, y colecciones especiales sin abrir.",
        icon: ShieldCheck,
        color: "from-green-500 to-emerald-600",
        href: "/marketplace?category=sealed",
        count: "540+ artículos"
    },
    {
        id: "sets",
        name: "Sets",
        description: "Colecciones completas de expansiones específicas.",
        icon: Grid,
        color: "from-amber-400 to-orange-500",
        href: "/marketplace?category=sets",
        count: "120+ artículos"
    },
    {
        id: "lots",
        name: "Lotes y colecciones",
        description: "Grandes volúmenes de cartas a precios competitivos.",
        icon: Archive,
        color: "from-pink-500 to-rose-600",
        href: "/marketplace?category=lots",
        count: "210+ artículos"
    },
    {
        id: "accessories",
        name: "Accesorios",
        description: "Micas, cajas de mazos, tapetes y protectores para tus cartas.",
        icon: ShoppingBag,
        color: "from-slate-400 to-slate-600",
        href: "/marketplace?category=accessories",
        count: "1,100+ artículos"
    }
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Explorar Productos</h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Navega por el catálogo más completo de Pokémon TCG. Desde cartas individuales raras hasta productos sellados exclusivos.
                    </p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={category.href} className="group block h-full">
                            <div className="bg-surface border border-white/10 rounded-2xl p-6 h-full flex flex-col transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden">
                                {/* Background Gradient Glow */}
                                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                        {category.count}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                    {category.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-primary transition-colors">
                                    Ver productos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Popular Section */}
            <section className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold font-display">Tendencias en Pokémon</h2>
                    <Link href="/marketplace" className="text-primary hover:text-cyan-400 font-bold flex items-center gap-1 transition-colors">
                        Ver todo el mercado <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Mocked Trending Items */}
                    {[
                        { id: "1", name: "Charizard VMAX", set: "Shining Fates", price: "$120.00", rarity: "secret", img: "https://images.pokemontcg.io/swsh45sv/SV107_hires.png" },
                        { id: "2", name: "Umbreon VMAX", set: "Evolving Skies", price: "$650.00", rarity: "secret", img: "https://images.pokemontcg.io/swsh7/215_hires.png" },
                        { id: "3", name: "Pikachu V", set: "Celebrations", price: "$45.00", rarity: "ultra-rare", img: "https://images.pokemontcg.io/cel25/25_hires.png" },
                        { id: "4", name: "Lugia V", set: "Silver Tempest", price: "$180.00", rarity: "ultra-rare", img: "https://images.pokemontcg.io/swsh12/186_hires.png" }
                    ].map((item) => (
                        <div key={item.id} className="group">
                            <div className="bg-surface border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-2">
                                <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-black mb-4">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <h4 className="font-bold text-white mb-1 truncate">{item.name}</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{item.set}</span>
                                    <span className="text-primary font-mono font-bold">{item.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Banner / CTA */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20 relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-black to-black z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

                <div className="absolute inset-0 z-20 flex flex-col justify-center px-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">¿Tienes productos para vender?</h2>
                    <p className="text-gray-300 max-w-md mb-8">
                        Únete a miles de vendedores y convierte tus cartas en dinero real con las comisiones más bajas del mercado.
                    </p>
                    <Link
                        href="/sell"
                        className="w-fit px-8 py-4 bg-primary text-black font-black uppercase tracking-wider rounded-xl hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                    >
                        Empezar a Vender
                    </Link>
                </div>
            </motion.section>
        </main>
    );
}
