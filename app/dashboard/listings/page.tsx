import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Gavel, DollarSign, Clock, Users, Tag } from "lucide-react";
import Link from "next/link";

export default async function MyListingsPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        include: {
            listings: {
                include: {
                    card: true,
                    bids: {
                        orderBy: { amount: 'desc' },
                        include: {
                            user: { select: { username: true } }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!user) return <div>User not found</div>;

    const activeListings = user.listings.filter(l => l.status === "ACTIVE");
    const soldListings = user.listings.filter(l => l.status === "SOLD" || l.status === "COMPLETED");

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold font-display mb-2">My Shop</h1>
                    <p className="text-gray-400">Manage your active listings and track your sales performance.</p>
                </div>
                <Link
                    href="/sell"
                    className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <Tag className="w-4 h-4" /> List New Card
                </Link>
            </div>

            <div className="space-y-12">
                {/* Active Listings */}
                <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Active Listings ({activeListings.length})
                    </h2>

                    {activeListings.length === 0 ? (
                        <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center bg-white/5">
                            <p className="text-gray-500">You don't have any active listings right now.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeListings.map((listing) => {
                                const highestBid = listing.bids[0];
                                const currentPrice = highestBid ? Number(highestBid.amount) : Number(listing.price);

                                return (
                                    <div key={listing.id} className="bg-surface border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors">
                                        <div className="p-4 flex gap-4">
                                            <div className="w-24 h-32 bg-black rounded-lg border border-white/5 overflow-hidden shrink-0">
                                                <img
                                                    src={listing.card.imageUrl || ""}
                                                    alt={listing.card.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <div className="text-[10px] font-bold text-primary uppercase mb-1">{listing.type}</div>
                                                <h3 className="font-bold text-white mb-2 line-clamp-1">{listing.card.name}</h3>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">
                                                            {listing.type === "AUCTION" ? "Current Bid" : "Listed Price"}
                                                        </span>
                                                        <span className="text-white font-mono font-bold">${currentPrice.toLocaleString()}</span>
                                                    </div>
                                                    {listing.type === "AUCTION" && (
                                                        <div className="flex justify-between text-xs">
                                                            <span className="text-gray-500 flex items-center gap-1">
                                                                <Users className="w-3 h-3" /> Bids
                                                            </span>
                                                            <span className="text-white font-bold">{listing.bids.length}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {listing.endsAt ? `Ends ${new Date(listing.endsAt).toLocaleDateString()}` : "Permanent"}
                                            </div>
                                            <Link
                                                href={listing.type === "AUCTION" ? `/auctions/${listing.id}` : `/marketplace/${listing.cardId}`}
                                                className="text-[10px] font-bold text-primary hover:underline"
                                            >
                                                View Live
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Performance Stats Placeholder */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-900/40 to-black p-6 rounded-3xl border border-purple-500/20">
                        <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">Total Sales</h3>
                        <p className="text-4xl font-mono font-bold text-white">$0.00</p>
                    </div>
                    <div className="bg-gradient-to-br from-primary/20 to-black p-6 rounded-3xl border border-primary/20">
                        <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">Cards Sold</h3>
                        <p className="text-4xl font-mono font-bold text-white">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/40 to-black p-6 rounded-3xl border border-green-500/20">
                        <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-widest">Avg. ROI</h3>
                        <p className="text-4xl font-mono font-bold text-white">+0%</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
