"use client";

import { X, ExternalLink, TrendingUp, Shield, Swords, Zap, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CardDetailModalProps {
    card: any;
    onClose: () => void;
}

const typeColors: Record<string, string> = {
    Colorless: "bg-gray-400",
    Darkness: "bg-gray-700",
    Dragon: "bg-yellow-600",
    Fairy: "bg-pink-400",
    Fighting: "bg-orange-700",
    Fire: "bg-red-500",
    Grass: "bg-green-500",
    Lightning: "bg-yellow-400",
    Metal: "bg-gray-500",
    Psychic: "bg-purple-500",
    Water: "bg-blue-500",
};

const rarityGlow: Record<string, string> = {
    common: "",
    rare: "shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    "ultra-rare": "shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    secret: "shadow-[0_0_50px_rgba(0,242,255,0.2)]",
};

const mapRarity = (rarity: string): "common" | "rare" | "ultra-rare" | "secret" => {
    const r = rarity?.toLowerCase() || "";
    if (r.includes("secret") || r.includes("rainbow") || r.includes("hyper")) return "secret";
    if (r.includes("vmax") || r.includes("vstar") || r.includes("ultra") || r.includes("v-") || r.includes("full art")) return "ultra-rare";
    if (r.includes("rare") || r.includes("holo")) return "rare";
    return "common";
};

const getMarketPrice = (card: any) => {
    if (!card) return null;
    try {
        const tcg = card.tcgplayer?.prices;
        const cm = card.cardmarket?.prices;
        if (tcg) {
            const val = tcg.holofoil?.market || tcg.normal?.market || tcg.unlimitedHolofoil?.market || tcg.reverseHolofoil?.market;
            if (val) return val;
        }
        if (cm) {
            const val = cm.averageSellPrice || cm.trendPrice || cm.lowPrice;
            if (val) return val;
        }
    } catch { }
    return null;
};

const getPriceRange = (card: any) => {
    if (!card) return null;
    try {
        const tcg = card.tcgplayer?.prices;
        if (tcg) {
            const source = tcg.holofoil || tcg.normal || tcg.unlimitedHolofoil || tcg.reverseHolofoil;
            if (source) {
                return { low: source.low, mid: source.mid, high: source.high, market: source.market };
            }
        }
    } catch { }
    return null;
};

export default function CardDetailModal({ card, onClose }: CardDetailModalProps) {
    const rarity = mapRarity(card.rarity || "");
    const price = getMarketPrice(card);
    const priceRange = getPriceRange(card);
    const types = card.types || [];
    const attacks = card.attacks || [];
    const weaknesses = card.weaknesses || [];
    const resistances = card.resistances || [];
    const retreatCost = card.retreatCost || [];
    const hp = card.hp || null;
    const artist = card.artist || null;
    const number = card.number || null;
    const setData = card.set || {};
    const supertype = card.supertype || "Pokémon";
    const subtypes = card.subtypes || [];
    const abilities = card.abilities || [];
    const rules = card.rules || [];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-surface/95 backdrop-blur-2xl border border-white/10 ${rarityGlow[rarity]}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left: Card Image */}
                        <div className="relative p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-black/50 to-transparent">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_70%)]" />
                            </div>

                            {/* Rarity Glow behind card */}
                            {rarity !== "common" && (
                                <div className={`absolute inset-0 ${rarity === "secret" ? "bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.08),transparent_60%)]" : rarity === "ultra-rare" ? "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_60%)]" : "bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_60%)]"}`} />
                            )}

                            <div className="relative group">
                                <img
                                    src={card.images?.large || card.images?.small || ""}
                                    alt={card.name}
                                    className="w-full max-w-[300px] rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Holographic overlay on hover */}
                                {(rarity === "secret" || rarity === "ultra-rare") && (
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 mix-blend-overlay pointer-events-none" />
                                )}
                            </div>
                        </div>

                        {/* Right: Card Info */}
                        <div className="p-8 md:p-10 space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    {types.map((type: string) => (
                                        <span
                                            key={type}
                                            className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md text-white ${typeColors[type] || "bg-gray-600"}`}
                                        >
                                            {type}
                                        </span>
                                    ))}
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/10 text-gray-300 border border-white/10">
                                        {card.rarity || "Unknown"}
                                    </span>
                                    {subtypes.map((st: string) => (
                                        <span key={st} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                                            {st}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-3xl font-black font-display tracking-tight mb-1">{card.name}</h2>

                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="font-bold">{setData.name || "Set Desconocido"}</span>
                                    {number && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                                            <span className="font-mono">#{number}</span>
                                        </>
                                    )}
                                    {hp && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-3 h-3 text-red-400" />
                                                {hp} HP
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Valor de Mercado</span>
                                </div>
                                <div className="flex items-end gap-3 mb-3">
                                    <span className="text-4xl font-mono font-black text-cyan-400">
                                        {price ? `$${price.toFixed(2)}` : "CONSULTAR"}
                                    </span>
                                    <span className="text-xs text-gray-600 mb-1">USD</span>
                                </div>
                                {priceRange && (
                                    <div className="grid grid-cols-3 gap-3">
                                        {priceRange.low && (
                                            <div className="text-center p-2 bg-white/5 rounded-xl">
                                                <p className="text-[10px] text-gray-600 font-bold uppercase">Mínimo</p>
                                                <p className="text-sm font-mono font-bold text-gray-300">${priceRange.low.toFixed(2)}</p>
                                            </div>
                                        )}
                                        {priceRange.mid && (
                                            <div className="text-center p-2 bg-white/5 rounded-xl">
                                                <p className="text-[10px] text-gray-600 font-bold uppercase">Medio</p>
                                                <p className="text-sm font-mono font-bold text-gray-300">${priceRange.mid.toFixed(2)}</p>
                                            </div>
                                        )}
                                        {priceRange.high && (
                                            <div className="text-center p-2 bg-white/5 rounded-xl">
                                                <p className="text-[10px] text-gray-600 font-bold uppercase">Máximo</p>
                                                <p className="text-sm font-mono font-bold text-gray-300">${priceRange.high.toFixed(2)}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Abilities */}
                            {abilities.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                        Habilidades
                                    </h3>
                                    <div className="space-y-2">
                                        {abilities.map((ab: any, i: number) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                        {ab.type}
                                                    </span>
                                                    <span className="font-bold text-sm text-white">{ab.name}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed">{ab.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Attacks */}
                            {attacks.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                        <Swords className="w-3.5 h-3.5 text-red-400" />
                                        Ataques
                                    </h3>
                                    <div className="space-y-2">
                                        {attacks.map((atk: any, i: number) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        {atk.cost && (
                                                            <div className="flex gap-0.5">
                                                                {atk.cost.map((c: string, j: number) => (
                                                                    <span key={j} className={`w-4 h-4 rounded-full inline-flex items-center justify-center text-[8px] text-white font-bold ${typeColors[c] || "bg-gray-600"}`}>
                                                                        {c[0]}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <span className="font-bold text-sm text-white">{atk.name}</span>
                                                    </div>
                                                    {atk.damage && (
                                                        <span className="text-lg font-mono font-black text-red-400">{atk.damage}</span>
                                                    )}
                                                </div>
                                                {atk.text && <p className="text-xs text-gray-500 leading-relaxed">{atk.text}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rules */}
                            {rules.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Reglas</h3>
                                    <div className="space-y-2">
                                        {rules.map((rule: string, i: number) => (
                                            <p key={i} className="text-xs text-gray-500 leading-relaxed bg-white/5 rounded-xl p-3 border border-white/5">
                                                {rule}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Combat Stats */}
                            {(weaknesses.length > 0 || resistances.length > 0 || retreatCost.length > 0) && (
                                <div className="grid grid-cols-3 gap-3">
                                    {weaknesses.length > 0 && (
                                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">Debilidad</p>
                                            {weaknesses.map((w: any, i: number) => (
                                                <span key={i} className="text-sm font-bold text-white">{w.type} {w.value}</span>
                                            ))}
                                        </div>
                                    )}
                                    {resistances.length > 0 && (
                                        <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-3 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-green-400 mb-1">Resistencia</p>
                                            {resistances.map((r: any, i: number) => (
                                                <span key={i} className="text-sm font-bold text-white">{r.type} {r.value}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">Retirada</p>
                                        <div className="flex gap-1 justify-center">
                                            {retreatCost.length > 0 ? retreatCost.map((_: string, i: number) => (
                                                <span key={i} className="w-4 h-4 rounded-full bg-gray-400 inline-block" />
                                            )) : <span className="text-sm font-bold text-white">0</span>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer Info */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                {artist && (
                                    <p className="text-xs text-gray-600">
                                        Ilustrador: <span className="text-gray-400 font-bold">{artist}</span>
                                    </p>
                                )}
                                <div className="flex gap-3">
                                    {card.tcgplayer?.url && (
                                        <a
                                            href={card.tcgplayer.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            TCGPlayer <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                    <Link
                                        href={`/marketplace/${card.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-xs font-bold text-primary hover:bg-primary/30 transition-all"
                                    >
                                        Ver en Mercado <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
