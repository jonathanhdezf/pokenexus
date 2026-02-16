import { ArrowRight, BookOpen, Shield, Play, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
    return (
        <main className="flex flex-col min-h-screen bg-nexus pt-24">
            {/* Hero */}
            <section className="w-full px-6 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" alt="" className="w-6 h-6" />
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
                    <h2 className="text-3xl font-black font-display mb-10 flex items-center gap-4">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-recorder.png" alt="" className="w-8 h-8" />
                        TUTORIALES EN VIDEO
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <a href="https://tcg.pokemon.com/es-mx/learn/" target="_blank" rel="noopener noreferrer" className="group relative rounded-[32px] glass overflow-hidden aspect-video flex items-center justify-center hover:border-primary/30 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                            <div className="absolute bottom-4 right-4 opacity-15">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" className="w-28 h-28" />
                            </div>
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
                                { title: "Reglas Básicas", desc: "Cómo preparar tu zona de juego, robar cartas y turnos", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rule-book.png", pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
                                { title: "Tipos de Energía", desc: "Los 11 tipos de Energía y sus ventajas competitivas", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png", pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
                                { title: "Construir un Mazo", desc: "Crea tu primer mazo de 60 cartas equilibrado", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-elixir.png", pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
                                { title: "Evolucionar Pokémon", desc: "Mecánicas de evolución, EX, VMAX y VSTAR", icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png", pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png" },
                            ].map((item, i) => (
                                <a href="https://tcg.pokemon.com/es-mx/learn/" target="_blank" rel="noopener noreferrer" key={i} className="p-5 rounded-2xl glass hover:border-primary/30 transition-all flex items-center gap-4 group cursor-pointer relative overflow-hidden">
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                                        <img src={item.pokemon} alt="" className="w-16 h-16" />
                                    </div>
                                    <img src={item.icon} alt="" className="w-8 h-8" />
                                    <div className="flex-1 relative z-10">
                                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-gray-500 text-xs">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors relative z-10" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pasos para empezar */}
            <section className="w-full px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black font-display mb-10 flex items-center gap-4">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" className="w-8 h-8" />
                        CÓMO EMPEZAR TU AVENTURA
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01", title: "Consigue un Mazo de Batalla",
                                desc: "Elige un Mazo de Batalla V listo para jugar. Cada uno incluye 60 cartas, una moneda VSTAR, contadores de daño y una guía de estrategia.",
                                link: "/products",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png",
                                item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png"
                            },
                            {
                                step: "02", title: "Domina las Reglas del Juego",
                                desc: "Descarga Pokémon TCG Live (gratis) para aprender con un tutorial interactivo, o mira nuestros videos explicativos de cada mecánica.",
                                link: "https://tcg.pokemon.com/es-mx/learn/",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
                                item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png"
                            },
                            {
                                step: "03", title: "¡Desafía a otros Entrenadores!",
                                desc: "Juega contra amigos, participa en ligas locales o compite en torneos oficiales de Pokémon. ¡Tu camino al Campeonato Mundial comienza aquí!",
                                link: "/marketplace",
                                pokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
                                item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png"
                            },
                        ].map((item, i) => (
                            <a href={item.link} key={i} className="group p-8 rounded-[32px] glass hover:border-primary/30 transition-all relative overflow-hidden">
                                <span className="absolute top-6 right-6 text-6xl font-black text-white/5 font-display">{item.step}</span>
                                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src={item.pokemon} alt="" className="w-24 h-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                        <img src={item.item} alt="" className="w-8 h-8" />
                                    </div>
                                    <div className="text-primary font-black text-sm uppercase tracking-widest mb-4">Paso {item.step}</div>
                                    <h3 className="text-xl font-black font-display mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tipos de Energía */}
            <section className="w-full px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black font-display mb-4 flex items-center gap-4">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png" alt="" className="w-8 h-8" />
                        TIPOS DE ENERGÍA EN JCC
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-xl">Cada tipo de Pokémon necesita su Energía correspondiente para atacar. Conoce los 11 tipos y sus Pokémon emblemáticos.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { type: "Fuego", color: "from-red-500/20 to-orange-500/20", border: "hover:border-red-500/30", pokemon: "6", text: "text-red-400" },
                            { type: "Agua", color: "from-blue-500/20 to-cyan-500/20", border: "hover:border-blue-500/30", pokemon: "9", text: "text-blue-400" },
                            { type: "Planta", color: "from-green-500/20 to-emerald-500/20", border: "hover:border-green-500/30", pokemon: "3", text: "text-green-400" },
                            { type: "Eléctrico", color: "from-yellow-400/20 to-amber-400/20", border: "hover:border-yellow-400/30", pokemon: "25", text: "text-yellow-400" },
                            { type: "Psíquico", color: "from-purple-500/20 to-pink-500/20", border: "hover:border-purple-500/30", pokemon: "150", text: "text-purple-400" },
                            { type: "Lucha", color: "from-orange-600/20 to-red-600/20", border: "hover:border-orange-500/30", pokemon: "68", text: "text-orange-400" },
                            { type: "Oscuridad", color: "from-gray-700/30 to-purple-900/20", border: "hover:border-gray-500/30", pokemon: "197", text: "text-gray-300" },
                            { type: "Metal", color: "from-slate-400/20 to-gray-500/20", border: "hover:border-slate-400/30", pokemon: "376", text: "text-slate-300" },
                            { type: "Dragón", color: "from-indigo-500/20 to-yellow-500/20", border: "hover:border-indigo-500/30", pokemon: "384", text: "text-indigo-400" },
                            { type: "Hada", color: "from-pink-400/20 to-rose-400/20", border: "hover:border-pink-400/30", pokemon: "282", text: "text-pink-400" },
                            { type: "Incoloro", color: "from-gray-300/10 to-white/10", border: "hover:border-gray-300/30", pokemon: "143", text: "text-gray-400" },
                        ].map((energy) => (
                            <div key={energy.type} className={`p-4 rounded-2xl glass ${energy.border} transition-all group text-center cursor-default`}>
                                <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${energy.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${energy.pokemon}.png`}
                                        alt={energy.type}
                                        className="w-14 h-14"
                                    />
                                </div>
                                <p className={`text-xs font-black uppercase tracking-wider ${energy.text}`}>{energy.type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recursos para Padres */}
            <section id="parents" className="w-full px-6 py-16 scroll-mt-24">
                <div className="max-w-5xl mx-auto">
                    <div className="p-12 rounded-[32px] glass border-yellow-500/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[40%] h-full bg-yellow-500/5 blur-[100px] rounded-full" />
                        <div className="absolute bottom-8 right-8 opacity-10">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png" alt="" className="w-40 h-40" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png" alt="" className="w-6 h-6" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Para Padres</span>
                            </div>
                            <h2 className="text-3xl font-black font-display mb-4">RECURSOS PARA PADRES Y FAMILIAS</h2>
                            <p className="text-gray-400 max-w-xl mb-8 leading-relaxed">
                                El JCC Pokémon es un excelente juego para desarrollar habilidades de lectura, matemáticas y pensamiento estratégico. Es un pasatiempo seguro, social y apto para toda la familia.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Edad recomendada: 6+", desc: "Diseñado para que los niños aprendan a leer, sumar y tomar decisiones.", pokemon: "172", color: "bg-yellow-500/10" },
                                    { title: "Desarrollo cognitivo", desc: "Fomenta pensamiento crítico, planificación estratégica y matemáticas.", pokemon: "151", color: "bg-pink-500/10" },
                                    { title: "Comunidad segura", desc: "Ligas y eventos supervisados con un ambiente familiar y amigable.", pokemon: "468", color: "bg-blue-500/10" },
                                    { title: "Control de gastos", desc: "Mazos desde $199 MXN. Enseña a tus hijos responsabilidad financiera.", pokemon: "52", color: "bg-green-500/10" },
                                ].map((item, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemon}.png`}
                                                alt=""
                                                className="w-8 h-8"
                                            />
                                        </div>
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
            <section className="w-full px-6 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        alt="Pikachu"
                        className="w-28 h-28 mx-auto mb-6 opacity-80"
                    />
                    <h2 className="text-3xl md:text-5xl font-black font-display mb-6">¿LISTO PARA TU AVENTURA?</h2>
                    <p className="text-gray-400 mb-10">Explora nuestra tienda y encuentra el producto perfecto para tu primer paso como Entrenador Pokémon.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="px-8 py-4 rounded-2xl bg-primary text-nexus font-black uppercase tracking-widest text-sm hover:bg-primary/80 transition-all flex items-center justify-center gap-3">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" className="w-5 h-5" />
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
