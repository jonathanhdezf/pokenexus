"use client";

import Link from "next/link";
import UserNav from "@/components/auth/UserNav";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    // Hide header on login/register pages for clean look
    if (['/login', '/register'].includes(pathname)) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-display tracking-tight hover:text-primary transition-colors">
                    POKÉ<span className="text-primary">NEXUS</span>
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                    <Link href="/auctions" className="hover:text-white transition-colors">Auctions</Link>
                    <Link href="/community" className="hover:text-white transition-colors">Community</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
