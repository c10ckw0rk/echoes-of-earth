import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import * as path from "path";

export default defineConfig(() => {
  return {
    base: "",
    root: "src",
    plugins: [tsconfigPaths()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: process.env.BROWSER_OPEN !== "false" ? "/" : undefined,
    },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@scene': path.resolve(__dirname, './src/scene'),
    },
  },
    clearScreen: false,
    build: {
      assetsDir: ".",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
        },
        output: {
          dir: "build",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
