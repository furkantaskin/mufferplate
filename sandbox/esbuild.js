import esbuild from "esbuild";
import process from "node:process";


const isDev = process.argv[2] === "dev";

esbuild
    .build({
      entryPoints: ["./m_src/main_mufferplate.ts"],
      outfile: "./dist/mufferplate.js",
      logLevel: "info",
      bundle: true,
      sourcemap: isDev ? "inline" : false,
      minify: !isDev,
      splitting: false,
      format: "esm",
      target: ["esnext"],
      platform: "node",
      packages: "external",
      tsconfig: "./tsconfig.json",
      charset: 'utf8',
    })
    .catch(() => process.exit(1));
