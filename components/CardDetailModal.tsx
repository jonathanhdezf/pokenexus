"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, TrendingUp, Shield, Swords, Zap, Heart, ArrowRight, Ruler, Weight, Hash, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CardDetailModalProps {
    card: any;
    onClose: () => void;
}

interface PokedexData {
    pokedexNumber: number;
    description: string;
    category: string;
    height: number; // decimeters
    weight: number; // hectograms
    generation: string;
    baseStats: { name: string; value: number }[];
    sprite: string;
    funFact: string;
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

const statLabels: Record<string, string> = {
    hp: "PS",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "At. Esp.",
    "special-defense": "Def. Esp.",
    speed: "Velocidad",
};

const statColors: Record<string, string> = {
    hp: "bg-red-500",
    attack: "bg-orange-500",
    defense: "bg-yellow-500",
    "special-attack": "bg-blue-500",
    "special-defense": "bg-green-500",
    speed: "bg-pink-500",
};

const generationNames: Record<string, string> = {
    "generation-i": "Gen I · Kanto",
    "generation-ii": "Gen II · Johto",
    "generation-iii": "Gen III · Hoenn",
    "generation-iv": "Gen IV · Sinnoh",
    "generation-v": "Gen V · Unova",
    "generation-vi": "Gen VI · Kalos",
    "generation-vii": "Gen VII · Alola",
    "generation-viii": "Gen VIII · Galar",
    "generation-ix": "Gen IX · Paldea",
};

const rarityGlow: Record<string, string> = {
    common: "",
    rare: "shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    "ultra-rare": "shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    secret: "shadow-[0_0_50px_rgba(0,242,255,0.2)]",
};

// Map TCG type to CSS element class
const typeToElementalClass: Record<string, string> = {
    Fire: "elemental-fire",
    Water: "elemental-water",
    Lightning: "elemental-lightning",
    Grass: "elemental-grass",
    Psychic: "elemental-psychic",
    Darkness: "elemental-darkness",
    Dragon: "elemental-dragon",
    Fighting: "elemental-fighting",
    Metal: "elemental-metal",
    Fairy: "elemental-fairy",
    Colorless: "elemental-colorless",
};

/** Generates the animated particle elements for a given type */
function ElementalParticles({ type }: { type: string }) {
    switch (type) {
        case "Fire":
            return (
                <>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="fire-particle" />
                    ))}
                </>
            );
        case "Lightning":
            return (
                <>
                    {[0, 1, 2, 3].map((i) => (
                        <svg key={i} className="lightning-bolt" width="16" height="24" viewBox="0 0 16 24" fill="none">
                            <path d="M10 0L0 14h6L4 24l12-16H10L14 0h-4z" fill="#ffd700" />
                        </svg>
                    ))}
                </>
            );
        case "Water":
            return (
                <>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="water-bubble" />
                    ))}
                </>
            );
        case "Grass":
            return (
                <>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="grass-leaf">🍃</div>
                    ))}
                </>
            );
        case "Psychic":
            return (
                <>
                    <div className="psychic-ring" />
                    <div className="psychic-ring" />
                    <div className="psychic-ring" />
                    <div className="psychic-orb" />
                    <div className="psychic-orb" />
                    <div className="psychic-orb" />
                </>
            );
        case "Darkness":
            return (
                <>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="dark-wisp" />
                    ))}
                </>
            );
        case "Dragon":
            return (
                <>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="dragon-energy" />
                    ))}
                </>
            );
        case "Fighting":
            return (
                <>
                    {[0, 1, 2, 3].map((i) => (
                        <svg key={i} className="fight-impact" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="#ea580c" opacity="0.8" />
                        </svg>
                    ))}
                </>
            );
        case "Fairy":
            return (
                <>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="fairy-sparkle" />
                    ))}
                </>
            );
        default:
            return null;
    }
}

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

/**
 * Extracts the base Pokémon name from a TCG card name
 * e.g. "Charizard ex" -> "charizard", "Pikachu VMAX" -> "pikachu"
 */
function extractPokemonName(cardName: string): string {
    return cardName
        .replace(/\s+(ex|EX|GX|gx|V|VMAX|VSTAR|V-UNION|BREAK|LV\.X|SP|FB|GL|δ|Delta Species|Prism Star|◇|☆)$/i, "")
        .replace(/\s+(ex|EX|GX|gx|V|VMAX|VSTAR)$/i, "") // double pass for compound
        .replace(/\./g, "") // Mr. Mime -> Mr Mime
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // multi-word like Mr Mime -> mr-mime
        .replace(/[^a-z0-9-]/g, "") // remove special chars
        .replace(/nidoran-f/i, "nidoran-f")
        .replace(/nidoran-m/i, "nidoran-m");
}

async function fetchPokedexData(cardName: string): Promise<PokedexData | null> {
    const pokeName = extractPokemonName(cardName);
    if (!pokeName) return null;

    try {
        // Fetch Pokémon base data and species data in parallel
        const [pokemonRes, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`, { signal: AbortSignal.timeout(5000) }).catch(() => null),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`, { signal: AbortSignal.timeout(5000) }).catch(() => null),
        ]);

        if (!pokemonRes?.ok || !speciesRes?.ok) return null;

        const [pokemon, species] = await Promise.all([
            pokemonRes.json(),
            speciesRes.json(),
        ]);

        // Get Spanish flavor text (Pokédex entry) - prefer latest games
        const flavorEntries = species.flavor_text_entries?.filter(
            (e: any) => e.language.name === "es"
        ) || [];
        const flavorText = flavorEntries.length > 0
            ? flavorEntries[flavorEntries.length - 1].flavor_text.replace(/\f|\n/g, " ").replace(/\s+/g, " ").trim()
            : null;

        // Get Spanish genus/category (e.g., "Pokémon Llama")
        const genusEntry = species.genera?.find((g: any) => g.language.name === "es");
        const category = genusEntry?.genus || "";

        // Get generation
        const generation = species.generation?.name || "";

        // Build base stats
        const baseStats = pokemon.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat,
        }));

        // Build fun fact from Spanish flavor text of a different game for variety
        let funFact = "";
        if (flavorEntries.length > 1) {
            const altEntry = flavorEntries[Math.max(0, flavorEntries.length - 2)];
            funFact = altEntry.flavor_text.replace(/\f|\n/g, " ").replace(/\s+/g, " ").trim();
            if (funFact === flavorText) funFact = ""; // Avoid duplicate
        }

        return {
            pokedexNumber: pokemon.id,
            description: flavorText || "Sin descripción disponible.",
            category,
            height: pokemon.height, // in decimeters
            weight: pokemon.weight, // in hectograms
            generation,
            baseStats,
            sprite: pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                pokemon.sprites?.front_default || "",
            funFact,
        };
    } catch {
        return null;
    }
}

export default function CardDetailModal({ card, onClose }: CardDetailModalProps) {
    const [pokedex, setPokedex] = useState<PokedexData | null>(null);
    const [loadingPokedex, setLoadingPokedex] = useState(true);

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
    const cardNumber = card.number || null;
    const setData = card.set || {};
    const subtypes = card.subtypes || [];
    const abilities = card.abilities || [];
    const rules = card.rules || [];

    useEffect(() => {
        setLoadingPokedex(true);
        fetchPokedexData(card.name).then((data) => {
            setPokedex(data);
            setLoadingPokedex(false);
        });
    }, [card.name]);

    const maxStat = 255; // Max possible base stat for scale

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
                        {/* Left: Card Image + Pokédex Info */}
                        <div className="relative p-8 md:p-12 flex flex-col items-center justify-start bg-gradient-to-br from-black/50 to-transparent">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_70%)]" />
                            </div>

                            {rarity !== "common" && (
                                <div className={`absolute inset-0 ${rarity === "secret" ? "bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.08),transparent_60%)]" : rarity === "ultra-rare" ? "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_60%)]" : "bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_60%)]"}`} />
                            )}

                            {/* Card with Elemental Effects */}
                            <div className={`relative group mb-6 elemental-border ${typeToElementalClass[types[0]] || ""}`}>
                                {/* Animated type particles */}
                                <ElementalParticles type={types[0] || ""} />

                                <img
                                    src={card.images?.large || card.images?.small || ""}
                                    alt={card.name}
                                    className="relative z-[2] w-full max-w-[280px] rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                {(rarity === "secret" || rarity === "ultra-rare") && (
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 mix-blend-overlay pointer-events-none z-[3]" />
                                )}
                            </div>

                            {/* Pokédex Quick Info under image */}
                            {pokedex && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative z-10 w-full max-w-[280px] space-y-3"
                                >
                                    {/* Pokedex Number + Category */}
                                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                            <Hash className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-mono font-black text-white">#{String(pokedex.pokedexNumber).padStart(3, "0")}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{pokedex.category}</p>
                                        </div>
                                    </div>

                                    {/* Height & Weight */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                            <Ruler className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                                            <p className="text-sm font-mono font-bold text-white">{(pokedex.height / 10).toFixed(1)} m</p>
                                            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Altura</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                                            <Weight className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                                            <p className="text-sm font-mono font-bold text-white">{(pokedex.weight / 10).toFixed(1)} kg</p>
                                            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Peso</p>
                                        </div>
                                    </div>

                                    {/* Generation */}
                                    {pokedex.generation && (
                                        <div className="text-center py-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-legendary/10 text-legendary border border-legendary/20">
                                                {generationNames[pokedex.generation] || pokedex.generation}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {loadingPokedex && (
                                <div className="relative z-10 flex items-center gap-2 text-gray-600 text-xs mt-4">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Cargando datos de Pokédex...
                                </div>
                            )}
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

                                <h2 className="text-3xl font-black font-display tracking-tight mb-1">
                                    {card.name}
                                    {pokedex && (
                                        <span className="text-lg text-gray-600 font-mono ml-2">#{String(pokedex.pokedexNumber).padStart(3, "0")}</span>
                                    )}
                                </h2>

                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="font-bold">{setData.name || "Set Desconocido"}</span>
                                    {cardNumber && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                                            <span className="font-mono">#{cardNumber}</span>
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

                            {/* Pokédex Description */}
                            {pokedex && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl border border-red-500/10 p-5"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <BookOpen className="w-4 h-4 text-red-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Entrada Pokédex</span>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed italic">
                                        &ldquo;{pokedex.description}&rdquo;
                                    </p>

                                    {pokedex.funFact && pokedex.funFact !== pokedex.description && (
                                        <div className="mt-4 pt-3 border-t border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400">Dato Interesante</span>
                                            </div>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                {pokedex.funFact}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Base Stats */}
                            {pokedex && pokedex.baseStats.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5 text-blue-400" />
                                        Estadísticas Base
                                    </h3>
                                    <div className="space-y-2">
                                        {pokedex.baseStats.map((stat) => (
                                            <div key={stat.name} className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-gray-500 w-16 text-right shrink-0">
                                                    {statLabels[stat.name] || stat.name}
                                                </span>
                                                <span className="text-xs font-mono font-bold text-white w-8 text-right shrink-0">
                                                    {stat.value}
                                                </span>
                                                <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(stat.value / maxStat) * 100}%` }}
                                                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                                        className={`h-full rounded-full ${statColors[stat.name] || "bg-primary"}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                                            <span className="text-[10px] font-bold text-gray-400 w-16 text-right shrink-0">Total</span>
                                            <span className="text-xs font-mono font-black text-primary w-8 text-right shrink-0">
                                                {pokedex.baseStats.reduce((sum, s) => sum + s.value, 0)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

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
                            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/5 gap-3">
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
