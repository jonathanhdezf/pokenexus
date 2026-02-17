"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, ArrowRight, Trophy, Users, TrendingUp, UserPlus, Clock } from "lucide-react";
import Link from "next/link";

interface RegisteredUser {
    id: string;
    username: string | null;
    createdAt: string;
    image: string | null;
}

const mockPosts = [
    {
        id: 1,
        user: "EntrenadorAsh",
        action: "acaba de conseguir un",
        card: "Charizard ex (SAR)",
        price: "$12,400 MXN",
        time: "hace 2m",
        likes: 124,
        comments: 18,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        cardImg: "https://images.pokemontcg.io/sv3pt5/6_hires.png",
        type: "pull"
    },
    {
        id: 2,
        user: "MistyWater",
        action: "listó para subasta",
        card: "Umbreon VMAX (Arte Alternativo)",
        price: "Puja desde $45,000 MXN",
        time: "hace 15m",
        likes: 89,
        comments: 7,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",
        cardImg: "https://images.pokemontcg.io/swsh7/215_hires.png",
        type: "auction"
    },
    {
        id: 3,
        user: "BrockRock",
        action: "completó la colección",
        card: "Pokémon 151 (165/165)",
        price: "",
        time: "hace 1h",
        likes: 245,
        comments: 32,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
        cardImg: "https://images.pokemontcg.io/sv3pt5/151_hires.png",
        type: "collection"
    },
    {
        id: 4,
        user: "CynthiaElite",
        action: "vendió exitosamente",
        card: "Pikachu VMAX (Arcoíris Raro)",
        price: "$8,200 MXN",
        time: "hace 2h",
        likes: 67,
        comments: 5,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png",
        cardImg: "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
        type: "sale"
    },
    {
        id: 5,
        user: "LanceCampeón",
        action: "abrió un sobre y obtuvo",
        card: "Mewtwo ex (Arte Completo)",
        price: "$3,700 MXN",
        time: "hace 3h",
        likes: 156,
        comments: 21,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
        cardImg: "https://images.pokemontcg.io/sv3pt5/150_hires.png",
        type: "pull"
    },
];

const topTraders = [
    { name: "EntrenadorAsh", sales: 342, pokemon: "25", badge: "🏆" },
    { name: "MistyWater", sales: 287, pokemon: "121", badge: "🥈" },
    { name: "BrockRock", sales: 231, pokemon: "95", badge: "🥉" },
    { name: "CynthiaElite", sales: 198, pokemon: "445", badge: "⭐" },
    { name: "LanceCampeón", sales: 167, pokemon: "149", badge: "⭐" },
];

const typeColors: Record<string, string> = {
    pull: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    auction: "bg-red-500/10 text-red-400 border-red-500/20",
    collection: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    sale: "bg-green-500/10 text-green-400 border-green-500/20",
};

const typeLabels: Record<string, string> = {
    pull: "Apertura",
    auction: "Subasta",
    collection: "Colección",
    sale: "Venta",
};

// Random Pokémon sprites to assign to users who don't have avatars
const pokemonSprites = [
    133, 25, 1, 4, 7, 150, 151, 249, 384, 94, 143, 6, 9, 131, 149,
    196, 197, 448, 445, 282, 373, 376, 468, 483, 484, 487, 493, 643, 644,
];

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Justo ahora";
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 30) return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
    return date.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export default function CommunityPage() {
    const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    useEffect(() => {
        fetch("/api/registered-users")
            .then(res => res.json())
            .then(data => {
                setRegisteredUsers(data.users || []);
                setIsLoadingUsers(false);
            })
            .catch(() => {
                setRegisteredUsers([]);
                setIsLoadingUsers(false);
            });
    }, []);

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Sección Principal */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-purple-500/8 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[50%] bg-pink-500/8 blur-[120px] rounded-full" />

                <div className="absolute top-20 right-[5%] hidden lg:flex gap-3 opacity-15">
                    {[25, 6, 150, 384].map((id, i) => (
                        <img
                            key={id}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt=""
                            className="w-16 h-16"
                            style={{ transform: `translateY(${Math.sin(i) * 15}px)` }}
                        />
                    ))}
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/friend-ball.png" alt="" className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Comunidad PokéNexus</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
                        NOTICIAS <br />
                        <span className="text-holographic animate-shimmer">DE LA COMUNIDAD</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        Descubre qué está pasando en la comunidad. Aperturas épicas, subastas en vivo, ventas exitosas y los logros de entrenadores como tú.
                    </p>

                    {/* Estadísticas */}
                    <div className="flex flex-wrap gap-4 mt-10">
                        {[
                            { label: "Entrenadores Registrados", value: registeredUsers.length > 0 ? registeredUsers.length.toLocaleString("es-MX") : "—", icon: <Users className="w-5 h-5 text-purple-400" /> },
                            { label: "Transacciones Hoy", value: "1,204", icon: <TrendingUp className="w-5 h-5 text-green-400" /> },
                            { label: "En Línea Ahora", value: "342", icon: <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl glass">
                                {stat.icon}
                                <div>
                                    <p className="text-white font-black text-lg">{stat.value}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Feed de Actividad */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-black font-display flex items-center gap-3">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-recorder.png" alt="" className="w-6 h-6" />
                            ACTIVIDAD RECIENTE
                        </h2>

                        {mockPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-[24px] glass hover:border-white/20 transition-colors overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                                            <img src={post.avatar} alt="" className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1 gap-2">
                                                <p className="text-white text-sm">
                                                    <span className="font-black">{post.user}</span>{" "}
                                                    <span className="text-gray-500">{post.action}</span>{" "}
                                                    <span className="text-primary font-bold">{post.card}</span>
                                                </p>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${typeColors[post.type]}`}>
                                                        {typeLabels[post.type]}
                                                    </span>
                                                    <span className="text-[10px] text-gray-600">{post.time}</span>
                                                </div>
                                            </div>
                                            {post.price && (
                                                <p className="text-sm font-mono text-green-400 font-bold mb-3">{post.price}</p>
                                            )}

                                            {/* Vista previa de carta */}
                                            <div className="w-20 h-28 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black/50 hover:scale-105 transition-transform cursor-pointer">
                                                <img src={post.cardImg} alt="" className="w-full h-full object-contain" />
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors text-sm group">
                                                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" /> {post.likes}
                                                </button>
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm group">
                                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" /> {post.comments}
                                                </button>
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group">
                                                    <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Compartir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Barra Lateral */}
                    <div className="space-y-6">
                        {/* Entrenadores Registrados (Dinámico) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-[24px] glass p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-2 right-2 opacity-10">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" alt="" className="w-20 h-20" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                    <UserPlus className="w-4 h-4 text-green-400" />
                                    Entrenadores Registrados
                                </h3>

                                {isLoadingUsers ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 animate-pulse">
                                                <div className="w-10 h-10 rounded-full bg-white/10" />
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-3 bg-white/10 rounded w-24" />
                                                    <div className="h-2 bg-white/5 rounded w-16" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : registeredUsers.length === 0 ? (
                                    <div className="text-center py-6">
                                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" alt="" className="w-16 h-16 mx-auto mb-3 opacity-30" />
                                        <p className="text-gray-500 text-sm">Aún no hay entrenadores registrados.</p>
                                        <p className="text-gray-600 text-xs mt-1">¡Sé el primero en unirte!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {registeredUsers.map((user, i) => {
                                            const spriteId = pokemonSprites[i % pokemonSprites.length];
                                            const isNewest = i === 0;
                                            return (
                                                <motion.div
                                                    key={user.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isNewest
                                                            ? "bg-green-500/10 border border-green-500/20"
                                                            : "bg-white/[0.02] hover:bg-white/5 border border-transparent"
                                                        }`}
                                                >
                                                    {/* Número de Registro */}
                                                    <span className={`text-[10px] font-black w-5 text-center ${isNewest ? "text-green-400" : "text-gray-600"}`}>
                                                        #{registeredUsers.length - i}
                                                    </span>

                                                    {/* Avatar del Pokémon */}
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isNewest
                                                            ? "bg-green-500/10 border border-green-500/20"
                                                            : "bg-white/5 border border-white/10"
                                                        }`}>
                                                        <img
                                                            src={user.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`}
                                                            alt=""
                                                            className="w-8 h-8"
                                                        />
                                                    </div>

                                                    {/* Información del Usuario */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-black text-sm truncate ${isNewest ? "text-green-300" : "text-white"}`}>
                                                            {user.username || "Entrenador Anónimo"}
                                                        </p>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3 text-gray-600" />
                                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${isNewest ? "text-green-400" : "text-gray-600"}`}>
                                                                {formatTimeAgo(user.createdAt)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Indicador Nuevo */}
                                                    {isNewest && (
                                                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                                                            Nuevo
                                                        </span>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Total Counter */}
                                {registeredUsers.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                                            Total de entrenadores
                                        </p>
                                        <p className="text-sm font-black text-primary">
                                            {registeredUsers.length}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Mejores Entrenadores */}
                        <div className="rounded-[24px] glass p-6">
                            <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                Mejores Entrenadores
                            </h3>
                            <div className="space-y-3">
                                {topTraders.map((trader, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                        <span className="text-lg w-6 text-center">{trader.badge}</span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${trader.pokemon}.png`} alt="" className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-white group-hover:text-primary transition-colors">{trader.name}</p>
                                            <p className="text-[10px] text-gray-600">{trader.sales} ventas realizadas</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cartas del Momento */}
                        <div className="rounded-[24px] glass p-6">
                            <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png" alt="" className="w-5 h-5" />
                                Cartas del Momento
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    "https://images.pokemontcg.io/sv3pt5/6_hires.png",
                                    "https://images.pokemontcg.io/swsh7/215_hires.png",
                                    "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
                                    "https://images.pokemontcg.io/sv3pt5/150_hires.png",
                                    "https://images.pokemontcg.io/sv3pt5/151_hires.png",
                                    "https://images.pokemontcg.io/swsh9/176_hires.png",
                                ].map((img, i) => (
                                    <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-black/50 hover:border-primary/30 hover:scale-105 transition-all cursor-pointer">
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Próximamente */}
                        <div className="rounded-[24px] glass p-6 relative overflow-hidden">
                            <div className="absolute bottom-2 right-2 opacity-10">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" alt="" className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/link-cable.png" alt="" className="w-5 h-5" />
                                    Próximamente
                                </h3>
                                <h4 className="font-black text-lg mb-2">Intercambios entre Entrenadores</h4>
                                <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                                    Intercambia cartas directamente con otros entrenadores. Sistema de custodia seguro con verificación de autenticidad incluida.
                                </p>
                                <div className="flex gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">En desarrollo</span>
                                </div>
                            </div>
                        </div>

                        {/* Acciones Rápidas */}
                        <div className="rounded-[24px] glass p-6">
                            <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Acciones Rápidas</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "Publicar Carta", href: "/sell", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png" },
                                    { label: "Ver Subastas", href: "/auctions", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png" },
                                    { label: "Explorar Mercado", href: "/marketplace", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png" },
                                    { label: "Guía de Productos", href: "/products", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" },
                                ].map((link) => (
                                    <Link key={link.label} href={link.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                                        <img src={link.icon} alt="" className="w-5 h-5" />
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors flex-1">{link.label}</span>
                                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
