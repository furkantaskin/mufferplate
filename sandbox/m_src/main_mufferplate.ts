/* Node Modules */
import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import util from "util";

/* 3rd Party Modules */
import pc from "picocolors";
import { cac } from "cac";

/* Custom Modules */
import { logResult } from "./lib/io_functions.js";
import { CONFIG_FILE_LIST, ROOT_DIR } from "./lib/constants.js";
import { devSass, buildSass } from "./lib/sass_functions.js";
import { buildTailwind, devTailwind } from "./lib/tw_functions.js";
import { devJs, buildJs } from "./lib/js_functions.js";
import { validArgs, userConfig } from "./lib/globals.js";
import { purgeCss } from "./lib/purge_functions.js";

/* Types */
import type {
  UserConfig,
  UserJsOptions,
  UserSassOptions,
  UserTwConfig,
} from "./types/types.js";

const cli = cac("mufferplate");

type ArgsType = "js" | "sass" | "tailwind";
let processType: ArgsType;

let customConfig: UserConfig = {};

console.clear();
console.log(pc.green("🗲    MUFFERPLATE    🗲\n"));

async function readConfig(customPath: string = "") {
  let getPath = customPath || "";
  if (getPath) getPath = path.resolve(ROOT_DIR, getPath);
  let isExist = customPath || false;
  if (!getPath) {
    for (const filename of CONFIG_FILE_LIST) {
      getPath = path.resolve(ROOT_DIR, filename);
      if (!fs.existsSync(getPath)) {
        getPath = path.resolve(ROOT_DIR, "mf_config", filename);
        if (!fs.existsSync(getPath)) continue;
      }
      isExist = true;
      break;
    }
  }

  console.log("Using config file: ", pc.yellow(getPath));
  if (isExist) {
    const userConfig = await import(`file://${getPath}`);
    customConfig = await userConfig.default;
  } else {
    logResult(`No config file found. Using default config`, "info");
  }
  return customConfig;
}

cli
  .command(
    "[...root]",
    "Run mufferplate in development mode. You can use 'tailwind' 'js' and 'sass' as main arguments. Single argument will run the bundler for the specified type ('js' for only JavaScript bundling, 'tailwind' for running Tailwind alone etc.)"
  )
  .alias("dev")
  .option("--use-scss", "Use SCSS precompile with tailwind")
  .option("--config <path>", "Custom config file location")
  .action(async (root: string[], options) => {
    const getConfig = await readConfig(options.config);

    console.log("Running under development mode.");

    const devCliTriggers = {
      js: async () => devJs({ ...getConfig.js } as UserJsOptions),
      sass: async () => devSass({ ...getConfig.sass } as UserSassOptions),
      tailwind: {
        plain: async () =>
          devTailwind({ ...getConfig.tailwind } as UserTwConfig, false),
        sass: async () => {
          devTailwind(
            { useScss: true, ...getConfig.tailwind } as UserTwConfig,
            true
          );
        },
      },
    };

    if (!root.length) {
      if (getConfig.tailwind?.enable && getConfig.sass?.enable) {
        logResult(
          `Cannot use Sass and Tailwind together. If you want to use Tailwind as default with Sass, please change useCss to true in tailwind and disable sass in config file`,
          "error"
        );
        process.exit(1);
      }
      Object.keys(getConfig).forEach(async (key: string) => {
        const readKey: ArgsType = key as ArgsType;
        if (getConfig[readKey as ArgsType]?.enable) {
          if (readKey === "tailwind") {
            if (options.useScss) {
              await devCliTriggers[readKey].sass();
            } else {
              await devCliTriggers[readKey].plain();
            }
          } else {
            await devCliTriggers[readKey]();
          }
        }
      });
    } else {
      root.forEach((arg) => {
        if (!validArgs.has(arg)) {
          logResult(`Invalid argument: ${pc.yellow(arg)}`, "error");
          process.exit(1);
        }
      });
      if (root.includes("tailwind") && root.includes("sass")) {
        logResult(
          `Cannot use Sass and Tailwind together. If you want to use Tailwind as default with Sass, please use --use-scss flag`,
          "error"
        );
        process.exit(1);
      } else {
        root.forEach(async (key: string) => {
          const readKey: "js" | "sass" | "tailwind" = key as
            | "js"
            | "sass"
            | "tailwind";
          if (readKey === "tailwind") {
            if (options.useScss) {
              await devCliTriggers[readKey].sass();
            } else {
              await devCliTriggers[readKey].plain();
            }
          } else {
            await devCliTriggers[readKey]();
          }
        });
      }
    }
  });

cli
  .command("build [...root]", "Build your project")
  .option("--config <path>", "Custom config file location")
  .option("--use-scss", "Use scss with tailwind")
  .action(async (root: string[], options) => {
    const getConfig = await readConfig(options.config);
    const keys = Object.keys(getConfig) as ("js" | "sass" | "tailwind")[];
    console.log("Running under production mode\n");

    const buildCliTriggers = {
      js: async () => await buildJs({ ...getConfig.js } as UserJsOptions),
      sass: async () =>
        await buildSass({ ...getConfig.sass } as UserSassOptions),
      tailwind: {
        plain: async () =>
          await buildTailwind({ ...getConfig.tailwind } as UserTwConfig, false),
        sass: async () => {
          await buildTailwind(
            {
              ...getConfig.tailwind,
            } as UserTwConfig,
            true
          );
        },
      },
    };

    if (!root.length) {
      if (getConfig.tailwind?.enable && getConfig.sass?.enable) {
        logResult(
          `Cannot use Sass and Tailwind together. If you want to use Tailwind as default with Sass, please change useCss to true in tailwind and disable sass in config file`,
          "error"
        );
        process.exit(1);
      }
      for (const readKey of keys) {
        if (getConfig[readKey]?.enable) {
          if (readKey === "tailwind") {
            if (options.useScss) {
              await buildCliTriggers[readKey].sass();
            } else {
              await buildCliTriggers[readKey].plain();
            }
          } else {
            await buildCliTriggers[readKey]();
          }
        }
      }
    } else {
      root.forEach((arg) => {
        if (!validArgs.has(arg)) {
          logResult(`Invalid argument: ${pc.yellow(arg)}`, "error");
          process.exit(1);
        }
      });

      if (root.includes("tailwind") && root.includes("sass")) {
        logResult(
          `Cannot use Sass and Tailwind together. If you want to use Tailwind as default with Sass, please use --use-scss flag`,
          "error"
        );
        process.exit(1);
      } else {
        for (const readKey of root) {
          if (readKey === "tailwind") {
            if (options.useScss) {
              await buildCliTriggers[readKey].sass();
            } else {
              await buildCliTriggers[readKey].plain();
            }
          } else {
            // @ts-ignore
            await buildCliTriggers[readKey as ArgsType]();
          }
        }
      }
    }

    if (root.includes("tailwind") && root.includes("sass")) {
      logResult(
        `Cannot use Sass and Tailwind together. If you want to use Tailwind as default with Sass, please use --use-scss flag`,
        "error"
      );
      process.exit(1);
    }
  });

cli
  .command("purge [...root]", "Purge the CSS file (use it for Sass)")
  .action(async (root: string[], options) => {
    const getConfig = await readConfig(options.config);
    await purgeCss(getConfig.purge);
  });

cli
  .command("init", "Initialize the configuration file")
  .action(async (options) => {
    let tempConfig = userConfig;
    let configResult = util.inspect(tempConfig, {showHidden: false, depth: null}).replace("[Function: defaultExtractor]", "(content) => content.match(/[\w-/:.-]+/g) || []");
    console.log(pc.magenta("Generating config file"));
    try {
      fs.writeFileSync(
        path.join(ROOT_DIR, "mufferplate.config.js"),
        "/** @type {import('mufferplate').MufferConfig} */\n" +
          "export default " +
          configResult
      );
      logResult("Config file generated successfully.", "success");
    } catch (e) {
      logResult(
        `"An error occurred while generating the config file: ${e}"`,
        "error"
      );
    }
  });
cli.help();
cli.parse();
