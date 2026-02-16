import { prisma } from "@/lib/prisma";
import AuctionCard from "@/components/auctions/AuctionCard";
import { Gavel, Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AuctionsPage() {
    const auctions = await prisma.listing.findMany({
        where: {
            type: "AUCTION",
            status: "ACTIVE",
            endsAt: {
                gt: new Date() // Only future auctions
            }
        },
        include: {
            card: true,
            bids: {
                orderBy: { amount: 'desc' },
                take: 1,
                include: {
                    user: { select: { username: true } }
                }
            }
        },
        orderBy: {
            endsAt: 'asc' // Ending soonest first
        }
    });

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs">En Vivo</span>
                    </div>
                    <h1 className="text-5xl font-bold font-display mb-4">Casa de Subastas</h1>
                    <p className="text-gray-400 max-w-xl">
                        Puja por cartas raras en tiempo real. Asegura coleccionables exclusivos antes de que se acabe el tiempo.
                    </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar subastas..."
                            className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-bold text-sm">
                        Filtros
                    </button>
                </div>
            </div>

            {auctions.length === 0 ? (
                <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl bg-surface/30">
                    <Gavel className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">No hay Subastas Activas</h3>
                    <p className="text-gray-500">Vuelve más tarde para ver nuevos listados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {auctions.map((auction) => {
                        // Determine current price (highest bid or starting price)
                        const highestBid = auction.bids[0];
                        const currentPrice = highestBid?.amount ? Number(highestBid.amount) : Number(auction.price);
                        const topBidder = highestBid?.user?.username;

                        const images = auction.images ? JSON.parse(auction.images) : [];

                        return (
                            <AuctionCard
                                key={auction.id}
                                id={auction.id}
                                cardName={auction.card.name}
                                cardImage={images[0] || auction.card.imageUrl || ""}
                                currentBid={currentPrice}
                                endsAt={auction.endsAt!.toISOString()}
                                topBidderName={topBidder}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
}
