import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import PurchaseButton from "@/components/marketplace/PurchaseButton";

// @ts-ignore
const PriceChart = (await import("@/components/charts/PriceChart")).default;

export default async function CardDetailPage({ params }: { params: { id: string } }) {
    const card = await prisma.cardCatalog.findUnique({
        where: { id: params.id },
        include: {
            marketPrices: {
                orderBy: { recordedAt: 'asc' },
                take: 12
            }
        }
    });

    if (!card) {
        return notFound();
    }

    // Format data for chart
    const chartData = card.marketPrices.map((mp, index) => ({
        date: new Date(mp.recordedAt).toLocaleDateString(),
        price: Number(mp.price),
        condition: mp.condition
    }));

    // If no data, generate dummy for visualization
    if (chartData.length === 0) {
        chartData.push({ date: 'Jan', price: 100, condition: 'NM' });
        chartData.push({ date: 'Feb', price: 120, condition: 'NM' });
        chartData.push({ date: 'Mar', price: 150, condition: 'NM' });
    }

    const currentPrice = card.marketPrices.length > 0
        ? `$${Number(card.marketPrices[card.marketPrices.length - 1].price).toLocaleString()}`
        : "Price Unavailable";

    return (
        <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-20">
            <Link href="/marketplace" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Market
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
                                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                            )}
                            {/* Holographic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 poineter-events-none transition-opacity duration-300 mix-blend-overlay" />
                        </div>
                    </div>

                    <div className="bg-surface/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-green-500" /> Authenticity Guarantee
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Every card sold on PokéNexus undergoes a rigorous 8-point verification process by our expert graders.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> UV Light Test</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Weight Check</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Surface Analysis</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Edge Inspect</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Data & Actions */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                                {card.rarity || 'Common'}
                            </span>
                            <span className="text-gray-500 text-sm">#{card.cardNumber} / {card.set}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display text-white drop-shadow-lg">{card.name}</h1>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-mono text-cyan-400 font-bold">{currentPrice}</span>
                            <span className="text-green-400 text-sm flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> +12.5% (Last 30d)
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <PurchaseButton
                            cardId={card.id}
                            name={card.name}
                            price={currentPrice}
                            imageUrl={card.imageUrl || ""}
                            set={card.set}
                        />
                        <button className="flex items-center justify-center gap-2 bg-surface border border-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-surfaceHighlight transition-colors">
                            Make Offer
                        </button>
                    </div>

                    {/* Price Chart */}
                    <div className="mb-8">
                        <PriceChart data={chartData} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-surface/30 p-4 rounded-lg border border-white/5">
                            <div className="text-gray-500 text-xs uppercase mb-1">Total Population</div>
                            <div className="text-xl font-bold">1,240</div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-lg border border-white/5">
                            <div className="text-gray-500 text-xs uppercase mb-1">PSA 10 Pop</div>
                            <div className="text-xl font-bold text-primary">42</div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-lg border border-white/5">
                            <div className="text-gray-500 text-xs uppercase mb-1">Last Sold</div>
                            <div className="text-xl font-bold flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-500" /> 2h ago
                            </div>
                        </div>
                        <div className="bg-surface/30 p-4 rounded-lg border border-white/5">
                            <div className="text-gray-500 text-xs uppercase mb-1">Volume (24h)</div>
                            <div className="text-xl font-bold">$12k</div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
