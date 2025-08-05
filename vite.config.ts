/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import dts from "vite-plugin-dts";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), dts({
    insertTypesEntry: true,
    root: "src",
    outDir: "dist",
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mrpayment-sdk",
      formats: ["es", "umd"],
      fileName: (format) => `mrpayment-sdk.${format}.js`,
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
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
	},
});
