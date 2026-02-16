"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "singles",
        name: "Cartas Sueltas",
        description: "Encuentra esa carta ex, VMAX o Full Art específica que necesitas para completar tu colección o mazo competitivo.",
        color: "from-cyan-500/20 to-blue-600/20",
        border: "hover:border-cyan-500/40",
        textColor: "text-cyan-400",
        href: "/marketplace?category=singles",
        count: "12,450+",
        image: "https://images.pokemontcg.io/sv3pt5/6_hires.png",
        imageBg: "https://images.pokemontcg.io/swsh7/215_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
    },
    {
        id: "packs",
        name: "Sobres de Expansión",
        description: "Prueba tu suerte abriendo sobres. Cada sobre contiene 10 cartas con al menos 1 carta rara o superior garantizada.",
        color: "from-purple-500/20 to-indigo-600/20",
        border: "hover:border-purple-500/40",
        textColor: "text-purple-400",
        href: "/marketplace?category=packs",
        count: "850+",
        image: "https://images.pokemontcg.io/sv3pt5/151_hires.png",
        imageBg: "https://images.pokemontcg.io/sv3pt5/150_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
    },
    {
        id: "boxes",
        name: "Cajas de Sobres (Booster Box)",
        description: "36 sobres sellados de fábrica. La mejor forma de obtener cartas raras con el mayor valor por tu dinero.",
        color: "from-orange-500/20 to-red-600/20",
        border: "hover:border-orange-500/40",
        textColor: "text-orange-400",
        href: "/marketplace?category=boxes",
        count: "320+",
        image: "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
        imageBg: "https://images.pokemontcg.io/swsh9/176_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
    },
    {
        id: "sealed",
        name: "Elite Trainer Box (ETB)",
        description: "El producto premium: 9 sobres, protectores, dados, contadores de daño, carta promo exclusiva y caja de almacenamiento.",
        color: "from-green-500/20 to-emerald-600/20",
        border: "hover:border-green-500/40",
        textColor: "text-green-400",
        href: "/marketplace?category=sealed",
        count: "540+",
        image: "https://images.pokemontcg.io/sv3pt5/94_hires.png",
        imageBg: "https://images.pokemontcg.io/sv3pt5/65_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
    },
    {
        id: "battle-decks",
        name: "Mazos de Batalla",
        description: "Mazos de 60 cartas listos para jugar. Incluyen moneda, contadores de daño y guía de estrategia. Perfectos para empezar.",
        color: "from-red-500/20 to-pink-600/20",
        border: "hover:border-red-500/40",
        textColor: "text-red-400",
        href: "/marketplace?category=decks",
        count: "180+",
        image: "https://images.pokemontcg.io/sv3pt5/130_hires.png",
        imageBg: "https://images.pokemontcg.io/sv3pt5/68_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png",
    },
    {
        id: "collections",
        name: "Colecciones Especiales",
        description: "Latas, cajas especiales y colecciones premium con cartas promo exclusivas, material de juego y contenido único.",
        color: "from-amber-400/20 to-yellow-500/20",
        border: "hover:border-amber-400/40",
        textColor: "text-amber-400",
        href: "/marketplace?category=collections",
        count: "210+",
        image: "https://images.pokemontcg.io/sv3pt5/149_hires.png",
        imageBg: "https://images.pokemontcg.io/cel25/4_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png",
    },
    {
        id: "accessories",
        name: "Accesorios TCG",
        description: "Protectores de cartas, tapetes de juego, deck boxes, dados, carpetas de colección y todo lo que necesitas para proteger tu colección.",
        color: "from-slate-400/20 to-gray-600/20",
        border: "hover:border-slate-400/40",
        textColor: "text-slate-300",
        href: "/marketplace?category=accessories",
        count: "1,100+",
        image: "https://images.pokemontcg.io/sv3pt5/25_hires.png",
        imageBg: "https://images.pokemontcg.io/sv3pt5/133_hires.png",
        pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
    },
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="" className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Guía de Productos</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
                            PRODUCTOS <br />
                            <span className="text-holographic animate-shimmer">POKÉMON TCG</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Desde cartas individuales hasta colecciones premium selladas. Encuentra el producto perfecto para tu nivel, ya seas principiante o coleccionista experto.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    {/* Featured - First 2 categories as large cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {categories.slice(0, 2).map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                            >
                                <Link href={cat.href} className="group block h-full">
                                    <div className={`relative rounded-[32px] glass ${cat.border} transition-all h-full min-h-[320px] overflow-hidden`}>
                                        {/* Background glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        {/* Card images */}
                                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                            <div className="relative">
                                                <img src={cat.imageBg} alt="" className="w-40 h-56 object-contain rotate-[-8deg] absolute -right-4 -top-2 opacity-60" />
                                                <img src={cat.image} alt="" className="w-44 h-60 object-contain rotate-[5deg] relative z-10 group-hover:rotate-[8deg] transition-transform duration-500" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                    <img src={cat.item} alt="" className="w-8 h-8" />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                    {cat.count} artículos
                                                </span>
                                            </div>
                                            <h3 className={`text-3xl font-black font-display mb-3 group-hover:${cat.textColor} transition-colors`}>
                                                {cat.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                                                {cat.description}
                                            </p>
                                            <span className={`inline-flex items-center gap-2 ${cat.textColor} font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all w-fit`}>
                                                Explorar <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Remaining categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {categories.slice(2, 5).map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: (index + 2) * 0.15 }}
                            >
                                <Link href={cat.href} className="group block h-full">
                                    <div className={`relative rounded-[32px] glass ${cat.border} transition-all h-full min-h-[280px] overflow-hidden`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        {/* Pokemon artwork */}
                                        <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                                            <img src={cat.pokemon} alt="" className="w-40 h-40 group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Card preview */}
                                        <div className="absolute top-6 right-6 opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                                            <img src={cat.image} alt="" className="w-24 h-32 object-contain rotate-[6deg] group-hover:rotate-[10deg] transition-transform duration-500" />
                                        </div>

                                        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                    <img src={cat.item} alt="" className="w-7 h-7" />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                    {cat.count}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black font-display mb-2 group-hover:text-white transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                                {cat.description}
                                            </p>
                                            <span className={`inline-flex items-center gap-2 ${cat.textColor} font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all w-fit`}>
                                                Ver productos <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Last 2 categories as wide cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {categories.slice(5).map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: (index + 5) * 0.15 }}
                            >
                                <Link href={cat.href} className="group block h-full">
                                    <div className={`relative rounded-[32px] glass ${cat.border} transition-all h-full overflow-hidden`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                                            <img src={cat.pokemon} alt="" className="w-48 h-48 group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        <div className="absolute top-6 right-8 opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                                            <div className="relative">
                                                <img src={cat.imageBg} alt="" className="w-20 h-28 object-contain rotate-[-6deg] absolute -right-2 top-0 opacity-60" />
                                                <img src={cat.image} alt="" className="w-24 h-32 object-contain rotate-[4deg] relative z-10" />
                                            </div>
                                        </div>

                                        <div className="relative z-10 p-10 flex flex-col justify-end min-h-[240px]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                    <img src={cat.item} alt="" className="w-7 h-7" />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                    {cat.count} artículos
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black font-display mb-2 group-hover:text-white transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-md">
                                                {cat.description}
                                            </p>
                                            <span className={`inline-flex items-center gap-2 ${cat.textColor} font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all w-fit`}>
                                                Explorar <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Cards */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png" alt="" className="w-8 h-8" />
                            <h2 className="text-3xl font-black font-display">CARTAS POPULARES</h2>
                        </div>
                        <Link href="/marketplace" className="text-primary hover:text-cyan-400 font-black flex items-center gap-2 text-sm uppercase tracking-widest transition-colors group">
                            Ver todo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Charizard ex", set: "151", price: "$850", img: "https://images.pokemontcg.io/sv3pt5/6_hires.png", color: "hover:border-red-500/30" },
                            { name: "Umbreon VMAX", set: "Evolving Skies", price: "$6,400", img: "https://images.pokemontcg.io/swsh7/215_hires.png", color: "hover:border-purple-500/30" },
                            { name: "Pikachu VMAX", set: "Crown Zenith", price: "$5,000", img: "https://images.pokemontcg.io/swsh12pt5/160_hires.png", color: "hover:border-yellow-500/30" },
                            { name: "Mewtwo ex", set: "151", price: "$370", img: "https://images.pokemontcg.io/sv3pt5/150_hires.png", color: "hover:border-indigo-500/30" },
                            { name: "Mew ex", set: "151", price: "$360", img: "https://images.pokemontcg.io/sv3pt5/151_hires.png", color: "hover:border-pink-500/30" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                                className="group"
                            >
                                <div className={`rounded-2xl glass ${item.color} transition-all p-3 cursor-pointer`}>
                                    <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-black/50 mb-3">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.set}</span>
                                        <span className="text-primary font-mono font-black text-sm">{item.price}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ¿Qué producto es para ti? */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-20 h-20 mx-auto mb-4 opacity-80" />
                        <h2 className="text-3xl md:text-4xl font-black font-display mb-4">¿QUÉ PRODUCTO ES PARA TI?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">No sabes por dónde empezar? Te ayudamos a elegir el producto ideal.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                level: "Principiante",
                                badge: "🌱",
                                color: "border-green-500/20 hover:border-green-500/40",
                                textColor: "text-green-400",
                                rec: "Mazo de Batalla",
                                why: "Listo para jugar desde la caja. Incluye todo lo necesario para tu primera partida.",
                                price: "Desde $199 MXN",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                            },
                            {
                                level: "Intermedio",
                                badge: "⚡",
                                color: "border-blue-500/20 hover:border-blue-500/40",
                                textColor: "text-blue-400",
                                rec: "Elite Trainer Box",
                                why: "9 sobres + accesorios premium. Perfecto para expandir tu colección con estilo.",
                                price: "Desde $899 MXN",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                            },
                            {
                                level: "Coleccionista",
                                badge: "👑",
                                color: "border-yellow-500/20 hover:border-yellow-500/40",
                                textColor: "text-yellow-400",
                                rec: "Booster Box",
                                why: "36 sobres sellados. Máxima probabilidad de cartas ultra raras y secret rares.",
                                price: "Desde $1,999 MXN",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
                            },
                        ].map((item, i) => (
                            <div key={i} className={`p-8 rounded-[32px] glass ${item.color} transition-all relative overflow-hidden group`}>
                                <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src={item.pokemon} alt="" className="w-28 h-28" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-3xl mb-3 block">{item.badge}</span>
                                    <p className={`text-xs font-black uppercase tracking-widest ${item.textColor} mb-2`}>{item.level}</p>
                                    <h3 className="text-xl font-black font-display mb-3">{item.rec}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.why}</p>
                                    <p className={`font-black text-lg ${item.textColor}`}>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative rounded-[32px] glass overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10" />
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="" className="w-52 h-52" />
                        </div>
                        <div className="relative z-10 p-12 md:p-16">
                            <h2 className="text-3xl md:text-4xl font-black font-display mb-4">¿NO ENCUENTRAS LO QUE BUSCAS?</h2>
                            <p className="text-gray-400 max-w-lg mb-8">Explora nuestro catálogo completo con miles de cartas, precios en tiempo real y filtros avanzados por tipo, rareza y set.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/marketplace" className="px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all flex items-center justify-center gap-3 group">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" className="w-5 h-5" />
                                    Ir al Marketplace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/learn" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    Aprende a Jugar
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
