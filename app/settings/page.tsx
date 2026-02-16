import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Wallet, Bell, Save, Tag, Plus } from "lucide-react";
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

    return (
        <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold font-display mb-8">Configuración de Cuenta</h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <button className="w-full text-left px-4 py-2 bg-surface border-l-2 border-primary text-white font-medium rounded-r-lg">Perfil</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Seguridad</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Billetera</button>
                    <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Notificaciones</button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9 space-y-8">

                    {/* Collector Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-surface border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center">
                            <Shield className="w-8 h-8 text-primary mb-2" />
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Reputación</div>
                            <div className="text-2xl font-black text-white">{user.reputationScore}</div>
                        </div>
                        <div className="bg-surface border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center">
                            <Tag className="w-8 h-8 text-green-500 mb-2" />
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Vendidos</div>
                            <div className="text-2xl font-black text-white">0</div>
                        </div>
                        <div className="bg-surface border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center">
                            <Bell className="w-8 h-8 text-orange-500 mb-2" />
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Subastas Ganadas</div>
                            <div className="text-2xl font-black text-white">0</div>
                        </div>
                    </div>

                    {/* Profile Information Section */}
                    <section className="bg-surface border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <User className="w-6 h-6 text-primary" /> Perfil del Coleccionista
                        </h2>

                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-3xl bg-surface-highlight border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary transition-all duration-500 rotate-3 hover:rotate-0">
                                    {user.image ? (
                                        <Image src={user.image} alt="Profile" fill className="object-cover" />
                                    ) : (
                                        <div className="text-4xl font-black text-primary/50">{user.username?.[0].toUpperCase()}</div>
                                    )}
                                    <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                                        <Plus className="w-6 h-6 text-black mb-1" />
                                        <span className="text-[10px] font-black text-black uppercase tracking-tighter">Actualizar</span>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[10px] font-black text-primary uppercase">
                                    {user.reputationScore > 100 ? 'Maestro Coleccionista' : 'Entrenador Pro'}
                                </span>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-2 tracking-widest">Nombre de Usuario</label>
                                        <input
                                            type="text"
                                            defaultValue={user.username || ""}
                                            className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase mb-2 tracking-widest">Nombre Completo</label>
                                        <input
                                            type="text"
                                            defaultValue={user.name || ""}
                                            className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-500 uppercase mb-2 tracking-widest">Biografía</label>
                                    <textarea
                                        className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary outline-none transition-all text-white h-32 resize-none leading-relaxed"
                                        placeholder="Comparte tu enfoque de colección o historial de intercambios..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Data */}
                    <section className="bg-surface border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" /> Seguridad de la Cuenta
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Correo Electrónico</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        value={user.email || ""}
                                        disabled
                                        className="w-full px-4 py-2 bg-black/30 border border-white/5 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                    <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20">VERIFICADO</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-sm">Cambiar Contraseña</div>
                                    <div className="text-xs text-gray-400">Actualiza la contraseña de tu cuenta regularmente.</div>
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold border border-white/10 transition-colors">
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-primary/20">
                            <Save className="w-4 h-4" /> Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
