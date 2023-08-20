import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                sm: "1.25rem",
                md: "2.185rem",
                lg: "3.125rem",
            },
            colors: {
                "blue-2": "#263146",
                "blue-4": "#AEB9D2",
                "blue-5": "#D6E1FA",
                "blue-6": "#4C5576",
                "blue-7": "#22304D",
                "accent-green": "#11F4D1",
            },
            fontSize: {
                15: "0.9375rem",
            },
            height: {
                15: "3.75rem",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
export default config;
