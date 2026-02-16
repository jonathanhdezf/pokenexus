import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DollarSign, Clock, Users, Tag, Layers, ShoppingBag, TrendingUp, Sparkles, BarChart3, Plus, ExternalLink } from "lucide-react";
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

    const totalSales = soldListings.reduce((acc, l) => acc + Number(l.price), 0);

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-legendary/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                            <img
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png"
                                alt=""
                                className="w-4 h-4"
                            />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-400">Gestión de Ventas</span>
                        </div>
                        <h1 className="text-5xl font-black font-display tracking-tight mb-3">
                            MI <span className="text-holographic animate-shimmer">TIENDA</span>
                        </h1>
                        <p className="text-gray-500 text-sm max-w-lg">Gestiona tus listados activos y rastrea el rendimiento de tus ventas.</p>

                        <nav className="flex gap-1 mt-4 bg-surface/50 backdrop-blur-sm rounded-2xl p-1 border border-white/5 w-fit">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                                <Layers className="w-4 h-4" />
                                Colección
                            </Link>
                            <Link
                                href="/dashboard/listings"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-black bg-primary/10 text-primary border border-primary/20 rounded-xl transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Mi Tienda
                            </Link>
                        </nav>
                    </div>

                    <Link
                        href="/sell"
                        className="flex items-center gap-3 px-6 py-3.5 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20"
                    >
                        <Tag className="w-4 h-4" />
                        Listar Carta
                    </Link>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-gradient-to-br from-purple-500/10 to-surface/60 backdrop-blur-xl border border-purple-500/10 p-6 rounded-[24px] group hover:border-purple-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <DollarSign className="text-purple-400 w-5 h-5" />
                            </div>
                            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Ventas Totales</div>
                        </div>
                        <p className="text-3xl font-mono font-black text-white">${totalSales.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-primary/10 to-surface/60 backdrop-blur-xl border border-primary/10 p-6 rounded-[24px] group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <BarChart3 className="text-primary w-5 h-5" />
                            </div>
                            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Cartas Vendidas</div>
                        </div>
                        <p className="text-3xl font-mono font-black text-white">{soldListings.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-surface/60 backdrop-blur-xl border border-green-500/10 p-6 rounded-[24px] group hover:border-green-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <TrendingUp className="text-green-500 w-5 h-5" />
                            </div>
                            <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">ROI Promedio</div>
                        </div>
                        <p className="text-3xl font-mono font-black text-white">+0%</p>
                    </div>
                </div>

                {/* Active Listings */}
                <section className="mb-12">
                    <h2 className="text-lg font-black uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        Listados Activos ({activeListings.length})
                    </h2>

                    {activeListings.length === 0 ? (
                        <div className="relative overflow-hidden rounded-[28px] border border-dashed border-white/10 bg-surface/30 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 text-center py-20 px-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-5">
                                    <ShoppingBag className="w-7 h-7 text-gray-600" />
                                </div>
                                <p className="text-gray-500 mb-6">No tienes listados activos en este momento.</p>
                                <Link
                                    href="/sell"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-primary/20 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Crear Listado
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {activeListings.map((listing) => {
                                const highestBid = listing.bids[0];
                                const currentPrice = highestBid ? Number(highestBid.amount) : Number(listing.price);

                                return (
                                    <div
                                        key={listing.id}
                                        className="bg-surface/60 backdrop-blur-sm border border-white/10 rounded-[24px] overflow-hidden group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
                                    >
                                        <div className="p-5 flex gap-4">
                                            <div className="w-24 h-32 bg-black/40 rounded-2xl border border-white/5 overflow-hidden shrink-0">
                                                <img
                                                    src={listing.card.imageUrl || ""}
                                                    alt={listing.card.name}
                                                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <span className="inline-block px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[9px] font-black text-primary uppercase mb-2">
                                                    {listing.type}
                                                </span>
                                                <h3 className="font-bold text-white mb-3 line-clamp-1">{listing.card.name}</h3>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-gray-500">
                                                            {listing.type === "AUCTION" ? "Puja Actual" : "Precio"}
                                                        </span>
                                                        <span className="text-white font-mono font-bold">${currentPrice.toLocaleString()}</span>
                                                    </div>
                                                    {listing.type === "AUCTION" && (
                                                        <div className="flex justify-between text-xs">
                                                            <span className="text-gray-500 flex items-center gap-1">
                                                                <Users className="w-3 h-3" /> Pujas
                                                            </span>
                                                            <span className="text-white font-bold">{listing.bids.length}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-5 py-3.5 bg-black/20 border-t border-white/5 flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold">
                                                <Clock className="w-3 h-3" />
                                                {listing.endsAt ? `Termina ${new Date(listing.endsAt).toLocaleDateString()}` : "Permanente"}
                                            </div>
                                            <Link
                                                href={listing.type === "AUCTION" ? `/auctions/${listing.id}` : `/marketplace/${listing.cardId}`}
                                                className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                                            >
                                                Ver en Vivo
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
