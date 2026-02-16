import { ArrowRight } from "lucide-react";
import CardCatalog from "@/components/CardCatalog";
import { STATIC_CATALOG } from "@/lib/static-catalog";

// Forzar renderizado dinámico
export const dynamic = "force-dynamic";

// Intentamos traer datos frescos de la API, si falla usamos el catálogo estático
async function getInitialCards() {
    const headers = {
        "X-Api-Key": "7878696b-1667-4581-9f9b-648439d56285",
        Accept: "application/json",
    };

    try {
        // Una sola petición de 150 cartas (la API soporta hasta 250)
        const res = await fetch(
            "https://api.pokemontcg.io/v2/cards?q=supertype:pokemon&pageSize=150&page=1&orderBy=-set.releaseDate",
            { headers, cache: "no-store", signal: AbortSignal.timeout(8000) }
        );

        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        if (data.data && data.data.length > 0) return data.data;
        throw new Error("Empty response");
    } catch (e: any) {
        console.log("API unavailable, using static catalog:", e.message);
        return STATIC_CATALOG;
    }
}

export default async function Home() {
    const initialCards = await getInitialCards();

    return (
        <main className="flex flex-col min-h-screen bg-nexus">
            {/* Hero Section */}
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
                        <div className="relative w-[320px] md:w-[450px] aspect-[3/4] animate-float">
                            <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[40px] opacity-50" />
                            <div className="absolute inset-0 glass-premium rounded-[32px] p-4 flex flex-col justify-end overflow-hidden group cursor-pointer shadow-2xl border border-white/10">
                                <div className="absolute inset-0 bg-[url('https://images.pokemontcg.io/swsh12pt5/160_hires.png')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="relative z-10 flex justify-between items-end">
                                    <div>
                                        <h3 className="text-2xl font-black text-white">Pikachu VMAX</h3>
                                        <p className="text-primary font-bold text-xs uppercase tracking-widest">Crown Zenith</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Valor de Mercado</p>
                                        <p className="text-2xl font-black text-white">$250.00</p>
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
                    { icon: "📊", title: "Datos Reales", desc: "Sincronizado directamente con la API oficial de Pokémon TCG para precios y specs." },
                    { icon: "🔍", title: "Filtros Avanzados", desc: "Encuentra cualquier carta por set, rareza o tipo de ataque con precisión quirúrgica." },
                    { icon: "📈", title: "Tendencias Globales", desc: "Visualiza que cartas están subiendo de precio en tiempo real en los mercados internacionales." }
                ].map((feature, i) => (
                    <div key={i} className="p-10 rounded-[32px] glass hover:border-primary/30 transition-all group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors text-2xl">
                            {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-display group-hover:text-white transition-colors">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                    </div>
                ))}
            </section>

            {/* Card Catalog */}
            <CardCatalog initialCards={initialCards} />

            {/* ¿Tu primera vez en JCC Pokémon? */}
            <section className="w-full px-6 py-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-yellow-500/5 blur-[150px] rounded-full" />
                <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-red-500/5 blur-[120px] rounded-full" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokéball" className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Nuevos Entrenadores</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-display mb-6 leading-tight">
                            ¿TU PRIMERA VEZ EN <br />
                            <span className="text-holographic animate-shimmer">JCC POKÉMON</span>?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            ¿Quieres empezar a jugar al Juego de Cartas Coleccionables Pokémon? Explora un montón de recursos, incluyendo videos tutoriales, consejos de juego y mucho más.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Aprende a Jugar */}
                        <a href="/learn" className="group relative p-10 rounded-[32px] glass hover:border-blue-500/30 transition-all overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors overflow-hidden">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" alt="" className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Aprende a Jugar a JCC Pokémon</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">Domina las reglas del juego: cómo colocar Pokémon en el banco, usar Energías, evolucionar y atacar. Incluye tutoriales interactivos paso a paso con la app Pokémon TCG Live.</p>
                                <span className="inline-flex items-center gap-2 text-blue-400 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">Empezar ahora <ArrowRight className="w-4 h-4" /></span>
                            </div>
                        </a>

                        {/* Guía de Productos */}
                        <a href="/products" className="group relative p-10 rounded-[32px] glass hover:border-purple-500/30 transition-all overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors overflow-hidden">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="" className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Guía de Productos TCG</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">Conoce la diferencia entre Sobres de Expansión, Elite Trainer Boxes, Mazos de Batalla V y Colecciones Premium. Encuentra el producto ideal según tu nivel y presupuesto.</p>
                                <span className="inline-flex items-center gap-2 text-purple-400 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">Ver productos <ArrowRight className="w-4 h-4" /></span>
                            </div>
                        </a>

                        {/* Recursos para Padres */}
                        <a href="/learn#parents" className="group relative p-10 rounded-[32px] glass hover:border-yellow-500/30 transition-all overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png" alt="" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors overflow-hidden">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png" alt="" className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Recursos para Padres</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">El JCC Pokémon desarrolla lectura, matemáticas y pensamiento estratégico. Recomendado para mayores de 6 años. Descubre cómo acompañar a tus hijos en esta aventura.</p>
                                <span className="inline-flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">Explorar <ArrowRight className="w-4 h-4" /></span>
                            </div>
                        </a>

                        {/* Compra tu Primer Mazo */}
                        <a href="/products" className="group relative p-10 rounded-[32px] glass hover:border-green-500/30 transition-all overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png" alt="" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors overflow-hidden">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png" alt="" className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Compra tu Primer Mazo</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">Mazos de Batalla listos para jugar desde $199 MXN. Incluyen 60 cartas, moneda de daño y guía de reglas. Envíos seguros a todo México con rastreo incluido.</p>
                                <span className="inline-flex items-center gap-2 text-green-400 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">Ir a la tienda <ArrowRight className="w-4 h-4" /></span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
