import plugin from 'tailwindcss/plugin';
import config from './config';

import type { CustomTwComponent, ResponsiveKeys } from './types';

const PX_TO_REM = 16;


// Generate bootstrap grid system's column wrapepr elem
export const rowElem: CustomTwComponent = {
  '.row': {
    display: 'flex',
    [config.enableRtl ? 'marginInlineStart' : 'marginLeft']: `${
      config.gridGutter / -2 / PX_TO_REM
    }rem`,
    [config.enableRtl ? 'marginInlineEnd' : 'marginRight']: `${
      config.gridGutter / -2 / PX_TO_REM
    }rem`,
    'flex-wrap': 'wrap',
    'row-gap': `${config.gridGutter / PX_TO_REM}rem`,
  },
  '.row > *': {
    flexShrink: '0',
    width: '100%',
    maxWidth: '100%',
    [config.enableRtl ? 'paddingInlineStart' : 'paddingLeft']: `${
      config.gridGutter / 2 / PX_TO_REM
    }rem`,
    [config.enableRtl ? 'paddingInlineEnd' : 'paddingRight']: `${
      config.gridGutter / 2 / PX_TO_REM
    }rem`,
  },
  '.row-np': {
    [config.enableRtl ? 'marginInlineStart' : 'marginLeft']: '0',
    [config.enableRtl ? 'marginInlineEnd' : 'marginRight']: '0',
  },
};


// Generate bootstrap columns
export const generateColumns = [
  ...Array(config.numberOfColumns).keys(),
].map((elem) => {
  return {
    [`.col-${elem + 1}`]: {
      flex: '0 0 auto',
      width: `${(((elem + 1) / config.numberOfColumns) * 100).toFixed(5)}%`,
    },
  };
});


// Generate bootstrap column offsets
export const generateOffsets = [
  ...Array(config.numberOfColumns).keys(),
].map((elem) => {
  return {
    [`.offset-${elem}`]: {
      marginLeft: `${((elem / config.numberOfColumns) * 100).toFixed(5)}%`,
    },
  };
});

const container: any = {};
let containerName = ['.container'];

const getBreakPoints = structuredClone(config.breakpoints);
const bsBreakpoints: { [key: `bs-${ResponsiveKeys}`]: string } = {};

const {
  breakpoints,
  containerMaxWidths,
  numberOfColumns,
  gridGutter,
} = config;

// Generate contaienr breakpoints and max width according to the current breakpoint
Object.keys(config.breakpoints).forEach((key) => {
  containerName.push(`.container-${key}`);
  let currKey = containerName.join(',');
  bsBreakpoints[`bs-${key}`] =
    getBreakPoints[key as keyof typeof config.breakpoints];
  container[currKey] = {};
  container[currKey][
    `@media (min-width: ${
      config.breakpoints[key as keyof typeof config.breakpoints]
    }px)`
  ] = {
    maxWidth:
      config.containerMaxWidths[
        key as keyof typeof config.containerMaxWidths
      ],
  };
});

const defaultContainer = {
  '.container': {
    width: '100%',
    [`${config.enableRtl ? 'marginInlineStart' : 'marginLeft'}`]:
      'auto',
    [`${config.enableRtl ? 'marginInlineEnd' : 'marginRight'}`]:
      'auto',
    [config.enableRtl ? 'paddingInlineEnd' : 'paddingRight']: `${
      config.gridGutter / 2 / PX_TO_REM
    }rem`,
    [config.enableRtl ? 'paddingInlineStart' : 'paddingLeft']: `${
      config.gridGutter / 2 / PX_TO_REM
    }rem`,
  },
};

const pxToNumber = (px: string) => parseInt(px.replace('px', ''));

const calculateColumnWidth = (containerWidth: string | number) => {
  if (typeof containerWidth === 'number') {
    return `${containerWidth / numberOfColumns}px`;
  }
  return `${pxToNumber(containerWidth) / numberOfColumns}px`;
};


// Generate CSS variables to use as utility classes
const baseStyles = {
  ':root': {
    '--column-width': calculateColumnWidth(0),
    '--container-width': '100vw',
    '--container-margin': '0',
    '--gutter-width': gridGutter.toString(),
  },
};

const mediaQueryStyles = Object.entries(breakpoints).reduce(
  (acc, [key, breakpoint]) => {
    if (parseInt(breakpoint) === 0) return acc;

    const containerWidth =
      containerMaxWidths[key as keyof typeof containerMaxWidths];

    return {
      ...acc,
      [`@media (min-width: ${breakpoint}px)`]: {
        ':root': {
          '--column-width': calculateColumnWidth(
            containerWidth === false ? 0 : containerWidth
          ),
          '--container-width': `${containerWidth}px`,
          '--container-margin': `calc((100vw - ${containerWidth}px) / 2)`,
          '--gutter-width': gridGutter.toString(),
        },
      },
    };
  },
  {}
);


// Generate custom classes to boost
const customClasses = {
  ".flex-center": {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}


export const mufferplatePlugins = [
  plugin(({ addComponents, addUtilities, addBase }) => {
    addComponents(rowElem);
    addUtilities(generateColumns);
    addUtilities(generateOffsets);
    addComponents(container);
    addComponents(defaultContainer);
    addUtilities(customClasses);
    addBase(baseStyles);
    addBase(mediaQueryStyles);
  }),
];
