import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';
import sortMediaQueries from "postcss-sort-media-queries";

const postcssConfig = {
  plugins: [
    autoprefixer,

    cssnano({
      preset: 'cssnano-preset-advanced',
    }),
    purgecss({
      content: ['./theme/*.php', './theme/template/*.php', './theme/assets/js/*.js', './inc/*.php'],
      safelist: ['swiper-pagination-bullet'],
      fontFace: false,
      keyframes: false,
      defaultExtractor: (content) =>
        content.match(/[\w-/:.-]+/g) || [],
    }),
    sortMediaQueries({
      sort: 'desktop-first'
    }),
  ],
};
export default postcssConfig;