import { prisma } from "@/lib/prisma";
import InteractiveCard from "@/components/InteractiveCard";
import MarketFilters from "@/components/marketplace/MarketFilters";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: {
        q?: string;
        sort?: string;
        category?: string;
    };
}

const categoryMeta: Record<string, { name: string; pokemon: string; item: string; color: string }> = {
    singles: { name: "Cartas Sueltas", pokemon: "6", item: "luxury-ball", color: "cyan" },
    packs: { name: "Sobres de Expansión", pokemon: "151", item: "ultra-ball", color: "purple" },
    boxes: { name: "Cajas de Sobres", pokemon: "384", item: "master-ball", color: "orange" },
    sealed: { name: "Productos Sellados", pokemon: "94", item: "premier-ball", color: "green" },
    decks: { name: "Mazos de Batalla", pokemon: "448", item: "choice-band", color: "red" },
    collections: { name: "Colecciones Especiales", pokemon: "149", item: "star-piece", color: "amber" },
    accessories: { name: "Accesorios", pokemon: "25", item: "poke-ball", color: "slate" },
};

const trendingCards = [
    { name: "Charizard ex", set: "151", img: "https://images.pokemontcg.io/sv3pt5/6_hires.png" },
    { name: "Umbreon VMAX", set: "Evolving Skies", img: "https://images.pokemontcg.io/swsh7/215_hires.png" },
    { name: "Pikachu VMAX", set: "Crown Zenith", img: "https://images.pokemontcg.io/swsh12pt5/160_hires.png" },
    { name: "Mewtwo ex", set: "151", img: "https://images.pokemontcg.io/sv3pt5/150_hires.png" },
    { name: "Mew ex", set: "151", img: "https://images.pokemontcg.io/sv3pt5/151_hires.png" },
    { name: "Rayquaza VMAX", set: "Evolving Skies", img: "https://images.pokemontcg.io/swsh7/218_hires.png" },
];

export default async function MarketplacePage({ searchParams }: Props) {
    const { q, sort, category } = searchParams;
    const catInfo = category ? categoryMeta[category] : null;

    const where: any = {};
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { set: { contains: q, mode: 'insensitive' } },
            { rarity: { contains: q, mode: 'insensitive' } },
        ];
    }

    const cards = await prisma.cardCatalog.findMany({
        where,
        include: {
            marketPrices: {
                orderBy: { recordedAt: 'desc' },
                take: 1
            }
        },
        orderBy: sort === 'newest' ? { createdAt: 'desc' } : undefined
    });

    let sortedCards = [...cards];
    if (sort === 'price_asc') {
        sortedCards.sort((a, b) => Number(a.marketPrices[0]?.price || 0) - Number(b.marketPrices[0]?.price || 0));
    } else if (sort === 'price_desc') {
        sortedCards.sort((a, b) => Number(b.marketPrices[0]?.price || 0) - Number(a.marketPrices[0]?.price || 0));
    }

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-primary/8 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-[10%] w-[35%] h-[50%] bg-purple-500/8 blur-[120px] rounded-full" />

                {/* Floating card previews */}
                <div className="absolute top-20 right-[5%] hidden lg:flex gap-3 opacity-20">
                    {trendingCards.slice(0, 3).map((card, i) => (
                        <div key={i} className="w-20 h-28 rounded-xl overflow-hidden border border-white/10" style={{ transform: `rotate(${(i - 1) * 8}deg) translateY(${i * 10}px)` }}>
                            <img src={card.img} alt="" className="w-full h-full object-contain bg-black/50" />
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/products" className="text-primary hover:underline text-sm font-bold flex items-center gap-2">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" className="w-4 h-4" />
                            Productos
                        </Link>
                        <span className="text-gray-600 text-sm">/</span>
                        <span className="text-gray-400 text-sm">{catInfo?.name || "Todos"}</span>
                    </div>

                    <div className="flex items-start gap-6">
                        {catInfo && (
                            <div className={`w-16 h-16 rounded-2xl bg-${catInfo.color}-500/10 flex items-center justify-center border border-${catInfo.color}-500/20 shrink-0`}>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${catInfo.item}.png`}
                                    alt=""
                                    className="w-10 h-10"
                                />
                            </div>
                        )}
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black font-display mb-4 leading-tight">
                                {catInfo?.name || (
                                    <>
                                        MERCADO <span className="text-holographic animate-shimmer">NEXUS</span>
                                    </>
                                )}
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                                {category
                                    ? `Explora nuestra selección exclusiva de ${catInfo?.name.toLowerCase()} verificados con precios en tiempo real.`
                                    : "Listados verificados, datos de mercado en tiempo real y la autenticación más rigurosa del ecosistema TCG."}
                            </p>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap gap-4 mt-10">
                        {[
                            { label: "Cartas Listadas", value: `${sortedCards.length}`, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png" },
                            { label: "Vendedores Activos", value: "324", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png" },
                            { label: "Ventas Hoy", value: "1,204", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl glass">
                                <img src={stat.icon} alt="" className="w-6 h-6" />
                                <div>
                                    <p className="text-white font-black text-lg">{stat.value}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Category Nav */}
            {!category && (
                <section className="px-6 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {Object.entries(categoryMeta).map(([key, cat]) => (
                                <Link
                                    key={key}
                                    href={`/marketplace?category=${key}`}
                                    className="flex items-center gap-2 px-5 py-3 rounded-2xl glass hover:border-primary/30 transition-all whitespace-nowrap group"
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${cat.item}.png`}
                                        alt=""
                                        className="w-5 h-5"
                                    />
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Filters */}
            <section className="px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <MarketFilters />
                </div>
            </section>

            {/* Cards Grid */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                        {sortedCards.map((card) => {
                            const price = card.marketPrices[0]?.price
                                ? `$${Number(card.marketPrices[0].price).toLocaleString()}`
                                : "N/A";

                            return (
                                <InteractiveCard
                                    key={card.id}
                                    id={card.id}
                                    name={card.name}
                                    set={card.set}
                                    price={price}
                                    imageUrl={card.imageUrl || ""}
                                    rarity={card.rarity?.toLowerCase().includes("secret") ? "secret" : card.rarity?.toLowerCase().includes("holo") ? "ultra-rare" : "common"}
                                />
                            );
                        })}
                    </div>

                    {sortedCards.length === 0 && (
                        <div className="text-center py-32 rounded-[32px] glass">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" alt="" className="w-24 h-24 mx-auto mb-6 opacity-30" />
                            <h3 className="text-xl font-black text-gray-400 mb-2">No se encontraron cartas</h3>
                            <p className="text-gray-500 text-sm mb-6">Intenta buscar otra cosa o limpia los filtros.</p>
                            <Link href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors">
                                Ver todo el mercado <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[32px] glass overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-orange-500/10" />
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="" className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black font-display mb-2">¿TIENES CARTAS PARA VENDER?</h2>
                                <p className="text-gray-400 max-w-md text-sm">Únete a miles de vendedores. Comisiones del 0% durante la beta.</p>
                            </div>
                            <Link href="/sell" className="px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all flex items-center gap-3 group shrink-0">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-5 h-5" />
                                Empezar a Vender <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
