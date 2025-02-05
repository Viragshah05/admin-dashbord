import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      worker_threads: false,
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
