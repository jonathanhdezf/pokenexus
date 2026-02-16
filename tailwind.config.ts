import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050608",
                surface: "#0f1115",
                surfaceHighlight: "#16191f",
                primary: {
                    DEFAULT: "#00f2ff", // Electric Cyan
                    dark: "#00a3ff",
                    light: "#70ffff",
                },
                secondary: {
                    DEFAULT: "#ff0055", // Crimson/Legendary Red
                    dark: "#990033",
                },
                legendary: "#7d40ff", // Dark Indigo/Psychic
                premium: {
                    gold: "#d4af37",
                    silver: "#a8a9ad",
                    holographic: "#00f2ff",
                },
                success: "#00ff88",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-outfit)", "sans-serif"],
            },
            backgroundImage: {
                "premium-gradient": "linear-gradient(135deg, #050608 0%, #16191f 100%)",
                "holo-card": "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 60%, transparent 80%)",
                "holographic": "linear-gradient(135deg, #00f2ff 0%, #7d40ff 50%, #ff0055 100%)",
            },
            dropShadow: {
                "glow": "0 0 15px rgba(0, 242, 255, 0.4)",
                "glow-red": "0 0 15px rgba(255, 0, 85, 0.4)",
                "glow-gold": "0 0 20px rgba(212, 175, 55, 0.5)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "shimmer": "shimmer 3s infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
                    "50%": { transform: "scale(1.05)", opacity: "0.8" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
