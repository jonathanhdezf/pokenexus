import { ArrowRight } from "lucide-react";
import CardCatalog from "@/components/CardCatalog";
import { STATIC_CATALOG } from "@/lib/static-catalog";
import HeroSection from "@/components/HeroSection";

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
            <HeroSection />

            {/* Features Grid */}
            <section className="w-full max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    { icon: "📊", title: "Datos Reales", desc: "Sincronizado con la API oficial de Pokémon Trading Card Game (TCG) para precios y especificaciones técnicas." },
                    { icon: "🔍", title: "Filtros Avanzados", desc: "Encuentra cualquier carta por expansión, rareza o tipo de ataque con precisión de mercado." },
                    { icon: "📈", title: "Tendencias Globales", desc: "Visualiza qué cartas están subiendo de valor en tiempo real en los mercados internacionales." }
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
                            <span className="text-holographic animate-shimmer italic">JUEGO DE CARTAS COLECCIONABLES</span>?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            ¿Quieres empezar a jugar al <span className="text-white">Juego de Cartas Coleccionables (JCC) Pokémon</span>? Explora recursos, videos tutoriales y consejos para expertos.
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
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Aprende a Jugar JCC Pokémon</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">Domina las reglas del Juego de Cartas Coleccionables: cómo colocar Pokémon en el banco, usar Energías, evolucionar y atacar de forma estratégica.</p>
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
                                <h3 className="text-2xl font-black font-display mb-3 group-hover:text-white transition-colors">Guía de Productos Coleccionables</h3>
                                <p className="text-gray-400 leading-relaxed text-sm mb-6">Conoce la diferencia entre Sobres de Expansión (Boosters), Elite Trainer Boxes (ETB), Mazos de Batalla y Colecciones Premium Especiales.</p>
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
