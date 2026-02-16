import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Shield, Wallet, Bell, Save, Tag, Plus, Crown, Swords, Award, Mail, Lock, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";

export default async function SettingsPage() {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
    });

    if (!user) return <div>User not found</div>;

    const tierName = user.reputationScore > 100 ? 'Maestro Coleccionista' : 'Entrenador Pro';
    const tierColor = user.reputationScore > 100 ? 'text-legendary' : 'text-primary';
    const tierBg = user.reputationScore > 100 ? 'bg-legendary/10 border-legendary/20' : 'bg-primary/10 border-primary/20';

    return (
        <main className="min-h-screen pt-24 px-6 max-w-5xl mx-auto pb-20 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[5%] right-[-5%] w-[35%] h-[35%] bg-primary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[15%] left-[-5%] w-[30%] h-[30%] bg-legendary/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png"
                            alt=""
                            className="w-4 h-4"
                        />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Configuración</span>
                    </div>
                    <h1 className="text-5xl font-black font-display tracking-tight">
                        CUENTA DEL <span className="text-holographic animate-shimmer">ENTRENADOR</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-2">
                        <div className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-3 space-y-1">
                            {[
                                { icon: User, label: 'Perfil', active: true },
                                { icon: Shield, label: 'Seguridad', active: false },
                                { icon: Wallet, label: 'Billetera', active: false },
                                { icon: Bell, label: 'Notificaciones', active: false },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all text-sm ${item.active
                                            ? 'bg-primary/10 text-primary border border-primary/20 font-black'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Trainer Rank Card */}
                        <div className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-5 mt-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-legendary/10 flex items-center justify-center">
                                    <Crown className="w-5 h-5 text-legendary" />
                                </div>
                                <div>
                                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Rango</div>
                                    <div className={`text-sm font-black ${tierColor}`}>{tierName}</div>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-legendary rounded-full transition-all"
                                    style={{ width: `${Math.min(user.reputationScore, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-[9px] text-gray-600 font-bold">{user.reputationScore} pts</span>
                                <span className="text-[9px] text-gray-600 font-bold">100 pts</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Collector Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] flex items-center gap-4 group hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Award className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Reputación</div>
                                    <div className="text-2xl font-black text-white">{user.reputationScore}</div>
                                </div>
                            </div>
                            <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] flex items-center gap-4 group hover:border-green-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <Tag className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Vendidos</div>
                                    <div className="text-2xl font-black text-white">0</div>
                                </div>
                            </div>
                            <div className="bg-surface/60 backdrop-blur-xl border border-white/10 p-5 rounded-[24px] flex items-center gap-4 group hover:border-orange-500/30 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                    <Swords className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Subastas Ganadas</div>
                                    <div className="text-2xl font-black text-white">0</div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Section */}
                        <section className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[28px] p-8">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-wider">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                Perfil del Coleccionista
                            </h2>

                            <div className="flex flex-col md:flex-row gap-10">
                                {/* Avatar */}
                                <div className="flex flex-col items-center gap-4 shrink-0">
                                    <div className="w-32 h-32 rounded-[28px] bg-black/40 border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-500">
                                        {user.image ? (
                                            <Image src={user.image} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <div className="text-5xl font-black text-primary/30">{user.username?.[0].toUpperCase()}</div>
                                        )}
                                        <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm rounded-[28px]">
                                            <Plus className="w-6 h-6 text-black mb-1" />
                                            <span className="text-[9px] font-black text-black uppercase tracking-wider">Actualizar</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 ${tierBg} border rounded-lg text-[9px] font-black ${tierColor} uppercase tracking-wider`}>
                                        {tierName}
                                    </span>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                                Nombre de Usuario
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.username || ""}
                                                className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-black/60 outline-none transition-all text-white font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                                Nombre Completo
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user.name || ""}
                                                className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-black/60 outline-none transition-all text-white font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.15em]">
                                            Biografía
                                        </label>
                                        <textarea
                                            className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:border-primary/50 focus:bg-black/60 outline-none transition-all text-white h-28 resize-none leading-relaxed font-medium"
                                            placeholder="Comparte tu enfoque de colección o historial de intercambios..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Security Section */}
                        <section className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[28px] p-8">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-wider">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-green-500" />
                                </div>
                                Seguridad de la Cuenta
                            </h2>

                            <div className="space-y-5">
                                {/* Email */}
                                <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Correo Electrónico</div>
                                        <div className="text-white font-medium truncate">{user.email}</div>
                                    </div>
                                    <span className="text-green-500 text-[9px] font-black bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 uppercase tracking-wider shrink-0">
                                        Verificado
                                    </span>
                                </div>

                                {/* Password */}
                                <div className="flex items-center gap-4 p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                        <Lock className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Contraseña</div>
                                        <div className="text-gray-400 text-sm">Actualiza la contraseña de tu cuenta regularmente</div>
                                    </div>
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold border border-white/10 transition-all group-hover:border-white/20">
                                        Cambiar
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="flex justify-end pt-2">
                            <button className="flex items-center gap-3 px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20">
                                <Save className="w-4 h-4" />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
