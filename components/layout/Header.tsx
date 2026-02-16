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
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-holographic animate-shimmer bg-[length:200%_auto] flex items-center justify-center">
                        <span className="text-black font-black text-xl">N</span>
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
