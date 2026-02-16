"use client";

import { useState } from "react";
import { Search, Gavel, DollarSign, Camera, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SellPage() {
    const [step, setStep] = useState(1);
    const [listingType, setListingType] = useState<"FIXED" | "AUCTION">("FIXED");
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data for card search
    const mockSearchResults = [
        { id: "1", name: "Charizard VMAX", set: "Shining Fates", number: "SV107/SV122", imageUrl: "https://images.pokemontcg.io/swsh45sv/SV107_hires.png" },
        { id: "2", name: "Pikachu V", set: "Vivid Voltage", number: "170/185", imageUrl: "https://images.pokemontcg.io/swsh4/170_hires.png" },
    ];

    return (
        <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold font-display mb-2">Publica tu Carta</h1>
                <p className="text-gray-400">Convierte tu colección en liquidez en minutos.</p>
            </div>

            {/* Stepper */}
            <div className="flex gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${s <= step ? 'bg-primary' : 'bg-white/10'}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <section>
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                                1. Selecciona la Carta
                            </label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre de Pokémon o set..."
                                    className="w-full bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {searchQuery && (
                                <div className="mt-4 bg-surface border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {mockSearchResults.map((card) => (
                                        <button
                                            key={card.id}
                                            onClick={() => setStep(2)}
                                            className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left group"
                                        >
                                            <div className="w-12 h-16 bg-black rounded border border-white/10 overflow-hidden shrink-0">
                                                <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white group-hover:text-primary transition-colors">{card.name}</p>
                                                <p className="text-xs text-gray-500">{card.set} • {card.number}</p>
                                            </div>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Mercado: $120.00</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-4">
                            <Info className="text-blue-400 shrink-0" />
                            <p className="text-sm text-blue-200/70 leading-relaxed">
                                ¿No puedes encontrar tu carta? Por favor asegúrate de buscar usando el nombre oficial o el código del set.
                                Actualmente solo admitimos sets de TCG en inglés y japonés.
                            </p>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <section>
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                                2. Detalles de la Publicación
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={() => setListingType("FIXED")}
                                    className={`p-6 rounded-2xl border transition-all text-left ${listingType === "FIXED" ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' : 'bg-surface border-white/10 hover:border-white/20'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${listingType === "FIXED" ? 'bg-primary text-black' : 'bg-white/5 text-gray-400'}`}>
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg">Compra Inmediata</h3>
                                    <p className="text-sm text-gray-400">Vende al instante a un precio fijo.</p>
                                </button>

                                <button
                                    onClick={() => setListingType("AUCTION")}
                                    className={`p-6 rounded-2xl border transition-all text-left ${listingType === "AUCTION" ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5' : 'bg-surface border-white/10 hover:border-white/20'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${listingType === "AUCTION" ? 'bg-orange-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                                        <Gavel className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg">Subasta</h3>
                                    <p className="text-sm text-gray-400">Deja que el mercado decida el valor.</p>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Estado de la Carta</label>
                                    <select className="w-full bg-surface border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 text-white appearance-none">
                                        <option>Near Mint (NM)</option>
                                        <option>Lightly Played (LP)</option>
                                        <option>Moderately Played (MP)</option>
                                        <option>Heavily Played (HP)</option>
                                        <option>Damaged (Dañada)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        {listingType === "FIXED" ? "Precio ($)" : "Puja Inicial ($)"}
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-primary/50 text-white font-mono"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Recomendado: $115.00 - $125.00 basado en ventas recientes.</p>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-bold px-6">Atrás</button>
                            <button
                                onClick={() => setStep(3)}
                                className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all"
                            >
                                Continuar
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <section>
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                                3. Fotos y Confirmación
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                <div className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                    <Camera className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Frente</span>
                                </div>
                                <div className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                    <Camera className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reverso</span>
                                </div>
                                <div className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                    <Camera className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Bordes</span>
                                </div>
                                <div className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                    <Plus className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Añadir Más</span>
                                </div>
                            </div>

                            <div className="bg-surface border border-white/10 rounded-2xl p-6">
                                <h3 className="font-bold mb-4">Resumen Final</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tipo de Listado</span>
                                        <span className="text-white font-medium">{listingType === "FIXED" ? "Compra Inmediata" : "Subasta"}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Tarifa de Plataforma (2%)</span>
                                        <span className="text-green-500 font-medium">Gratis por Beta</span>
                                    </div>
                                    <div className="h-px bg-white/5 my-2" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Ganancias Potenciales</span>
                                        <span className="text-primary font-mono">$120.00</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white font-bold px-6">Atrás</button>
                            <Link
                                href="/dashboard"
                                className="px-10 py-4 bg-primary text-black font-bold rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" /> Publicar Listado
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

const Plus = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
);
