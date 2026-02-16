import { prisma } from "@/lib/prisma";
import AuctionDetail from "@/components/auctions/AuctionDetail";
import { notFound } from "next/navigation";

export default async function AuctionDetailPage({ params }: { params: { id: string } }) {
    const listing = await prisma.listing.findUnique({
        where: { id: params.id },
        include: {
            card: true,
            bids: {
                orderBy: { amount: 'desc' },
                take: 50,
                include: {
                    user: {
                        select: {
                            name: true,
                            username: true,
                            image: true
                        }
                    }
                }
            }
        }
    });

    if (!listing) {
        notFound();
    }

    // Calculate current price (highest bid or starting price)
    const currentPrice = listing.bids[0]?.amount ? Number(listing.bids[0].amount) : Number(listing.price);

    // Parse images if stored as JSON string, otherwise array
    const images = listing.images ? JSON.parse(listing.images) : [];
    const cardImage = images[0] || listing.card.imageUrl || "";

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <AuctionDetail
                listingId={listing.id}
                initialPrice={currentPrice}
                initialBids={listing.bids.map(bid => ({
                    ...bid,
                    amount: Number(bid.amount),
                    placedAt: bid.placedAt.toISOString(),
                    user: bid.user
                })) as any[]}
                endsAt={listing.endsAt!.toISOString()}
                card={{
                    name: listing.card.name,
                    imageUrl: cardImage || "",
                    set: listing.card.set,
                    // Ensure string type for strict mode
                    rarity: listing.card.rarity || "Unknown",
                    condition: listing.condition
                }}
            />
        </main>
    );
}
