"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Settings, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UserNav() {
    const { data: session, status } = useSession();
    const router = useRouter(); // Initialize router
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    if (status === "loading") {
        return <div className="h-8 w-8 bg-white/5 rounded-full animate-pulse" />;
    }

    if (status === "unauthenticated") {
        return (
            <Link href="/login" className="text-sm font-bold text-white hover:text-primary transition-colors">
                Iniciar Sesión
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* Wallet Display (Desktop) */}
            <div className="hidden lg:flex flex-col items-end px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[10px] text-gray-500 font-bold uppercase leading-none mb-1">Billetera</span>
                <span className="text-sm font-mono font-bold text-primary leading-none">
                    ${Number((session?.user as any)?.walletBalance || 0).toLocaleString()}
                </span>
            </div>

            {/* User Avatar Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none group"
            >
                <div className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary font-bold shadow-lg shadow-black/50 group-hover:border-primary/50 transition-colors">
                    {session?.user?.name?.[0].toUpperCase() || "U"}
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {session?.user?.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-3 w-64 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] backdrop-blur-xl ring-1 ring-white/5"
                    >
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <p className="text-sm font-bold text-white truncate">{session?.user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                        </div>

                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => handleNavigation("/dashboard")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Mi Colección</span>
                            </button>
                            <button
                                onClick={() => handleNavigation("/settings")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left"
                            >
                                <Settings className="w-4 h-4" />
                                <span>Configuración</span>
                            </button>
                        </div>

                        <div className="p-2 border-t border-white/5 mt-1">
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
