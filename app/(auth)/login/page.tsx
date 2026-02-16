"use client";

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Eye, EyeOff, Zap, Volume2, VolumeX, Music } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initial audio setup
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
        }
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(e => console.log("Autoplay prevented", e));
            setIsMuted(false);
            setIsPlaying(true);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
            setIsPlaying(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Credenciales inválidas. Intenta de nuevo.");
            } else {
                router.push("/marketplace");
                router.refresh();
            }
        } catch (error) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-nexus relative overflow-hidden">
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src="https://ia800109.us.archive.org/27/items/Pokemon-Opening/01%20Pokemon%20Theme.mp3"
                className="hidden"
                muted={isMuted}
            />

            {/* Music Toggle Button */}
            <div className="fixed top-8 right-8 z-[100] flex items-center gap-4">
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3"
                        >
                            <div className="flex gap-1 items-end h-3">
                                {[1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-0.5 bg-primary"
                                        animate={{ height: ["20%", "100%", "20%"] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pokémon Theme</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMusic}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border overflow-hidden relative ${isMuted
                        ? "bg-white/5 border-white/10 text-gray-400"
                        : "bg-primary/20 border-primary/30 text-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isMuted ? (
                            <motion.div
                                key="muted"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                            >
                                <VolumeX className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unmuted"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                            >
                                <Volume2 className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!isMuted && (
                        <motion.div
                            className="absolute inset-0 bg-primary/10"
                            animate={{ opacity: [0, 0.4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </motion.button>
            </div>
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/8 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-legendary/8 blur-[180px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10" />
            </div>

            {/* Floating Pokémon Sprites */}
            <motion.img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                alt=""
                className="absolute top-[10%] right-[5%] w-64 h-64 opacity-[0.04] hidden lg:block"
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png"
                alt=""
                className="absolute bottom-[10%] left-[5%] w-72 h-72 opacity-[0.04] hidden lg:block"
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Items */}
            {[
                { icon: 'master-ball', x: '8%', y: '15%', delay: 0 },
                { icon: 'ultra-ball', x: '92%', y: '80%', delay: 2 },
                { icon: 'poke-ball', x: '85%', y: '20%', delay: 1 },
                { icon: 'rare-candy', x: '12%', y: '75%', delay: 3 },
            ].map((item, i) => (
                <motion.img
                    key={i}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.icon}.png`}
                    alt=""
                    className="absolute w-6 h-6 opacity-10 hidden md:block"
                    style={{ left: item.x, top: item.y }}
                    animate={{ y: [0, -12, 0], rotate: [0, 360] }}
                    transition={{ duration: 5, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full opacity-30" />

                <div className="relative bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 shadow-2xl shadow-black/50">
                    {/* Logo / Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <img
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                alt=""
                                className="w-4 h-4"
                            />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">PokéNexus</span>
                        </div>
                        <h1 className="text-4xl font-black font-display mb-2 tracking-tight">
                            BIENVENIDO <br />
                            <span className="text-holographic animate-shimmer">ENTRENADOR</span>
                        </h1>
                        <p className="text-gray-500 text-sm">Inicia sesión para gestionar tu colección</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                Correo Electrónico
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-black/60 outline-none transition-all text-white font-medium placeholder-gray-600"
                                    placeholder="trainer@pokenexus.com"
                                    required
                                />
                                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                Contraseña
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-black/60 outline-none transition-all text-white font-medium pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                            >
                                <Zap className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <>
                                    <img
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                        alt=""
                                        className="w-5 h-5"
                                    />
                                    Iniciar Sesión
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                        <p className="text-gray-500 text-sm">
                            ¿No tienes una cuenta?{" "}
                            <Link
                                href="/register"
                                className="text-primary font-bold hover:text-primary/80 transition-colors"
                            >
                                Regístrate ahora
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
