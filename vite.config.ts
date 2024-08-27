import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })],
});
