const plugin = require('tailwindcss/plugin');

const IS_MOBILE_FIRST = false;
const customConfig = {
  colNumber: 12,
  gridGutter: 24,
  percentPrecision: 5,
  hasRtl: false,
  screens: {
    mobileFirstBreakpoints: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px',
    },
    desktopFirstBreakpoints: {
      'xl': {'max': '1399px'},
      'lg': {'max': '1199px'},
      'md': {'max': '991px'},
      'sm': {'max': '767px'},
      'xs': {'max': '575px'},
    },
    bsBreakpoints: {
      'bs-sm': '576px',
      'bs-md': '768px',
      'bs-lg': '992px',
      'bs-xl': '1200px',
      'bs-xxl': '1400px',
    }
  },
  container: {
    center: true,
    screens: {
      xs: "100%",
      sm: "100%",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      default: "1320px"
    }
  },
}

customConfig.container.padding = `${customConfig.gridGutter / 2}px`;

function createBsGrid() {
  const COL_NUMBER = customConfig.colNumber;
  const GRID_GUTTER = customConfig.gridGutter;
  const PRECISION = customConfig.percentPrecision;
  const obj = {};
  for (let i = 1; i <= COL_NUMBER; i++) {
    const key = `.col-${i}`;
    const value = (i / COL_NUMBER) * 100;
    obj[key] = {
      flex: "0 0 auto",
      width: `${
        value.toFixed(PRECISION) % 1 === 0 ? Math.trunc(value) : value.toFixed(PRECISION)
      }%`,
      padding: `0 ${GRID_GUTTER / 2}px`,
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
    obj[key] = !customConfig.hasRtl ? {
      "margin-left": `${
        value.toFixed(PRECISION) % 1 === 0 ? Math.trunc(value) : value.toFixed(PRECISION)
      }%`,
    } : 
    {
      "margin-inline-start": `${
        value.toFixed(PRECISION) % 1 === 0 ? Math.trunc(value) : value.toFixed(PRECISION)
      }%`,
    };
  }
  return obj;
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental:{
    optimizeUniversalDefaults: true
  },
  content: ["index.html", "./theme/**/*.{html,js,php}"],
  theme: {
    screens: {
      ...customConfig.screens[IS_MOBILE_FIRST ? 'mobileFirstBreakpoints' : 'desktopFirstBreakpoints'],
      ...customConfig.screens.bsBreakpoints,
    },
    container: customConfig.container,
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(createBsGrid());
      addUtilities(createBsOffset());
      addUtilities({
        ".row": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -0.5rem",
        },
      });
    })
  ],
}