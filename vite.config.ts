import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { codecovVitePlugin } from "@codecov/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/mouse-training" : "/",
  plugins: [
    react(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "mouse-training",
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  test: {
    environment: "happy-dom",
    setupFiles: "./setupTests.ts",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/*.mjs",
        "tailwind.config.ts",
        "src/constants",
        "src/types",
        "src/mocks",
        "src/main.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
