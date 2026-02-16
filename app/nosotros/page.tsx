import { Users, Shield, Zap, Heart, Globe, Award, Star, ArrowRight, Target, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NosotrosPage() {
    const values = [
        {
            icon: Shield,
            title: "Seguridad",
            description: "Cada transacción está protegida por sistemas de verificación y escrow digital para garantizar la autenticidad.",
            color: "green-500",
        },
        {
            icon: Heart,
            title: "Comunidad",
            description: "Somos una familia de coleccionistas apasionados. Cada entrenador importa y su voz es escuchada.",
            color: "red-400",
        },
        {
            icon: Zap,
            title: "Innovación",
            description: "Tecnología de vanguardia aplicada al coleccionismo. IA, análisis de mercado y herramientas únicas.",
            color: "yellow-400",
        },
        {
            icon: Globe,
            title: "Accesibilidad",
            description: "Una plataforma diseñada para todos, desde el coleccionista novato hasta el experto veterano.",
            color: "primary",
        },
    ];

    const milestones = [
        { year: "2024", title: "La Idea", description: "Nace la visión de crear la plataforma definitiva para coleccionistas de Pokémon TCG en Latinoamérica.", pokemon: "133" },
        { year: "2025", title: "Construcción", description: "Desarrollo del marketplace, sistema de subastas y herramientas de gestión de colección.", pokemon: "134" },
        { year: "2026", title: "Lanzamiento", description: "PokéNexus abre sus puertas al público. La comunidad comienza a crecer.", pokemon: "196" },
        { year: "Futuro", title: "Expansión", description: "Intercambios P2P, aplicaciones móviles, torneos y alianzas internacionales.", pokemon: "700" },
    ];

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[50%] bg-legendary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[150px] rounded-full" />

                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png"
                    alt=""
                    className="absolute top-20 right-[5%] w-60 h-60 opacity-[0.04] hidden lg:block"
                />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legendary/10 border border-legendary/20 mb-6">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/friend-ball.png" alt="" className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-legendary">Quiénes Somos</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight tracking-tight">
                        NUESTRA <br />
                        <span className="text-holographic animate-shimmer">HISTORIA</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        PokéNexus nació de la pasión por el coleccionismo de cartas Pokémon y la necesidad de una plataforma segura, moderna y accesible para la comunidad hispanohablante.
                    </p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 space-y-20">
                {/* Mission */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Nuestra Misión</span>
                        </div>
                        <h2 className="text-3xl font-black font-display mb-5 tracking-tight">
                            ELEVAR EL <span className="text-primary">COLECCIONISMO</span> A UN NIVEL LEGENDARIO
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Creamos un ecosistema donde cada entrenador puede comprar, vender, subastar y gestionar su colección de Pokémon TCG con la confianza y la experiencia que merece.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            Nuestra plataforma combina tecnología de punta con un diseño premium que honra la nostalgia y la emoción de coleccionar cartas Pokémon. Cada detalle está diseñado para ofrecer una experiencia inolvidable.
                        </p>
                    </div>

                    <div className="relative rounded-[32px] bg-surface/60 backdrop-blur-xl border border-white/10 p-10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-legendary/5 pointer-events-none" />
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
                            alt=""
                            className="absolute bottom-4 right-4 w-32 h-32 opacity-[0.06]"
                        />
                        <div className="relative z-10 space-y-6">
                            {[
                                { label: "Cartas Listadas", value: "10,000+", color: "text-primary" },
                                { label: "Entrenadores Activos", value: "3,800+", color: "text-legendary" },
                                { label: "Transacciones Seguras", value: "15,000+", color: "text-green-400" },
                                { label: "Sets Disponibles", value: "120+", color: "text-yellow-400" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <span className="text-gray-500 text-sm font-bold">{stat.label}</span>
                                    <span className={`text-2xl font-mono font-black ${stat.color}`}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black font-display tracking-tight mb-4">
                            NUESTROS <span className="text-holographic animate-shimmer">VALORES</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">Los pilares que guían cada decisión en PokéNexus</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((val, i) => (
                            <div key={i} className="group bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-7 hover:border-white/20 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-${val.color}/10 flex items-center justify-center`}>
                                        <val.icon className={`w-6 h-6 text-${val.color}`} />
                                    </div>
                                    <h3 className="text-lg font-black">{val.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black font-display tracking-tight mb-4">
                            NUESTRA <span className="text-primary">LÍNEA DEL TIEMPO</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {milestones.map((ms, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <div className="shrink-0 w-20 text-right">
                                    <span className="text-xl font-mono font-black text-primary">{ms.year}</span>
                                </div>
                                <div className="relative flex flex-col items-center shrink-0">
                                    <div className="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-125 transition-transform" />
                                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2 min-h-[60px]" />}
                                </div>
                                <div className="flex-1 bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 group-hover:border-primary/20 transition-all flex items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-black text-white mb-1">{ms.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{ms.description}</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ms.pokemon}.png`}
                                            alt=""
                                            className="w-10 h-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative rounded-[32px] bg-surface/60 backdrop-blur-xl border border-white/10 p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-legendary/5 via-transparent to-primary/5 pointer-events-none" />
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                        alt=""
                        className="absolute bottom-4 left-8 w-36 h-36 opacity-[0.05]"
                    />
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black font-display mb-4 tracking-tight">
                            ÚNETE A LA <span className="text-holographic animate-shimmer">AVENTURA</span>
                        </h3>
                        <p className="text-gray-400 max-w-lg mx-auto mb-8">
                            Sé parte de la comunidad de coleccionistas más apasionada. Tu viaje como entrenador comienza aquí.
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20"
                        >
                            Crear Cuenta Gratis
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
