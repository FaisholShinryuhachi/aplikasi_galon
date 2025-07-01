import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load .env Laravel
dotenv.config();

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/src/index.jsx"],
            refresh: true,
        }),
        react(),
    ],
    define: {
        "process.env": process.env, // Tambahkan ini untuk mendefinisikan variabel environment
    },
    // esbuild: {
    //     loader: "jsx", // Tambahkan loader ini
    //     include: [/\.js$/], // Tentukan bahwa file .js juga diproses sebagai JSX
    // },
});
