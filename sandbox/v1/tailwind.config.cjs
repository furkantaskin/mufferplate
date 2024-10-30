const plugin = require('tailwindcss/plugin');

const IS_MOBILE_FIRST = false;
let containerName = ['.container'];
const customConfig = {
  colNumber: 12,
  gridGutter: 24,
  percentPrecision: 5,
  containerPadding: true,
  hasRtl: false,
  screens: {
    mobileFirstBreakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    desktopFirstBreakpoints: {
      xl: { max: '1399px' },
      lg: { max: '1199px' },
      md: { max: '991px' },
      sm: { max: '767px' },
      xs: { max: '575px' },
    },
    bsBreakpoints: {},
  },
  container: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px',
  },
  customSelectors: {
    '.row': {
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.row > *': {
      width: '100%',
      flex: 'none',
    }
  },
};

customConfig.customSelectors['.row > *'][customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft'] = `${customConfig.gridGutter / 2}px`;
customConfig.customSelectors['.row > *'][customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight'] = `${customConfig.gridGutter / 2}px`;

const customContainer = {};

if (customConfig.containerPadding) {
  customConfig.container.padding = `${customConfig.gridGutter / 2}px`;
}

customConfig.customSelectors['.row'][
  `${customConfig.hasRtl ? 'marginInlineStart' : 'marginLeft'}`
] = `-${customConfig.gridGutter / 2}px`;
customConfig.customSelectors['.row'][
  `${customConfig.hasRtl ? 'marginInlineEnd' : 'marginRight'}`
] = `-${customConfig.gridGutter / 2}px`;

Object.keys(customConfig.screens.mobileFirstBreakpoints).forEach(
  (key) => {
    containerName.push(`.container-${key}`);
    let currKey = containerName.join(',');
    customConfig.screens.bsBreakpoints[`bs-${key}`] =
      customConfig.screens.mobileFirstBreakpoints[key];
    customContainer[currKey] = {};
    customContainer[currKey][
      `@media (min-width: ${customConfig.screens.mobileFirstBreakpoints[key]})`
    ] = {
      maxWidth: customConfig.container[key],
      [customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft']: customConfig.containerPadding ? customConfig.container.padding : 0,
      [customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight']: customConfig.containerPadding ? customConfig.container.padding : 0,
    };
  }
);

function createBsGrid() {
  const COL_NUMBER = customConfig.colNumber;
  const GRID_GUTTER = customConfig.gridGutter;
  const PRECISION = customConfig.percentPrecision;
  const obj = {};
  for (let i = 0; i <= COL_NUMBER; i++) {
    const key = `.col-${i}`;
    const value = (i / COL_NUMBER) * 100;
    obj[key] = {
      flex: '0 0 auto',
      width: `${
        value.toFixed(PRECISION) % 1 === 0
          ? Math.trunc(value)
          : value.toFixed(PRECISION)
      }%`,
      [`${
        customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft'
      }`]: `${GRID_GUTTER / 2}px`,
      [`${
        customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight'
      }`]: `${GRID_GUTTER / 2}px`,
    };
  }
  return obj;
}

function createBsOffset() {
  const COL_NUMBER = customConfig.colNumber;
  const PRECISION = customConfig.percentPrecision;
  const obj = {};
  for (let i = 0; i < COL_NUMBER; i++) {
    const key = `.offset-${i}`;
    const value = (i / COL_NUMBER) * 100;
    obj[key] = !customConfig.hasRtl
      ? {
          'margin-left': `${
            value.toFixed(PRECISION) % 1 === 0
              ? Math.trunc(value)
              : value.toFixed(PRECISION)
          }%`,
        }
      : {
          'margin-inline-start': `${
            value.toFixed(PRECISION) % 1 === 0
              ? Math.trunc(value)
              : value.toFixed(PRECISION)
          }%`,
        };
  }
  return obj;
}

function generateZIndex() {
  let zIndexObj = {
    zIndex: {},
  };
  for (let i = 1; i <= 12; i++) {
    zIndexObj.zIndex[i.toString()] = i.toString();
  }
  return zIndexObj.zIndex;
}

function generateSpacing() {
  const SPACER = 2;
  const SPACER_LIMIT = 200;
  let spacing = {};
  spacing['px'] = '1';
  for (let i = 0; i <= SPACER_LIMIT; i++) {
    spacing[(i / 2).toString()] = `${i * SPACER}px`;
  }
  return spacing;
}

/** @type {import('tailwindcss').Config} */
const twConfig = {
  experimental: {
    optimizeUniversalDefaults: false,
  },
  corePlugins: {
    container: false,
  },
  content: [
    'index.php',
    './theme/**/*.{html,js,php}',
    './inc/*.{html,js,php}',
  ],
  theme: {
    screens: {
      ...customConfig.screens[
        IS_MOBILE_FIRST
          ? 'mobileFirstBreakpoints'
          : 'desktopFirstBreakpoints'
      ],
      ...customConfig.screens.bsBreakpoints,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
    },
    transitionDuration: {
      DEFAULT: '300ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'ease',
    },
    spacing: generateSpacing(),
    extend: {
      zIndex: generateZIndex(),
      spacing: {
        'container-margin': 'var(--container-margin)',
        'container-width': 'var(--container-width)',
        'gutter-width': 'var(--gutter-width)',
        'column-width': 'var(--column-width)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      
      addUtilities({
        '.row': {
          ...customConfig.customSelectors['.row'],
        },
        '.row > *': {
          ...customConfig.customSelectors['.row > *'],
        },
      });
      addUtilities(createBsGrid());
      addUtilities(createBsOffset());
      addComponents({
        '.container': {
          width: '100%',
          [`${
            customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft'
          }`]: customConfig.gridGutter / 2,
          [`${
            customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight'
          }`]: customConfig.gridGutter / 2,
          [`${
            customConfig.hasRtl ? 'marginInlineStart' : 'marginLeft'
          }`]: 'auto',
          [`${
            customConfig.hasRtl ? 'marginInlineEnd' : 'marginRight'
          }`]: 'auto',
        },
      });
      addComponents({
        ...customContainer,
      });
    }),
  ],
};

module.exports = twConfig;
