// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react"; 
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [
    prefetch(),
    react(), 
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

