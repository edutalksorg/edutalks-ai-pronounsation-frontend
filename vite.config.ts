import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 5173, // change this to any free port, e.g. 5174 if 5173 is used
  },
  plugins: [react()],
=======
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
});
=======
}));
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
