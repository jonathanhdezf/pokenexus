import { prisma } from "@/lib/prisma";
import InteractiveCard from "@/components/InteractiveCard";
import MarketFilters from "@/components/marketplace/MarketFilters";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: {
        q?: string;
        sort?: string;
        category?: string;
    };
}

export default async function MarketplacePage({ searchParams }: Props) {
    const { q, sort, category } = searchParams;

    // Mapping category IDs to readable names
    const categoryNames: Record<string, string> = {
        singles: "Cartas sueltas",
        packs: "Sobres",
        boxes: "Caja de Sobres",
        sealed: "Productos Sellados",
        sets: "Sets",
        lots: "Lotes y colecciones",
        accessories: "Accesorios"
    };

    // Build the where clause for search
    const where: any = {};
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { set: { contains: q, mode: 'insensitive' } },
            { rarity: { contains: q, mode: 'insensitive' } },
        ];
    }

    // In a real app, we'd filter by category in the DB
    // for this demo, we'll just show the category name if present

    const cards = await prisma.cardCatalog.findMany({
        where,
        include: {
            marketPrices: {
                orderBy: {
                    recordedAt: 'desc'
                },
                take: 1
            }
        },
        orderBy: sort === 'newest' ? { createdAt: 'desc' } : undefined
    });

    // Manual sort for price since it's in a relation
    let sortedCards = [...cards];
    if (sort === 'price_asc') {
        sortedCards.sort((a, b) => Number(a.marketPrices[0]?.price || 0) - Number(b.marketPrices[0]?.price || 0));
    } else if (sort === 'price_desc') {
        sortedCards.sort((a, b) => Number(b.marketPrices[0]?.price || 0) - Number(a.marketPrices[0]?.price || 0));
    }

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/products" className="text-primary hover:underline text-sm font-bold">Productos</Link>
                    <span className="text-gray-600 text-sm">/</span>
                    <span className="text-gray-400 text-sm">{category ? categoryNames[category as string] : "Todos"}</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 font-display">
                    {category ? categoryNames[category as string] : "Mercado"}
                </h1>
                <p className="text-gray-400 max-w-xl">
                    {category
                        ? `Explora nuestra selección exclusiva de ${categoryNames[category as string].toLowerCase()} verificados.`
                        : "Explora listados verificados y datos de mercado en tiempo real. Todas las cartas son autenticadas mediante nuestro riguroso proceso de verificación digital."}
                </p>
            </div>

            <MarketFilters />

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
                <div className="text-center py-20 bg-surface/30 border border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-500 mb-2">No se encontraron cartas que coincidan con tus criterios.</p>
                    <p className="text-sm text-gray-600">Intenta buscar otra cosa o limpiar los filtros.</p>
                </div>
            )}
        </main>
    );
}
