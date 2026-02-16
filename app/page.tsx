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
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
                    <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-legendary/10 blur-[120px] rounded-full animate-pulse-glow" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
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
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-[320px] md:w-[450px] aspect-[3/4] animate-float">
                            <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[40px] opacity-50" />
                            <div className="absolute inset-0 glass-premium rounded-[32px] p-4 flex flex-col justify-end overflow-hidden group cursor-pointer shadow-2xl">
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
                    </div>
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
        </main>
    );
}
