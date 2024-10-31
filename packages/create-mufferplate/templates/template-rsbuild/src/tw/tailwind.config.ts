import { globSync } from "fast-glob";
import type { Config } from "tailwindcss";

import {
  generateZIndex,
  generateSpacing,
  generateBreakPoints,
  generateColors,
  generateFontFamily,
} from "./utils/overrides";
import { mufferplatePlugins } from "./utils/plugins";

export default {
  content: globSync([
    "./src/js/*.js",
    "./theme/*.php",
    "./inc/*.php",
    "*.php",
    "./theme/templates/*.php",
  ]),
  corePlugins: {
    container: false,
  },
  theme: {
    zIndex: generateZIndex(),
    spacing: generateSpacing(),
    screens: generateBreakPoints(),
    colors: generateColors(),
    fontFamily: generateFontFamily(),
  },
  plugins: [...mufferplatePlugins],
} satisfies Config;
