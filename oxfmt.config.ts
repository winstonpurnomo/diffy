import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  sortTailwindcss: {
    stylesheet: "packages/ui/src/styles/globals.css",
    functions: ["cn", "cva"],
  },
  ignorePatterns: [
    "**/*.gen.{js,jsx,ts,tsx}",
    "worker-configuration.d.ts",
    "**/_generated/**/*.{js,jsx,ts,tsx}",
    "dist",
    "node_modules",
    ".turbo",
    ".output",
    ".nitro",
    ".tanstack",
    ".vinxi",
    "coverage",
    "pnpm-lock.yaml",
    ".pnpm-store",
  ],
});
