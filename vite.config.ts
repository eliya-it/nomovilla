import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import image from "@rollup/plugin-image";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), image()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hoc": path.resolve(__dirname, "src/hoc"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@common": path.resolve(__dirname, "src/components/common"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@actions": path.resolve(__dirname, "src/actions"),
    },
  },
});
