"use client";

import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, Award, Zap } from "lucide-react";

const mockPosts = [
    {
        id: 1,
        user: "EntrenadorAsh",
        action: "acaba de asegurar un",
        card: "Charizard VMAX (Shiny)",
        price: "$120.00",
        time: "hace 2m",
        likes: 24,
        comments: 5,
        avatar: "A"
    },
    {
        id: 2,
        user: "MistyWater",
        action: "listó para subasta",
        card: "Lugia V (Alt Art)",
        price: "Comenzando en $250.00",
        time: "hace 15m",
        likes: 12,
        comments: 2,
        avatar: "M"
    },
    {
        id: 3,
        user: "BrockRock",
        action: "se unió al club de Coleccionistas de Élite",
        card: "",
        price: "",
        time: "hace 1h",
        likes: 45,
        comments: 12,
        avatar: "B"
    }
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold font-display mb-2">Noticias Nexus</h1>
                    <p className="text-gray-400">Mira lo que está sucediendo en el mundo PokéNexus.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold">1,240 En Línea</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {mockPosts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
                    >
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                {post.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-white font-bold">
                                        {post.user} <span className="font-normal text-gray-500">{post.action}</span> {post.card && <span className="text-primary">{post.card}</span>}
                                    </p>
                                    <span className="text-xs text-gray-600">{post.time}</span>
                                </div>
                                {post.price && (
                                    <p className="text-sm font-mono text-cyan-400 mb-4">{post.price}</p>
                                )}

                                <div className="flex items-center gap-6 mt-4">
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm">
                                        <Heart className="w-4 h-4" /> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm">
                                        <MessageSquare className="w-4 h-4" /> {post.comments}
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 p-8 border border-dashed border-white/10 rounded-3xl text-center bg-white/5">
                <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Solicitudes de Intercambio Próximamente</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Estamos construyendo un sistema de comercio seguro peer-to-peer. ¡Mantente al tanto!
                </p>
            </div>
        </main>
    );
}
