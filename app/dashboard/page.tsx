import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Coins, Plus, TrendingUp, Layers, ShoppingBag, Trophy, Sparkles, Star, BarChart3 } from "lucide-react";
import UserCollectionGrid from "@/components/dashboard/UserCollectionGrid";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

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
        return acc + (Number(item.acquiredPrice) || 0);
    }, 0);

    const uniqueSets = new Set(user.collection.map(item => item.card.set)).size;

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-legendary/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                            <img
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                alt=""
                                className="w-4 h-4"
                            />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Bóveda del Entrenador</span>
                        </div>
                        <h1 className="text-5xl font-black font-display tracking-tight mb-3">
                            MI <span className="text-holographic animate-shimmer">COLECCIÓN</span>
                        </h1>
                        <nav className="flex gap-1 mt-3 bg-surface/50 backdrop-blur-sm rounded-2xl p-1 border border-white/5 w-fit">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-black bg-primary/10 text-primary border border-primary/20 rounded-xl transition-all"
                            >
                                <Layers className="w-4 h-4" />
                                Colección
                            </Link>
                            <Link
                                href="/dashboard/listings"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Mi Tienda
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                                <Coins className="text-yellow-500 w-5 h-5" />
                            </div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Saldo</div>
                        </div>
                        <div className="text-2xl font-mono font-black text-white">${Number(user.walletBalance).toLocaleString()}</div>
                    </div>

                    <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] group hover:border-green-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                <TrendingUp className="text-green-500 w-5 h-5" />
                            </div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Valor Total</div>
                        </div>
                        <div className="text-2xl font-mono font-black text-green-400">${collectionValue.toLocaleString()}</div>
                    </div>

                    <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Layers className="text-primary w-5 h-5" />
                            </div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Cartas</div>
                        </div>
                        <div className="text-2xl font-mono font-black text-white">{user.collection.length}</div>
                    </div>

                    <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] group hover:border-purple-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                <BarChart3 className="text-purple-500 w-5 h-5" />
                            </div>
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sets</div>
                        </div>
                        <div className="text-2xl font-mono font-black text-white">{uniqueSets}</div>
                    </div>
                </div>

                {/* Collection Grid */}
                {user.collection.length === 0 ? (
                    <div className="relative overflow-hidden rounded-[32px] border border-dashed border-white/10 bg-surface/30 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-legendary/5 pointer-events-none" />
                        <div className="relative z-10 text-center py-24 px-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 mb-6">
                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                    alt=""
                                    className="w-10 h-10"
                                />
                            </div>
                            <h3 className="text-2xl font-black font-display mb-3 tracking-tight">
                                TU AVENTURA <span className="text-holographic animate-shimmer">COMIENZA AQUÍ</span>
                            </h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                                Tu bóveda está vacía. Explora el marketplace y captura tus primeras cartas para comenzar a construir tu colección legendaria.
                            </p>
                            <a
                                href="/marketplace"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20"
                            >
                                <Plus className="w-5 h-5" />
                                Explorar Marketplace
                            </a>
                        </div>
                        {/* Decorative Pokémon */}
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                            alt=""
                            className="absolute bottom-4 right-8 w-32 h-32 opacity-[0.06]"
                        />
                    </div>
                ) : (
                    <UserCollectionGrid collection={user.collection} />
                )}
            </div>
        </main>
    );
}
