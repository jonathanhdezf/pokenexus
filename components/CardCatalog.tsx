"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import CardDetailModal from "@/components/CardDetailModal";
import { motion, AnimatePresence } from "framer-motion";

const POKEMON_TYPES = [
    "Colorless", "Darkness", "Dragon", "Fairy", "Fighting",
    "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"
];

const getMarketPrice = (card: any) => {
    if (!card) return "N/A";
    try {
        const tcg = card.tcgplayer?.prices;
        const cm = card.cardmarket?.prices;
        if (tcg) {
            const val = tcg.holofoil?.market || tcg.normal?.market || tcg.unlimitedHolofoil?.market || tcg.reverseHolofoil?.market;
            if (val) return `$${val.toFixed(2)}`;
        }
        if (cm) {
            const val = cm.averageSellPrice || cm.trendPrice || cm.lowPrice;
            if (val) return `$${val.toFixed(2)}`;
        }
    } catch { }
    return "CONSULTAR";
};

const mapRarity = (rarity: string): "common" | "rare" | "ultra-rare" | "secret" => {
    const r = rarity?.toLowerCase() || "";
    if (r.includes("secret") || r.includes("rainbow") || r.includes("hyper")) return "secret";
    if (r.includes("vmax") || r.includes("vstar") || r.includes("ultra") || r.includes("v-") || r.includes("full art")) return "ultra-rare";
    if (r.includes("rare") || r.includes("holo")) return "rare";
    return "common";
};

interface CardCatalogProps {
    initialCards: any[];
}

export default function CardCatalog({ initialCards }: CardCatalogProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [executedSearchTerm, setExecutedSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [cards, setCards] = useState<any[]>(initialCards);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [apiError, setApiError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedCard, setSelectedCard] = useState<any | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [selectedCard]);

    const fetchCards = async (query = "", pageNum = 1, type = selectedType) => {
        setIsLoading(true);
        setApiError(null);
        if (query) setExecutedSearchTerm(query);
        else if (pageNum === 1 && !type) setExecutedSearchTerm("");

        // Filtrado local instantáneo (siempre funciona)
        if (pageNum === 1) {
            let filtered = initialCards;
            if (query.trim()) {
                const q = query.trim().toLowerCase();
                filtered = filtered.filter((c: any) => c.name?.toLowerCase().includes(q));
            }
            if (type) {
                filtered = filtered.filter((c: any) => c.types?.includes(type));
            }
            setCards(filtered);
            if (filtered.length === 0 && (query || type)) {
                setApiError("No se encontraron cartas con ese filtro.");
            }
        }

        // Intento de API como mejora (si funciona, reemplaza los resultados locales)
        try {
            const queryParts = [];
            if (query.trim()) queryParts.push(`name:"${query.trim()}*"`);
            if (type) queryParts.push(`types:"${type}"`);
            if (queryParts.length === 0) queryParts.push("supertype:pokemon");

            const q = queryParts.join(" ");
            const url = `/api/pokemon?q=${encodeURIComponent(q)}&pageSize=50&page=${pageNum}&orderBy=-set.releaseDate`;

            const controller = new AbortController();
            setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch(url, { signal: controller.signal }).catch(() => null);

            if (response && response.ok) {
                const data = await response.json();
                const results = data.data || [];
                if (results.length > 0) {
                    setApiError(null);
                    if (pageNum === 1) {
                        setCards(results);
                    } else {
                        setCards(prev => [...prev, ...results]);
                    }
                }
            }
        } catch {
            // API no disponible, mantenemos el filtrado local
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (type: string) => {
        const newType = selectedType === type ? "" : type;
        setSelectedType(newType);
        setPage(1);
        fetchCards(searchTerm, 1, newType);
    };

    const handleSearch = () => {
        setPage(1);
        fetchCards(searchTerm, 1);
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    const visibleCards = cards.slice(0, visibleCount);
    const hasMore = visibleCount < cards.length;

    return (
        <>
            {/* Catalog Section */}
            <section className="w-full px-6 py-32 border-t border-white/5 relative bg-black/20 overflow-hidden" id="catalog-section">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 font-display flex items-center gap-4 flex-wrap">
                                {executedSearchTerm
                                    ? `RESULTADOS PARA "${executedSearchTerm.toUpperCase()}"`
                                    : selectedType
                                        ? `CARTAS TIPO ${selectedType.toUpperCase()}`
                                        : "CATÁLOGO NEXUS"}
                                {cards.length > 0 && (
                                    <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                        {Math.min(visibleCount, cards.length)} / {cards.length} cartas
                                    </span>
                                )}
                            </h2>
                            <p className="text-gray-400 flex items-center gap-3">
                                {apiError ? (
                                    <>
                                        <span className="text-primary font-bold uppercase tracking-widest text-[10px] bg-primary/10 px-2 py-1 rounded border border-primary/20">{apiError}</span>
                                        <button
                                            onClick={() => fetchCards(searchTerm, 1)}
                                            className="text-[10px] text-white hover:text-primary transition-colors underline font-black"
                                        >
                                            REINTENTAR
                                        </button>
                                    </>
                                ) : "Datos verificados en tiempo real por el Nexus."}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                            <Link href="/marketplace" className="px-6 py-2 rounded-full border border-white/10 text-sm font-bold text-gray-400 hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2 group">
                                Ver Catálogo Completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group max-w-lg mb-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-legendary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="🔍 Busca Charizard, Mewtwo, Umbreon..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-all font-medium pr-24"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 px-5 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-black uppercase tracking-wider"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Type Filter Bar */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {POKEMON_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleFilterChange(type)}
                                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${selectedType === type
                                    ? "bg-primary text-nexus border-primary shadow-[0_0_20px_rgba(0,184,212,0.4)]"
                                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {visibleCards.length > 0 && visibleCards.map((card, i) => (
                                <motion.div
                                    key={card.id || i}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.5) }}
                                >
                                    <InteractiveCard
                                        id={card.id}
                                        name={card.name || "Unknown"}
                                        set={card.set?.name || "Unknown Set"}
                                        price={getMarketPrice(card)}
                                        imageUrl={card.images?.large || card.images?.small || ""}
                                        rarity={mapRarity(card.rarity)}
                                        onClick={() => setSelectedCard(card)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {!isLoading && (!cards || cards.length === 0) && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                                <Search className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-xl font-display uppercase tracking-widest">No se encontraron cartas</p>
                            </div>
                        )}
                    </div>

                    {hasMore && (
                        <div className="mt-20 flex flex-col items-center gap-4">
                            <p className="text-gray-500 text-sm">Mostrando {Math.min(visibleCount, cards.length)} de {cards.length} cartas</p>
                            <button
                                onClick={loadMore}
                                className="px-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] hover:bg-primary/20 hover:border-primary/50 transition-all group flex items-center gap-4"
                            >
                                Cargar más cartas <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Card Detail Modal */}
            {selectedCard && (
                <CardDetailModal
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </>
    );
}
