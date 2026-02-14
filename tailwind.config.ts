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
            },
            animation: {
                "holofoil": "holofoil 3s ease infinite",
            },
            keyframes: {
                holofoil: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
