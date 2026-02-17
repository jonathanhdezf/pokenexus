"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, History, Info, MessageSquare, Calendar, User, DollarSign, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import GalleryModal from "./GalleryModal";

interface CollectionCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    userCard: any;
}

export default function CollectionCardModal({ isOpen, onClose, userCard }: CollectionCardModalProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    useEffect(() => {
        if (isOpen && userCard) {
            setLoadingHistory(true);
            fetch(`/api/collection/history/${userCard.card.id}`)
                .then(res => res.json())
                .then(data => {
                    setHistory(Array.isArray(data) ? data : []);
                    setLoadingHistory(false);
                })
                .catch(() => setLoadingHistory(false));
        }
    }, [isOpen, userCard]);

    if (!userCard) return null;

    const galleryImages = userCard.galleryImages ? JSON.parse(userCard.galleryImages) : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-50 bg-black/50 rounded-full border border-white/10 hover:border-white/30"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left: Card Display */}
                        <div className="w-full md:w-5/12 p-8 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center">
                            <div className="relative group perspective-1000 w-full max-w-[300px]">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
                                <motion.img
                                    initial={{ rotateY: -20, rotateX: 10 }}
                                    animate={{ rotateY: 0, rotateX: 0 }}
                                    src={userCard.card.imageUrl}
                                    alt={userCard.card.name}
                                    className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10"
                                />
                                <div className="absolute inset-0 z-20 bg-holo-overlay opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity rounded-2xl" />
                            </div>

                            <div className="mt-8 w-full space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Calidad</p>
                                            <p className="font-bold text-white leading-none">{userCard.condition}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg">VERIFICADA</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                        <History />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Adquirida</p>
                                        <p className="font-bold text-white leading-none">
                                            {new Date(userCard.acquiredAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Technical Details & Transaction History */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 border border-primary/20 rounded">
                                        {userCard.card.set}
                                    </span>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">#{userCard.card.cardNumber}</span>
                                </div>
                                <h2 className="text-4xl font-black font-display tracking-tight text-white mb-2 uppercase">{userCard.card.name}</h2>
                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                    <Info className="w-4 h-4" /> Especificaciones técnicas de la Bóveda Nexus
                                </p>
                            </div>

                            {/* Comments/Notes Section */}
                            <div className="mb-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Comentarios del Entrenador</h3>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 relative group">
                                    <p className="text-gray-300 text-sm italic leading-relaxed">
                                        {userCard.notes || "No hay comentarios adicionales sobre esta carta. Esta pieza mantiene su brillo original y ha sido resguardada en funda protectora premium."}
                                    </p>
                                    <button className="absolute top-4 right-4 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Editar
                                    </button>
                                </div>
                            </div>

                            {/* Transaction History Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <History className="w-4 h-4 text-cyan-400" />
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Historial de Transacciones</h3>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-600 bg-white/5 px-2 py-0.5 rounded uppercase">PokéNexus Chain</span>
                                </div>

                                <div className="space-y-3">
                                    {loadingHistory ? (
                                        <div className="py-8 flex justify-center">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : history.length > 0 ? (
                                        history.map((tx) => (
                                            <div key={tx.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
                                                        <User className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">{tx.buyerAlias}</div>
                                                        <div className="text-[9px] text-gray-600 font-bold flex items-center gap-2">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(tx.createdAt).toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-mono font-black text-cyan-400">${Number(tx.price).toLocaleString()}</div>
                                                    <div className="text-[9px] text-gray-600 font-black uppercase flex items-center justify-end gap-1">
                                                        <DollarSign className="w-3 h-3" /> Transacción Final
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-10 text-center rounded-2xl border border-dashed border-white/5">
                                            <p className="text-sm text-gray-500">No se encontraron transacciones previas en cadena.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                                    <button
                                        onClick={() => setIsGalleryOpen(true)}
                                        className="flex items-center gap-2 text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-colors px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20"
                                    >
                                        <ImageIcon className="w-3 h-3" />
                                        Galería Personal
                                    </button>

                                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                                        Ver Certificado Digital <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <GalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                userCardId={userCard.id}
                existingImages={galleryImages}
            />
        </AnimatePresence>
    );
}
