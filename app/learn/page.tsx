import { ArrowRight, BookOpen, Users, Shield, Play, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
    return (
        <main className="flex flex-col min-h-screen bg-nexus pt-24">
            {/* Hero */}
            <section className="w-full px-6 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Centro de Aprendizaje</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-display mb-6 leading-tight">
                        APRENDE A <br />
                        <span className="text-holographic animate-shimmer">JUGAR JCC</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Desde las reglas básicas hasta estrategias avanzadas. Todo lo que necesitas para convertirte en un Maestro Pokémon.
                    </p>
                </div>
            </section>

            {/* Video Tutorial */}
            <section className="w-full px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black font-display mb-10">📹 TUTORIALES EN VIDEO</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <a href="https://tcg.pokemon.com/es-mx/learn/" target="_blank" rel="noopener noreferrer" className="group relative rounded-[32px] glass overflow-hidden aspect-video flex items-center justify-center hover:border-primary/30 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                                <h3 className="text-xl font-black text-white">Cómo Jugar JCC Pokémon</h3>
                                <p className="text-gray-400 text-sm mt-2">Tutorial oficial para principiantes</p>
                            </div>
                        </a>
                        <div className="flex flex-col gap-4">
                            {[
                                { title: "Reglas Básicas", desc: "Aprende los fundamentos del juego", icon: "📖" },
                                { title: "Tipos de Energía", desc: "Conoce los 11 tipos y sus ventajas", icon: "⚡" },
                                { title: "Construir un Mazo", desc: "Crea tu primer mazo competitivo", icon: "🃏" },
                                { title: "Estrategias Avanzadas", desc: "Lleva tu juego al siguiente nivel", icon: "🧠" },
                            ].map((item, i) => (
                                <a href="https://tcg.pokemon.com/es-mx/learn/" target="_blank" rel="noopener noreferrer" key={i} className="p-5 rounded-2xl glass hover:border-primary/30 transition-all flex items-center gap-4 group cursor-pointer">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-gray-500 text-xs">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pasos para comenzar */}
            <section className="w-full px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black font-display mb-10">🚀 CÓMO EMPEZAR</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Consigue un Mazo", desc: "Compra un mazo de batalla listo para jugar. Incluye todo lo que necesitas: cartas, moneda y guía de reglas.", link: "/products" },
                            { step: "02", title: "Aprende las Reglas", desc: "Mira nuestros tutoriales o descarga la app Pokémon TCG Live para aprender con un tutorial interactivo.", link: "https://tcg.pokemon.com/es-mx/learn/" },
                            { step: "03", title: "¡A Jugar!", desc: "Encuentra otros entrenadores en tu comunidad local, en línea o en eventos oficiales de Pokémon.", link: "/marketplace" },
                        ].map((item, i) => (
                            <a href={item.link} key={i} className="group p-8 rounded-[32px] glass hover:border-primary/30 transition-all relative overflow-hidden">
                                <span className="absolute top-6 right-6 text-6xl font-black text-white/5 font-display">{item.step}</span>
                                <div className="relative z-10">
                                    <div className="text-primary font-black text-sm uppercase tracking-widest mb-4">Paso {item.step}</div>
                                    <h3 className="text-xl font-black font-display mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recursos para Padres */}
            <section id="parents" className="w-full px-6 py-16 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                    <div className="p-12 rounded-[32px] glass border-yellow-500/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[40%] h-full bg-yellow-500/5 blur-[100px] rounded-full" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                                <Shield className="w-4 h-4 text-yellow-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Para Padres</span>
                            </div>
                            <h2 className="text-3xl font-black font-display mb-4">RECURSOS PARA PADRES</h2>
                            <p className="text-gray-400 max-w-xl mb-8 leading-relaxed">
                                El JCC Pokémon es un excelente juego para desarrollar habilidades de lectura, matemáticas y pensamiento estratégico. Es seguro y apto para toda la familia.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Edad recomendada: 6+", desc: "El juego está diseñado para ser accesible desde los 6 años.", icon: "👶" },
                                    { title: "Desarrollo cognitivo", desc: "Fomenta el pensamiento crítico, la lectura y las matemáticas.", icon: "🧩" },
                                    { title: "Comunidad segura", desc: "Eventos supervisados y comunidad familia-friendly.", icon: "🛡️" },
                                    { title: "Control de gastos", desc: "Establece un presupuesto y enseña responsabilidad financiera.", icon: "💰" },
                                ].map((item, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                        <span className="text-xl mt-0.5">{item.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full px-6 py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black font-display mb-6">¿LISTO PARA EMPEZAR?</h2>
                    <p className="text-gray-400 mb-10">Explora nuestra tienda y encuentra el producto perfecto para tu primer paso como Entrenador Pokémon.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all flex items-center justify-center gap-3">
                            Ver Productos <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                            Explorar Catálogo
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
