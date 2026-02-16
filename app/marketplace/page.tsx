import { prisma } from "@/lib/prisma";
import InteractiveCard from "@/components/InteractiveCard";
import MarketFilters from "@/components/marketplace/MarketFilters";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: {
        q?: string;
        sort?: string;
    };
}

export default async function MarketplacePage({ searchParams }: Props) {
    const { q, sort } = searchParams;

    // Build the where clause for search
    const where: any = {};
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { set: { contains: q, mode: 'insensitive' } },
            { rarity: { contains: q, mode: 'insensitive' } },
        ];
    }

    // Build the orderBy clause
    let orderBy: any = { createdAt: 'desc' }; // Default
    if (sort === 'price_desc') orderBy = { marketPrices: { _count: 'desc' } }; // This is tricky with Prisma relations
    // Simplified for now: just basic sorting if direct fields exist. 
    // For price sorting we'd ideally have a currentPrice field or a more complex query.

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
                <h1 className="text-5xl font-bold mb-4 font-display">Mercado</h1>
                <p className="text-gray-400 max-w-xl">
                    Explora listados verificados y datos de mercado en tiempo real. Todas las cartas son autenticadas mediante nuestro riguroso proceso de verificación digital.
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
