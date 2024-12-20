import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      brotliSize: true,
      gzipSize: true,
      open: true,
      template: "treemap",
    }),
  ],
});
