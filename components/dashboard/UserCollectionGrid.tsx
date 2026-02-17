"use client";

import { useState } from "react";
import { Layers, Sparkles, Plus, Star } from "lucide-react";
import CollectionCardModal from "./CollectionCardModal";

interface Props {
    collection: any[];
}

export default function UserCollectionGrid({ collection }: Props) {
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (item: any) => {
        setSelectedCard(item);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {collection.length} Cartas Capturadas
                </h2>
                <a
                    href="/marketplace"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary/20 transition-all"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Añadir
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {collection.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="group relative bg-surface/60 backdrop-blur-sm border border-white/10 rounded-[20px] overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 duration-300 cursor-pointer"
                    >
                        <div className="aspect-[3/4] relative overflow-hidden">
                            {item.card.imageUrl ? (
                                <img
                                    src={item.card.imageUrl}
                                    alt={item.card.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                                    <Layers className="w-8 h-8" />
                                </div>
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-[9px] font-black text-primary uppercase mb-1.5">
                                        {item.condition}
                                    </span>
                                    <p className="text-white font-bold text-sm leading-tight">{item.card.name}</p>
                                    <p className="text-gray-400 text-[10px] mt-1">{item.card.set}</p>
                                    <button className="mt-3 w-full py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                            {/* Holo effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-holo-card mix-blend-overlay animate-holofoil bg-[length:200%_200%]" />
                            </div>
                        </div>
                        <div className="p-3 border-t border-white/5 bg-black/40">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Adquirido</div>
                                    <div className="font-mono text-sm font-bold text-white">${Number(item.acquiredPrice).toLocaleString()}</div>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Star className="w-3.5 h-3.5 text-gray-600 group-hover:text-yellow-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CollectionCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userCard={selectedCard}
            />
        </>
    );
}
