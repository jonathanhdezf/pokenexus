import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./elemental-effects.css";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "PokéNexus - Marketplace Premium de TCG",
    description: "La plataforma definitiva para coleccionistas de cartas Pokémon. Subastas en vivo, valoraciones reales y comunidad.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
            <body className="antialiased font-sans bg-background text-white min-h-screen selection:bg-primary selection:text-black">
                <NextAuthProvider>
                    <div className="absolute inset-0 bg-[url('/bg-noise.png')] opacity-5 pointer-events-none z-0"></div>
                    <div className="relative z-10 flex flex-col min-h-screen">
                        <Header />
                        <div className="flex-1">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
