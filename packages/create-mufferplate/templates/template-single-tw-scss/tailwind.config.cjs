const plugin = require('tailwindcss/plugin');


const IS_MOBILE_FIRST = false;
let containerName = [".container"];
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
    bsBreakpoints: {},
  },
  container: {
    'sm': '540px',
    'md': '720px',
    'lg': '960px',
    'xl': '1140px',
    'xxl': '1320px',
  },
  customSelectors: {
    ".row": {
      display: "flex",
      flexWrap: "wrap",
    },

  }
};

const customContainer = {
}

customConfig.container.padding = `${customConfig.gridGutter / 2}px`;
customConfig.customSelectors[".row"][`${customConfig.hasRtl ? 'marginInlineStart': 'marginLeft'}`] = `-${customConfig.gridGutter / 2}px`;
customConfig.customSelectors[".row"][`${customConfig.hasRtl ? 'marginInlineEnd': 'marginRight'}`] = `-${customConfig.gridGutter / 2}px`;

Object.keys(customConfig.screens.mobileFirstBreakpoints).forEach((key) => {
  let currKey = containerName.join(",");
  customConfig.screens.bsBreakpoints[`bs-${key}`] = customConfig.screens.mobileFirstBreakpoints[key];
  customContainer[currKey] = {}
  customContainer[currKey][`@media (min-width: ${customConfig.screens.mobileFirstBreakpoints[key]})`] = {
    maxWidth: customConfig.container[key],
  };
  containerName.push(`.container-${key}`);
});



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
      [`${customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft'}`]: `${GRID_GUTTER / 2}px`,
      [`${customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight'}`]: `${GRID_GUTTER / 2}px`,
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
const twConfig = {
  experimental:{
    optimizeUniversalDefaults: true
  },
  corePlugins: {
    container: false
  },
  content: ["index.php", "./src/js/**/*.js", "./theme/**/*.{html,js,php}", "./inc/*.{html,js,php}"],
  theme: {
    screens: {
      ...customConfig.screens[IS_MOBILE_FIRST ? 'mobileFirstBreakpoints' : 'desktopFirstBreakpoints'],
      ...customConfig.screens.bsBreakpoints,
    },
    colors: {
      'transparent': "transparent",
      'current': "currentColor",
      'black': "#000",
      'white': "#fff",
      'primary': '#e256c5',
      'blue': '#007bff',
    },
    extend: {
      spacing: {
        'container-margin': 'var(--container-margin)',
        'container-width': 'var(--container-width)',
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents}) {
      addUtilities(createBsGrid());
      addUtilities(createBsOffset());
      addUtilities({
        ".row": {
          ...customConfig.customSelectors[".row"]
        }
      });
      addComponents({
        ".container": {
          width: "100%",
          [`${customConfig.hasRtl ? 'paddingInlineStart' : 'paddingLeft'}`]: customConfig.container.padding,
          [`${customConfig.hasRtl ? 'paddingInlineEnd' : 'paddingRight'}`]: customConfig.container.padding,
          [`${customConfig.hasRtl ? 'marginInlineStart' : 'marginLeft'}`]: "auto",
          [`${customConfig.hasRtl ? 'marginInlineEnd' : 'marginRight'}`]: "auto",
        }
      })
      addComponents({
        ...customContainer
      })
    })
  ]
};


module.exports = twConfig;