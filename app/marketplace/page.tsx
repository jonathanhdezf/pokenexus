import { prisma } from "@/lib/prisma";
import InteractiveCard from "@/components/InteractiveCard";

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export default async function MarketplacePage() {
    const cards = await prisma.cardCatalog.findMany({
        include: {
            marketPrices: {
                orderBy: {
                    recordedAt: 'desc'
                },
                take: 1
            }
        }
    });

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h1 className="text-5xl font-bold mb-4 font-display">Marketplace</h1>
                    <p className="text-gray-400 max-w-xl">
                        Browse verified listings and real-time market data. All cards are authenticated via our rigorous digital verification process.
                    </p>
                </div>
                <div className="flex gap-4">
                    <select className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary">
                        <option>Sort by: Trending</option>
                        <option>Price: High to Low</option>
                        <option>Price: Low to High</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {cards.map((card) => {
                    // Calcular precio de display
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

            {cards.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No cards found in the catalogue. Run the seeder script to import data.
                </div>
            )}
        </main>
    );
}
