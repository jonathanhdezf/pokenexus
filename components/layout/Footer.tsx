"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Youtube, Tv } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="group flex items-center gap-3 mb-6">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                                <div className="relative w-7 h-7 rounded-full border-2 border-black bg-white overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary border-b-2 border-black" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-black rounded-full z-10" />
                                </div>
                            </div>
                            <span className="text-xl font-black font-display tracking-tighter group-hover:text-primary transition-colors">
                                POKÉ<span className="text-primary italic">NEXUS</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
                            La plataforma de élite para el comercio, subasta y análisis de Pokémon TCG.
                            Elevando el coleccionismo a un nivel legendario.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-display uppercase tracking-widest text-xs">Explorar</h4>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-gray-500 hover:text-primary transition-colors text-sm">Productos</Link></li>
                            <li><Link href="/marketplace" className="text-gray-500 hover:text-primary transition-colors text-sm">Mercado Central</Link></li>
                            <li><Link href="/auctions" className="text-gray-500 hover:text-primary transition-colors text-sm">Cámara de Subastas</Link></li>
                            <li><Link href="/community" className="text-gray-500 hover:text-primary transition-colors text-sm">Comunidad Nexus</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 font-display uppercase tracking-widest text-xs">Especial</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/streaming"
                                    className="group flex items-center gap-2 text-primary font-bold text-sm hover:text-cyan-400 transition-colors"
                                >
                                    <Tv className="w-4 h-4 animate-pulse" />
                                    Pokemon Streaming
                                </Link>
                            </li>
                            <li><Link href="/sell" className="text-gray-500 hover:text-primary transition-colors text-sm">Vender Cartas</Link></li>
                            <li><Link href="/settings" className="text-gray-500 hover:text-primary transition-colors text-sm">Configuración</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} PokéNexus. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/terms" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Términos y Condiciones</Link>
                        <Link href="/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
