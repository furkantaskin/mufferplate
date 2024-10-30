// Node Importers
import fs from "node:fs";
import process from "node:process";
import path from "node:path";

// 3-rd Party Importers
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import * as sass from "sass-embedded";

// Constants
const BANNER = `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate\nVisit: https://github.com/furkantaskin/mufferplate\n\n**********\n!*/`;

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const getEnv = { dev: isDev.toString() };
  fs.writeFileSync(
    path.join(process.cwd(), "./env.json"),
    JSON.stringify(getEnv)
  );
  return {
    resolve: {
      alias: {
        getCss: path.resolve(process.cwd(), "src/css"),
        getThemeImg: path.resolve(process.cwd(), "theme/assets/img")
      },
    },
    build: {
      minify: !isDev,
      sourcemap: isDev ? 'inline' : false,
      outDir: "theme",
      emptyOutDir: false,
      assetsDir: "js/chunks",
      cssMinify: isDev ? false : 'lightningcss',
      rollupOptions: {
        input: {
          main: "src/main.ts",
          form: "src/form.ts",
        },
        output: {
          banner: !isDev ? BANNER : undefined,
          entryFileNames: "js/[name].js",
          assetFileNames: "css/[name].[ext]",
          dir: "theme/assets",
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
      preprocessorOptions: {
        scss: {
          api: "modern",
          loadPaths: [path.resolve(process.cwd(), "src/css")],
          quietDeps: true,
          silenceDeprecations: ["import"],
          output: {
            charset: true,
          },
          importers: [new sass.NodePackageImporter()],
        },
      },
    },
  };
});
