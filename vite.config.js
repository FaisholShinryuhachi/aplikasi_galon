import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/src/index.jsx"],
            refresh: true,
        }),
        react(),
    ],
    // esbuild: {
    //     loader: "jsx", // Tambahkan loader ini
    //     include: [/\.js$/], // Tentukan bahwa file .js juga diproses sebagai JSX
    // },
});
