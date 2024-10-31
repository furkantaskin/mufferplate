import path from "node:path";
import process from "node:process";
import fs from "node:fs";

import { defineConfig } from "@rsbuild/core";
import { pluginSass } from "@rsbuild/plugin-sass";
import { BannerPlugin } from "@rspack/core";

import * as sass from "sass-embedded";
import tailwindcss from "tailwindcss";

// Constants
const BANNER = `/*!\n**********\n\n${new Date().toLocaleDateString()}\nMade with mufferplate\nVisit: https://github.com/furkantaskin/mufferplate process.env.PUBLIC_VER \n\n**********\n!*/`;

export default defineConfig(({ env }) => {
  const isDev = env === "development";
  const getEnv = { dev: isDev.toString() };
  fs.writeFile(
    path.join(process.cwd(), "./env.json"),
    JSON.stringify(getEnv),
    { flag: "w+" },
    (err) => {
      if (err) {
        console.log("Error while writing to file:", err.stack);
      }
    }
  );
  return {
    source: {
      alias: {
        getCss: path.resolve(process.cwd(), "src/css"),
        getThemeImg: path.resolve(process.cwd(), "theme/assets/img"),
      },
      entry: {
        main: "./src/main.ts",
        form: "./src/form.ts",
      },
    },
    output: {
      cleanDistPath: false,
      filenameHash: false,
      legalComments: isDev ? "none" : "inline",
      sourceMap: {
        js: isDev ? "source-map" : false,
        css: !isDev,
      },
      distPath: {
        css: "css",
        js: "js",
        root: "./theme/assets",
      },
    },
    dev: {
      client: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
      },
    },
    tools: {
      htmlPlugin: isDev ? {} : false,
      postcss: {
        postcssOptions: {
          plugins: [tailwindcss],
        },
      },
      rspack: {
        plugins: [
          new BannerPlugin({
            banner: BANNER,
            entryOnly: true,
            raw: true,
          }),
        ],
      },
    },
    plugins: [
      pluginSass({
        sassLoaderOptions: {
          api: "modern-compiler",
          sassOptions: {
            loadPaths: [path.resolve(process.cwd(), "src/css")],
            quietDeps: true,
            silenceDeprecations: ["import"],
            importers: [new sass.NodePackageImporter()],
          },
        },
      }),
    ],
  };
});
