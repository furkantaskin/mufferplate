import { createRequire } from 'node:module';

import theme from 'tailwindcss/defaultTheme';

import config from './config';

import type { zIndexType, spacingType, DefineConfig } from './types';
import type {
  ResolvableTo,
  ScreensConfig,
} from 'tailwindcss/types/config';


const require = createRequire(import.meta.url);

const defaultColors = require('tailwindcss/colors');



// Varsayılan sistemle beraber özel z-index oluşturma
export function generateZIndex(): zIndexType {
  let zIndex: zIndexType = {};
  for (let i = 1; i <= config.zIndexLimit; i++) {
    zIndex[i.toString()] = i.toString();
  }
  return { ...theme.zIndex, ...zIndex };
}


// Margin, padding, gap gibi boşluk birimlerini daha detaylı çıkarmak için özel fonksiyon
export function generateSpacing() {
  const SPACER = config.spacingInterval;
  const SPACER_LIMIT = config.spacingUpperLimit;
  let spacing: spacingType = {};
  for (let i = 0; i <= SPACER_LIMIT; i++) {
    spacing[(i / SPACER).toString()] = `${(i * SPACER) / 16}${
      i === 0 ? 'px' : 'rem'
    }`;
  }
  const cssVariables = {
    column: 'var(--column-width)',
    gutter: 'var(--gutter-width)',
    container: 'var(--container-width)',
    'container-margin': 'var(--container-margin)',
  };
  return { ...theme.spacing, ...spacing, ...cssVariables };
}

interface ColorInput {
  [key: string]: string;
}

interface ColorOutput {
  [key: string]: {
    DEFAULT: string;
  };
}


// Tailwind'in eski renklerini silmek ve özel renkleri tanımlamak için
function transformColorObject(colors: ColorInput): ColorOutput {
  return Object.entries(colors).reduce<ColorOutput>(
    (acc, [key, value]) => {
      acc[key] = { DEFAULT: value };
      return acc;
    },
    {}
  );
}

export function generateColors() {
  let customColors = transformColorObject(config.customColors);

  if ((config as DefineConfig).disableDefaultColors === true) {
    return {
      ...customColors,
      white: { DEFAULT: '#ffffff' },
      black: { DEFAULT: '#000000' },
      transparent: 'transparent',
      current: 'currentColor',
    };
  }


  delete defaultColors.lightBlue;
  delete defaultColors.warmGray;
  delete defaultColors.trueGray;
  delete defaultColors.coolGray;
  delete defaultColors.blueGray;

  return {
    ...defaultColors,
    ...customColors,
  };
}


// Mobile-first ve desktop-first durumlarına müdahale edebilmek için
export function generateBreakPoints(
  isMobileFirst: boolean = config.isMobileFirst
) {
  let breakPoints: ResolvableTo<ScreensConfig> = {};
  const keyList = Object.keys(config.breakpoints);

  if (isMobileFirst === true) {
    keyList.forEach((key) => {
      breakPoints[key] = `${
        config.breakpoints[key as keyof typeof config.breakpoints]
      }px`;
    });
  } else {
    const keyList = Object.keys(config.breakpoints);
    keyList.forEach((key, index) => {
      if (index !== keyList.length - 1) {
        breakPoints[key] = {
          max: `${
            Number(
              config.breakpoints[
                keyList[index + 1] as keyof typeof config.breakpoints
              ]
            ) - 1
          }px`,
        };
      }
    });
  }

  return breakPoints;
}


// Font ailesini güncellemek için
export function generateFontFamily(){
  const defaultFont = {'sans': [config.fontFamily, ...theme.fontFamily.sans]}

  return {...theme.fontFamily, ...defaultFont};
}