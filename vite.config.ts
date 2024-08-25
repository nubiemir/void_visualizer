import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "solid-js/h",
      }),
    },
    solid({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
});
