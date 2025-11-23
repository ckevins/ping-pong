import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // dev server settings (proxy local API requests to backend running on port 3000)
  server: {
    proxy: {
      // forward /api/* to http://localhost:3000/*
      // remove the /api prefix before forwarding (adjust rewrite if your backend expects it)
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true,
      },
    },
  },
});
