"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon, Trash2, Camera, Save, Loader2, Info } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    userCardId: string;
    existingImages: string[];
}

export default function GalleryModal({ isOpen, onClose, userCardId, existingImages }: GalleryModalProps) {
    const [images, setImages] = useState<string[]>(existingImages);
    const [activeTab, setActiveTab] = useState<"view" | "edit">("view"); // "view" | "edit"
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simple view mode slider
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // In a real app, you would upload to S3/Cloudinary here.
        // For this demo, we'll simulate upload and use object URLs or a placeholder service
        // Since we don't have a real file upload service configured in this environment context,
        // we'll simulate successful upload by creating a local preview URL
        // In production, REPLACE THIS with actual upload logic.

        setUploading(true);

        // Simulating upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        const updatedList = [...images, ...newImages].slice(0, 4); // Max 4 images

        setImages(updatedList);
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/collection/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userCardId,
                    galleryImages: images
                })
            });

            if (!res.ok) throw new Error("Failed to save gallery");

            // Refresh page to show updated gallery in main modal if needed
            router.refresh();
            setActiveTab("view");
        } catch (error) {
            console.error(error);
            alert("Error al guardar la galería");
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        // Reset state on close if not saved????? 
        // Ideally we should sync with props, but for now simple close
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pt-24 md:pt-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-xl font-black font-display tracking-tight text-white flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                GALERÍA PERSONAL
                            </h2>
                            <div className="flex bg-black/40 rounded-full p-1 border border-white/5">
                                <button
                                    onClick={() => setActiveTab("view")}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'view' ? 'bg-primary text-black shadow-lg shadow-primary/25' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Ver
                                </button>
                                <button
                                    onClick={() => setActiveTab("edit")}
                                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'edit' ? 'bg-primary text-black shadow-lg shadow-primary/25' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Editar
                                </button>
                            </div>
                            <button onClick={handleClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {activeTab === "view" ? (
                                <div className="h-full flex flex-col items-center justify-center min-h-[300px]">
                                    {images.length > 0 ? (
                                        <div className="w-full space-y-4">
                                            <div className="relative aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                                <img
                                                    src={images[currentIndex]}
                                                    alt={`Gallery ${currentIndex}`}
                                                    className="w-full h-full object-contain"
                                                />
                                                {/* Navigation arrows could go here */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                                    <p className="text-white text-xs font-mono">Imagen {currentIndex + 1} de {images.length}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-center overflow-x-auto py-2">
                                                {images.map((img, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentIndex(idx)}
                                                        className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${currentIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                                    >
                                                        <img src={img} className="w-full h-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                                <ImageIcon className="w-8 h-8 text-gray-600" />
                                            </div>
                                            <p className="text-gray-500 font-medium">Tu galería está vacía.</p>
                                            <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">Sube fotos de tu carta real para certificar su estado y presumirla al mundo.</p>
                                            <button
                                                onClick={() => setActiveTab("edit")}
                                                className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary transition-all"
                                            >
                                                Agregar Fotos
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10 bg-black/40">
                                                <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <button
                                                    onClick={() => handleRemoveImage(idx)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[9px] font-mono text-white">#{idx + 1}</div>
                                            </div>
                                        ))}

                                        {images.length < 4 && (
                                            <div className="relative aspect-square rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center cursor-pointer group">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept="image/*"
                                                    multiple={false}
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    disabled={uploading}
                                                />
                                                {uploading ? (
                                                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                                ) : (
                                                    <>
                                                        <Upload className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors mb-2" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Subir</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                                        <Info className="w-5 h-5 text-blue-400 shrink-0" />
                                        <div>
                                            <h4 className="text-xs font-black uppercase text-blue-400 mb-1">Guía de Fotografía</h4>
                                            <p className="text-xs text-blue-200/70 leading-relaxed">
                                                Sube hasta 4 fotos claras. Recomendamos: Frente, Reverso, y detalles de las esquinas o superficie holográfica.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer (Only Edit Mode) */}
                        {activeTab === 'edit' && (
                            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                                <button
                                    onClick={() => setActiveTab("view")}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Guardar Cambios
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
