"use client";

import { useState } from "react";
import { Search, Gavel, DollarSign, Camera, Info, CheckCircle2, ArrowRight, Shield, Truck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SellPage() {
    const [step, setStep] = useState(0);
    const [listingType, setListingType] = useState<"FIXED" | "AUCTION">("FIXED");
    const [searchQuery, setSearchQuery] = useState("");

    const mockSearchResults = [
        { id: "1", name: "Charizard ex", set: "151", number: "6/165", imageUrl: "https://images.pokemontcg.io/sv3pt5/6_hires.png", price: "$850" },
        { id: "2", name: "Umbreon VMAX", set: "Evolving Skies", number: "215/203", imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png", price: "$6,400" },
        { id: "3", name: "Pikachu VMAX", set: "Crown Zenith", number: "160/159", imageUrl: "https://images.pokemontcg.io/swsh12pt5/160_hires.png", price: "$5,000" },
        { id: "4", name: "Mewtwo ex", set: "151", number: "150/165", imageUrl: "https://images.pokemontcg.io/sv3pt5/150_hires.png", price: "$370" },
    ];

    // Step 0 = landing, 1 = search card, 2 = details, 3 = photos/confirm
    if (step === 0) {
        return (
            <main className="min-h-screen bg-nexus pb-20">
                {/* Hero */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-green-500/8 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-primary/8 blur-[120px] rounded-full" />
                    <div className="absolute top-24 right-[8%] hidden lg:block opacity-15">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" alt="" className="w-44 h-44" />
                    </div>

                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">Vende tus Cartas</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
                            CONVIERTE TUS <br />
                            CARTAS EN <span className="text-holographic animate-shimmer">DINERO</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10">
                            Publica tu carta en minutos. Comisiones del 0% durante la beta. Envío seguro con rastreo incluido.
                        </p>

                        <button
                            onClick={() => setStep(1)}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500 text-nexus font-black uppercase tracking-widest text-sm hover:bg-green-400 transition-all group"
                        >
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-5 h-5" />
                            Publicar Ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </section>

                {/* How it works */}
                <section className="px-6 pb-16">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-black font-display mb-10 flex items-center gap-4">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png" alt="" className="w-8 h-8" />
                            CÓMO FUNCIONA
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: "01", title: "Busca tu Carta",
                                    desc: "Busca en nuestra base de datos de +12,000 cartas. Selecciona la tuya y obtén el precio de mercado automáticamente.",
                                    icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scope-lens.png",
                                    pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
                                },
                                {
                                    step: "02", title: "Foto y Precio",
                                    desc: "Sube fotos del frente, reverso y bordes. Elige venta directa o subasta. Nosotros sugerimos el precio basado en datos reales.",
                                    icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/camera.png",
                                    pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
                                },
                                {
                                    step: "03", title: "¡Vende y Cobra!",
                                    desc: "Cuando alguien compre tu carta, envíala con nuestra guía. El pago se libera tras la verificación de autenticidad.",
                                    icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png",
                                    pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png"
                                },
                            ].map((item, i) => (
                                <div key={i} className="group p-8 rounded-[32px] glass hover:border-green-500/30 transition-all relative overflow-hidden">
                                    <span className="absolute top-6 right-6 text-6xl font-black text-white/5 font-display">{item.step}</span>
                                    <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <img src={item.pokemon} alt="" className="w-24 h-24" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                                            <img src={item.icon} alt="" className="w-8 h-8" />
                                        </div>
                                        <div className="text-green-400 font-black text-sm uppercase tracking-widest mb-3">Paso {item.step}</div>
                                        <h3 className="text-xl font-black font-display mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="px-6 pb-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="p-12 rounded-[32px] glass relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png" alt="" className="w-48 h-48" />
                            </div>
                            <h2 className="text-2xl font-black font-display mb-8">¿POR QUÉ VENDER EN POKENEXUS?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                {[
                                    { icon: <DollarSign className="w-5 h-5" />, title: "0% Comisión en Beta", desc: "No cobramos comisión durante la beta. Tú te llevas el 100% de la venta.", color: "text-green-400 bg-green-500/10" },
                                    { icon: <Shield className="w-5 h-5" />, title: "Protección al Vendedor", desc: "Pagos garantizados y mediación en caso de disputas. Tu dinero está seguro.", color: "text-blue-400 bg-blue-500/10" },
                                    { icon: <Truck className="w-5 h-5" />, title: "Envío Guiado", desc: "Te damos instrucciones paso a paso, etiquetas preimpresas y rastreo en tiempo real.", color: "text-purple-400 bg-purple-500/10" },
                                    { icon: <Zap className="w-5 h-5" />, title: "Precios Inteligentes", desc: "Sugerimos precios basados en ventas reales y la demanda del mercado. Vende más rápido.", color: "text-yellow-400 bg-yellow-500/10" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 pb-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-24 h-24 mx-auto mb-6 opacity-80" />
                        <h2 className="text-3xl font-black font-display mb-4">¿LISTO PARA EMPEZAR?</h2>
                        <p className="text-gray-400 mb-8">Publica tu primera carta en menos de 3 minutos.</p>
                        <button
                            onClick={() => setStep(1)}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all group"
                        >
                            Comenzar <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-nexus pt-32 px-6 pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black font-display">PUBLICAR CARTA</h1>
                        <p className="text-gray-500 text-sm">Paso {step} de 3</p>
                    </div>
                </div>

                {/* Stepper */}
                <div className="flex gap-2 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 flex items-center gap-2">
                            <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${s <= step ? 'bg-green-500' : 'bg-white/10'}`} />
                            {s < 3 && <div className="w-1 h-1 rounded-full bg-white/10" />}
                        </div>
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
                                <label className="flex items-center gap-3 text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scope-lens.png" alt="" className="w-5 h-5" />
                                    1. Selecciona la Carta
                                </label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="🔍 Buscar por nombre de Pokémon o set..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-green-500/50 transition-all text-lg text-white placeholder:text-gray-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {searchQuery && (
                                    <div className="mt-4 rounded-2xl glass overflow-hidden divide-y divide-white/5">
                                        {mockSearchResults.map((card) => (
                                            <button
                                                key={card.id}
                                                onClick={() => setStep(2)}
                                                className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left group"
                                            >
                                                <div className="w-14 h-20 bg-black/50 rounded-xl border border-white/10 overflow-hidden shrink-0">
                                                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-white group-hover:text-green-400 transition-colors">{card.name}</p>
                                                    <p className="text-xs text-gray-500">{card.set} • {card.number}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-green-400 font-black">{card.price}</p>
                                                    <p className="text-[10px] text-gray-600 uppercase">Precio mercado</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
                                <Info className="text-blue-400 shrink-0 w-5 h-5 mt-0.5" />
                                <p className="text-sm text-blue-200/70 leading-relaxed">
                                    Busca usando el nombre oficial o el código del set. Los precios de mercado se actualizan cada hora basados en ventas reales.
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
                                <label className="flex items-center gap-3 text-sm font-black text-gray-400 uppercase tracking-widest mb-6">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png" alt="" className="w-5 h-5" />
                                    2. Detalles de la Publicación
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => setListingType("FIXED")}
                                        className={`p-6 rounded-[24px] border transition-all text-left relative overflow-hidden group ${listingType === "FIXED" ? 'bg-green-500/10 border-green-500 shadow-lg shadow-green-500/5' : 'glass hover:border-white/20'}`}
                                    >
                                        <div className="absolute bottom-2 right-2 opacity-10">
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-16 h-16" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${listingType === "FIXED" ? 'bg-green-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                                                <DollarSign className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-black text-lg">Compra Inmediata</h3>
                                            <p className="text-sm text-gray-400">Vende al instante a un precio fijo.</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setListingType("AUCTION")}
                                        className={`p-6 rounded-[24px] border transition-all text-left relative overflow-hidden group ${listingType === "AUCTION" ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5' : 'glass hover:border-white/20'}`}
                                    >
                                        <div className="absolute bottom-2 right-2 opacity-10">
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" alt="" className="w-16 h-16" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${listingType === "AUCTION" ? 'bg-orange-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                                                <Gavel className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-black text-lg">Subasta</h3>
                                            <p className="text-sm text-gray-400">Deja que el mercado decida el valor.</p>
                                        </div>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Estado de la Carta</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-green-500/50 text-white appearance-none">
                                            <option>Near Mint (NM)</option>
                                            <option>Lightly Played (LP)</option>
                                            <option>Moderately Played (MP)</option>
                                            <option>Heavily Played (HP)</option>
                                            <option>Damaged (Dañada)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            {listingType === "FIXED" ? "Precio (MXN)" : "Puja Inicial (MXN)"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-green-500/50 text-white font-mono"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" alt="" className="w-4 h-4" />
                                            Precio sugerido: $750 - $950 basado en ventas recientes
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-between">
                                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-bold px-6">Atrás</button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
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
                                <label className="flex items-center gap-3 text-sm font-black text-gray-400 uppercase tracking-widest mb-6">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/camera.png" alt="" className="w-5 h-5" />
                                    3. Fotos y Confirmación
                                </label>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                    {["Frente", "Reverso", "Bordes", "Más"].map((label, i) => (
                                        <div key={i} className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer group">
                                            <Camera className="w-8 h-8 text-gray-500 group-hover:text-green-400 transition-colors" />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider group-hover:text-green-400 transition-colors">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-[24px] glass p-6">
                                    <h3 className="font-black mb-4 flex items-center gap-3">
                                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png" alt="" className="w-5 h-5" />
                                        Resumen Final
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-gray-400">
                                            <span>Tipo de Listado</span>
                                            <span className="text-white font-medium">{listingType === "FIXED" ? "Compra Inmediata" : "Subasta"}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>Tarifa de Plataforma (2%)</span>
                                            <span className="text-green-500 font-bold">Gratis por Beta 🎉</span>
                                        </div>
                                        <div className="h-px bg-white/5 my-2" />
                                        <div className="flex justify-between text-lg font-black">
                                            <span>Ganancias Potenciales</span>
                                            <span className="text-green-400 font-mono">$850.00</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-between">
                                <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white font-bold px-6">Atrás</button>
                                <Link
                                    href="/dashboard"
                                    className="px-10 py-4 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition-all flex items-center gap-2 uppercase tracking-widest text-sm"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Publicar
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
