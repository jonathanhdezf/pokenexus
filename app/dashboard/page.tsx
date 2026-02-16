import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Coins, Plus, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    // Fetch full user data including wallet and collection
    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        include: {
            collection: {
                include: {
                    card: true
                }
            }
        }
    });

    if (!user) {
        return <div>User not found</div>;
    }

    const collectionValue = user.collection.reduce((acc, item) => {
        // For now, use a static value or fetch current price. 
        // Simplified: acquiredPrice is used as value.
        return acc + (Number(item.acquiredPrice) || 0);
    }, 0);

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold font-display mb-2">My Collection</h1>
                    <nav className="flex gap-4 mt-2">
                        <Link href="/dashboard" className="text-sm font-bold text-white border-b-2 border-primary pb-1">Collection</Link>
                        <Link href="/dashboard/listings" className="text-sm font-bold text-gray-400 hover:text-white transition-colors pb-1">My Shop</Link>
                    </nav>
                </div>

                <div className="flex gap-4">
                    <div className="bg-surface border border-white/10 p-4 rounded-xl flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Coins className="text-yellow-500 w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold">Wallet Balance</div>
                            <div className="text-xl font-mono font-bold text-white">${Number(user.walletBalance).toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="bg-surface border border-white/10 p-4 rounded-xl flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="text-green-500 w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold">Portfolio Value</div>
                            <div className="text-xl font-mono font-bold text-green-400">${collectionValue.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {user.collection.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-surface/30">
                    <p className="text-gray-400 mb-4">Your collection is empty.</p>
                    <a href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                        <Plus className="w-4 h-4" /> Start Collecting
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {user.collection.map((item) => (
                        <div key={item.id} className="group relative bg-surface border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                            <div className="aspect-[3/4] relative">
                                {item.card.imageUrl ? (
                                    <img src={item.card.imageUrl} alt={item.card.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <div>
                                        <p className="text-xs text-primary font-bold">{item.condition}</p>
                                        <p className="text-white font-bold">{item.card.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 border-t border-white/5 bg-black/50">
                                <div className="text-xs text-gray-500">Acquired</div>
                                <div className="font-mono text-sm">${Number(item.acquiredPrice).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
