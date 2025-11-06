// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // loads VITE_*
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // enables "@/..."
      },
    },
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
      proxy: {
        "/api/v1": {
          target: env.VITE_API_URL, // https://edutalks-backend...
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
