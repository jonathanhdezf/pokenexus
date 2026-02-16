import { Download, Smartphone, Monitor, Globe, Shield, Zap, Star, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DescargasPage() {
    const apps = [
        {
            title: "PokéNexus Mobile",
            description: "Lleva tu colección a todas partes. Escanea cartas con la cámara, recibe notificaciones de subastas y opera en el mercado desde tu móvil.",
            icon: Smartphone,
            color: "primary",
            badge: "Próximamente",
            badgeColor: "bg-primary/10 text-primary border-primary/20",
            features: ["Escáner de cartas con IA", "Notificaciones push", "Portfolio en tiempo real", "Modo offline"],
            pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            gradient: "from-primary/10 to-transparent",
        },
        {
            title: "PokéNexus Desktop",
            description: "Experiencia completa de escritorio con herramientas avanzadas de análisis, gestión masiva de colección y reportes detallados.",
            icon: Monitor,
            color: "legendary",
            badge: "En Desarrollo",
            badgeColor: "bg-legendary/10 text-legendary border-legendary/20",
            features: ["Gestión masiva de cartas", "Reportes de portafolio", "Análisis de mercado", "Importar/Exportar CSV"],
            pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
            gradient: "from-legendary/10 to-transparent",
        },
        {
            title: "PokéNexus Web App",
            description: "Accede desde cualquier navegador con la experiencia completa. Sin instalación necesaria, siempre actualizado.",
            icon: Globe,
            color: "green-500",
            badge: "Disponible",
            badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
            features: ["Sin instalación", "Multiplataforma", "Actualizaciones automáticas", "Sincronización en la nube"],
            pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
            gradient: "from-green-500/10 to-transparent",
        },
    ];

    const resources = [
        {
            title: "Guía de Precios 2026",
            description: "Catálogo completo con precios actualizados de todas las expansiones.",
            size: "PDF · 12.4 MB",
            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png",
        },
        {
            title: "Checklist de Sets",
            description: "Listas imprimibles para rastrear tu progreso de colección por set.",
            size: "PDF · 3.2 MB",
            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-recorder.png",
        },
        {
            title: "Pokémon TCG Reglas 2026",
            description: "El reglamento oficial completo traducido al español.",
            size: "PDF · 8.7 MB",
            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rule-book.png",
        },
        {
            title: "Wallpapers PokéNexus",
            description: "Pack de fondos de pantalla exclusivos en 4K para escritorio y móvil.",
            size: "ZIP · 45 MB",
            icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png",
        },
    ];

    return (
        <main className="min-h-screen bg-nexus pb-20">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[40%] bg-legendary/5 blur-[150px] rounded-full" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Download className="w-4 h-4 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Centro de Descargas</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight tracking-tight">
                        DESCARGA <br />
                        <span className="text-holographic animate-shimmer">TUS HERRAMIENTAS</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        Aplicaciones, recursos y herramientas para potenciar tu experiencia como coleccionista de élite.
                    </p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 space-y-16">
                {/* Apps */}
                <section>
                    <h2 className="text-2xl font-black font-display uppercase tracking-wider mb-8 flex items-center gap-3">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="" className="w-6 h-6" />
                        Aplicaciones
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {apps.map((app, i) => (
                            <div key={i} className="group relative bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[28px] p-7 hover:border-white/20 transition-all overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} pointer-events-none`} />
                                <img src={app.pokemon} alt="" className="absolute bottom-2 right-2 w-24 h-24 opacity-[0.06]" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <app.icon className={`w-6 h-6 text-${app.color}`} />
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${app.badgeColor}`}>
                                            {app.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-black mb-2">{app.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{app.description}</p>

                                    <ul className="space-y-2 mb-6">
                                        {app.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-xs text-gray-400">
                                                <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        {app.badge === "Disponible" ? "Abrir App" : "Notificarme"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resources */}
                <section>
                    <h2 className="text-2xl font-black font-display uppercase tracking-wider mb-8 flex items-center gap-3">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png" alt="" className="w-6 h-6" />
                        Recursos Descargables
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {resources.map((res, i) => (
                            <div key={i} className="group flex items-center gap-5 bg-surface/60 backdrop-blur-xl border border-white/10 rounded-[20px] p-5 hover:border-primary/30 transition-all cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <img src={res.icon} alt="" className="w-8 h-8" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-sm mb-1 group-hover:text-primary transition-colors">{res.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed mb-1">{res.description}</p>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{res.size}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <Download className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative rounded-[32px] bg-surface/60 backdrop-blur-xl border border-white/10 p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-legendary/5 pointer-events-none" />
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png"
                        alt=""
                        className="absolute bottom-4 right-8 w-40 h-40 opacity-[0.05]"
                    />
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black font-display mb-4 tracking-tight">
                            ¿NECESITAS ALGO <span className="text-holographic animate-shimmer">ESPECIAL</span>?
                        </h3>
                        <p className="text-gray-400 max-w-lg mx-auto mb-8">
                            Si buscas herramientas específicas, API access o recursos personalizados para tu colección, contáctanos.
                        </p>
                        <Link
                            href="/community"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-nexus font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/80 transition-all group shadow-xl shadow-primary/20"
                        >
                            Contactar Comunidad
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
