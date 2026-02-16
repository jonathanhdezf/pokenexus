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
                background: "#0a0a0a",
                surface: "#1a1a1a",
                surfaceHighlight: "#2a2a2a",
                primary: "#00c6ff",
                secondary: "#9d00ff",
                accent: "#ff007a",
                "gold": "#ffd700",
                "silver": "#c0c0c0",
                "bronze": "#cd7f32",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-outfit)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "holo-foil": "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 25%, transparent 30%, transparent 45%, rgba(255,255,255,0.4) 50%, transparent 55%, transparent 70%, rgba(255,255,255,0.4) 75%, transparent 80%)",
                "rainbow-gradient": "linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)",
            },
            dropShadow: {
                "glow": "0 0 10px rgba(0, 198, 255, 0.5)",
                "glow-gold": "0 0 15px rgba(255, 215, 0, 0.6)",
                "xl": "0 20px 25px rgba(0, 0, 0, 0.5)",
            },
            animation: {
                "holofoil": "holofoil 3s ease infinite",
                "fade-in-up": "fade-in-up 0.5s ease-out forwards",
            },
            keyframes: {
                holofoil: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
