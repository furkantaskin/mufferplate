import esbuild from "esbuild";
import process from "node:process";
import fs from "node:fs";
import path from "node:path";

const isDev = process.argv[2] === "dev";
const srcPath = path.join(process.cwd(), "/dist/mufferplate.js");
const targetPath = path.join(
  process.cwd(),
  "../packages/mufferplate/bin/mufferplate.js"
);

if (process.argv[2] === "publish") {
  fs.copyFile(srcPath, targetPath, (err) => {
    if (err) {
      console.log("Error occurred:", err);
    } else {
      console.log("Dist file updated");
    }
  });
} else {
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
      charset: "utf8",
    })
    .catch(() => process.exit(1));
}
