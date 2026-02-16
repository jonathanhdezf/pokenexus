"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Eye, EyeOff, Zap, Sparkles, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });

            if (!res.ok) {
                throw new Error("Registration failed");
            }

            router.push("/login");
        } catch (error) {
            setError("El registro falló. El correo o nombre de usuario ya están en uso.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-nexus relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-legendary/8 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/8 blur-[180px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-10" />
            </div>

            {/* Floating Pokémon Sprites */}
            <motion.img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
                alt=""
                className="absolute top-[8%] left-[3%] w-72 h-72 opacity-[0.04] hidden lg:block"
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                alt=""
                className="absolute bottom-[8%] right-[5%] w-64 h-64 opacity-[0.04] hidden lg:block"
                animate={{ y: [0, 12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Items */}
            {[
                { icon: 'premier-ball', x: '10%', y: '20%', delay: 0 },
                { icon: 'master-ball', x: '88%', y: '75%', delay: 2 },
                { icon: 'rare-candy', x: '90%', y: '15%', delay: 1 },
                { icon: 'exp-share', x: '7%', y: '80%', delay: 3 },
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

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="absolute inset-0 bg-legendary/10 blur-[80px] rounded-full opacity-30" />

                <div className="relative bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 shadow-2xl shadow-black/50">
                    {/* Logo / Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legendary/10 border border-legendary/20 mb-6">
                            <Sparkles className="w-3 h-3 text-legendary" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-legendary">Nuevo Entrenador</span>
                        </div>
                        <h1 className="text-4xl font-black font-display mb-2 tracking-tight">
                            ÚNETE A LA <br />
                            <span className="text-holographic animate-shimmer">ÉLITE TCG</span>
                        </h1>
                        <p className="text-gray-500 text-sm">Crea tu perfil de coleccionista hoy</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                Nombre de Usuario
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-legendary/50 focus:bg-black/60 outline-none transition-all text-white font-medium placeholder-gray-600"
                                    placeholder="AshKetchum_99"
                                    required
                                />
                                <div className="absolute inset-0 rounded-2xl bg-legendary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                Correo Electrónico
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-legendary/50 focus:bg-black/60 outline-none transition-all text-white font-medium placeholder-gray-600"
                                    placeholder="trainer@pokenexus.com"
                                    required
                                />
                                <div className="absolute inset-0 rounded-2xl bg-legendary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
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
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-legendary/50 focus:bg-black/60 outline-none transition-all text-white font-medium pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <div className="absolute inset-0 rounded-2xl bg-legendary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
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
                            className="w-full py-4 bg-gradient-to-r from-legendary to-yellow-400 text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-legendary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Crear Cuenta
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
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                href="/login"
                                className="text-primary font-bold hover:text-primary/80 transition-colors"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
