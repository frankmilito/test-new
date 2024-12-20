import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // dts({
    //   insertTypesEntry: true, // Generates a `package.json` entry for types
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/app/components"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "SafiyoSDK",
      fileName: (format) => `safiyo-sdk.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
