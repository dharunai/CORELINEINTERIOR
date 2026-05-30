import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlifyPlugin from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { 
        preset: "netlify",
        entry: "src/server.ts" 
      },
    }),
    netlifyPlugin(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
