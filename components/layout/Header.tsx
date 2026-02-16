"use client";

import Link from "next/link";
import UserNav from "@/components/auth/UserNav";
import NotificationBell from "@/components/layout/NotificationBell";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    // Hide header on login/register pages for clean look
    if (['/login', '/register'].includes(pathname)) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-20">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150" />

                        {/* Pokeball Body */}
                        <div className="relative w-8 h-8 rounded-full border-[2.5px] border-[#050608] bg-white overflow-hidden shadow-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-active:scale-95">
                            {/* Top Half (Crimson Premium) */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-secondary to-secondary-dark border-b-[2.5px] border-[#050608]" />

                            {/* Center Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-[2px] border-[#050608] rounded-full z-10 group-hover:shadow-[0_0_10px_#00f2ff] transition-all duration-500">
                                {/* Inner Pulse */}
                                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <span className="text-xl font-black font-display tracking-tighter group-hover:text-primary transition-colors">
                        POKÉ<span className="text-primary italic">NEXUS</span>
                    </span>
                </Link>

                <nav className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <Link href="/products" className="hover:text-primary transition-all hover:tracking-[0.3em]">Productos</Link>
                    <Link href="/marketplace" className="hover:text-primary transition-all hover:tracking-[0.3em]">Mercado</Link>
                    <Link href="/auctions" className="hover:text-primary transition-all hover:tracking-[0.3em]">Subastas</Link>
                    <Link href="/sell" className="hover:text-primary transition-all hover:tracking-[0.3em]">Vender</Link>
                    <Link href="/community" className="hover:text-primary transition-all hover:tracking-[0.3em]">Comunidad</Link>
                </nav>

                <div className="flex items-center gap-6">
                    <div className="h-6 w-px bg-white/10 hidden md:block" />
                    <NotificationBell />
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
