import { defineConfig } from "astro/config";

// For GitHub Pages set these two, then run `npm run build`.
//   SITE  = https://<user>.github.io
//   BASE  = /<repo-name>
// A custom domain uses SITE = https://menu.example.com and BASE = /
const SITE = process.env.SITE ?? "https://example.github.io";
const BASE = process.env.BASE ?? "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },
  compressHTML: true,
});
