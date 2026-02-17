import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import PurchaseButton from "@/components/marketplace/PurchaseButton";

// @ts-ignore
const PriceChart = (await import("@/components/charts/PriceChart")).default;

const rarityMap: Record<string, string> = {
    "common": "Común",
    "uncommon": "Infrecuente",
    "rare": "Rara",
    "ultra-rare": "Ultra Rara",
    "secret": "Secreta",
    "promo": "Promo",
    "illustration rare": "Ilustración Rara",
    "special illustration rare": "Ilustración Especial Rara",
    "hyper rare": "Hiper Rara",
    "double rare": "Doble Rara",
};

export default async function CardDetailPage({ params }: { params: { id: string } }) {
    const listing = await prisma.listing.findUnique({
        where: { id: params.id },
        include: {
            card: {
                include: {
                    marketPrices: {
                        orderBy: { recordedAt: 'asc' },
                        take: 12
                    }
                }
            },
            user: {
                select: {
                    username: true,
                    name: true
                }
            }
        }
    });

    if (!listing || listing.status !== "ACTIVE") {
        return notFound();
    }

    const { card } = listing;

    // Format data for chart
    const chartData = card.marketPrices.map((mp, index) => ({
        date: new Date(mp.recordedAt).toLocaleDateString("es-MX", { day: 'numeric', month: 'short' }),
        price: Number(mp.price),
        condition: mp.condition
    }));

    // If no data, generate dummy for visualization
    if (chartData.length === 0) {
        chartData.push({ date: 'Ene', price: 100, condition: 'NM' });
        chartData.push({ date: 'Feb', price: 120, condition: 'NM' });
        chartData.push({ date: 'Mar', price: 150, condition: 'NM' });
    }

    const currentPrice = `$${Number(listing.price).toLocaleString()}`;
    const translatedRarity = rarityMap[card.rarity?.toLowerCase() || ""] || card.rarity || "Común";

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <Link href="/marketplace" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Volver al Mercado
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Image & Authenticator */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto group perspective-1000">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12 preserve-3d">
                            {card.imageUrl ? (
                                <img
                                    src={card.imageUrl}
                                    alt={card.name}
                                    className="w-full h-full object-contain p-4"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">Sin Imagen</div>
                            )}
                            {/* Holographic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 poineter-events-none transition-opacity duration-300 mix-blend-overlay" />
                        </div>
                    </div>

                    <div className="bg-surface/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-green-500" /> Garantía de Autenticidad
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            Cada carta vendida en PokéNexus pasa por un riguroso proceso de verificación de 8 puntos realizado por nuestros expertos.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 uppercase tracking-wider font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Prueba Luz UV</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Control de Peso</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Análisis Superficie</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Inspección Bordes</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Data & Actions */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                                {translatedRarity}
                            </span>
                            <span className="text-gray-500 text-sm font-mono">#{card.cardNumber} / {card.set}</span>
                            <span className="text-primary text-xs font-black uppercase tracking-widest">Vendedor: {listing.user.username || "Maestro Pokemon"}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 font-display text-white drop-shadow-lg leading-tight">{card.name}</h1>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-mono text-cyan-400 font-black tracking-tight">{currentPrice}</span>
                            <span className="text-green-400 text-sm flex items-center gap-1 font-bold">
                                <TrendingUp className="w-4 h-4" /> +12.5% (Últimos 30d)
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <PurchaseButton
                            listingId={listing.id}
                            cardId={card.id}
                            name={card.name}
                            price={currentPrice}
                            imageUrl={card.imageUrl || ""}
                            set={card.set}
                        />
                        <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
                            Hacer Oferta
                        </button>
                    </div>

                    {/* Price Chart */}
                    <div className="mb-8 p-6 bg-surface/30 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Historial de Precios</h3>
                        </div>
                        <div className="h-64 w-full">
                            <PriceChart data={chartData} />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-surface/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Población Total</div>
                            <div className="text-xl font-black">1,240</div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">PSA 10 Pop</div>
                            <div className="text-xl font-black text-primary">42</div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Última Venta</div>
                            <div className="text-xl font-black flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-500" /> 2h
                            </div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Volumen (24h)</div>
                            <div className="text-xl font-black text-green-400">$12k</div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
