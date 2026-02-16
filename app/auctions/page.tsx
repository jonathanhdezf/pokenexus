import { prisma } from "@/lib/prisma";
import AuctionCard from "@/components/auctions/AuctionCard";
import { Search } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const hotAuctions = [
    { name: "Charizard ex SAR", img: "https://images.pokemontcg.io/sv3pt5/6_hires.png", bid: "$12,400" },
    { name: "Umbreon VMAX Alt", img: "https://images.pokemontcg.io/swsh7/215_hires.png", bid: "$64,000" },
    { name: "Pikachu VMAX RR", img: "https://images.pokemontcg.io/swsh12pt5/160_hires.png", bid: "$8,200" },
];

export default async function AuctionsPage() {
    const auctions = await prisma.listing.findMany({
        where: {
            type: "AUCTION",
            status: "ACTIVE",
            endsAt: { gt: new Date() }
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
        orderBy: { endsAt: 'asc' }
    });

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-red-500/8 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-orange-500/8 blur-[120px] rounded-full" />

                {/* Floating auction cards */}
                <div className="absolute top-24 right-[8%] hidden lg:flex gap-4 opacity-15">
                    {hotAuctions.map((card, i) => (
                        <div key={i} className="relative" style={{ transform: `rotate(${(i - 1) * 10}deg) translateY(${i * 15}px)` }}>
                            <div className="w-24 h-32 rounded-xl overflow-hidden border border-white/10">
                                <img src={card.img} alt="" className="w-full h-full object-contain bg-black/50" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-red-500/90 text-[9px] font-black text-white">
                                {card.bid}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" alt="" className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">Subastas en Vivo</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
                        CASA DE <br />
                        <span className="text-holographic animate-shimmer">SUBASTAS</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10">
                        Puja por las cartas más codiciadas del TCG Pokémon. Subastas verificadas, transparentes y en tiempo real.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4">
                        {[
                            { label: "Subastas Activas", value: auctions.length.toString(), icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" },
                            { label: "Pujas Hoy", value: "2,847", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" },
                            { label: "Mayor Puja", value: "$64,000", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png" },
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

            {/* Search / Filters */}
            <section className="px-6 pb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 max-w-lg group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="🔍 Buscar subastas por nombre, set o rareza..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {["Terminan pronto", "Mayor puja", "Recientes"].map((filter) => (
                            <button key={filter} className="px-5 py-3 rounded-2xl glass hover:border-red-500/30 transition-all text-sm font-bold text-gray-400 hover:text-white whitespace-nowrap">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* How auctions work */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { step: "01", title: "Encuentra una carta", desc: "Explora subastas activas y encuentra la carta que deseas", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scope-lens.png" },
                            { step: "02", title: "Haz tu puja", desc: "Coloca una oferta mayor a la puja actual. Recibirás notificaciones", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" },
                            { step: "03", title: "¡Gana la carta!", desc: "Si tu puja es la más alta al terminar el tiempo, la carta es tuya", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" },
                        ].map((item) => (
                            <div key={item.step} className="flex items-center gap-4 p-5 rounded-2xl glass">
                                <img src={item.icon} alt="" className="w-8 h-8 shrink-0" />
                                <div>
                                    <span className="text-[10px] text-red-400 font-black uppercase tracking-widest">Paso {item.step}</span>
                                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Auction Grid */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    {auctions.length === 0 ? (
                        <div className="text-center py-32 rounded-[32px] glass relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5" />
                            <div className="absolute bottom-4 right-8 opacity-10">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" alt="" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" alt="" className="w-16 h-16 mx-auto mb-6 opacity-50" />
                                <h3 className="text-2xl font-black text-gray-300 mb-3 font-display">NO HAY SUBASTAS ACTIVAS</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Las subastas se publican regularmente. Vuelve pronto o publica tu propia carta.</p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/sell" className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-black text-sm uppercase tracking-widest hover:bg-red-500/20 transition-colors">
                                        Crear Subasta
                                    </Link>
                                    <Link href="/marketplace" className="px-6 py-3 rounded-xl bg-white/5 text-gray-400 font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
                                        Ir al Mercado
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {auctions.map((auction) => {
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
                </div>
            </section>

            {/* Subastar CTA */}
            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[32px] glass overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10" />
                        <div className="absolute -bottom-6 -right-6 opacity-10">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png" alt="" className="w-44 h-44" />
                        </div>
                        <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black font-display mb-2">¿TIENES UNA CARTA RARA?</h2>
                                <p className="text-gray-400 max-w-md text-sm">Deja que el mercado determine su valor real. Las subastas generan hasta 3x más que la venta directa.</p>
                            </div>
                            <Link href="/sell" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center gap-3 group shrink-0">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" alt="" className="w-5 h-5" />
                                Crear Subasta
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
