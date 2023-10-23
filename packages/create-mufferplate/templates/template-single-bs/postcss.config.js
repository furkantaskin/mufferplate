import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

const postcssConfig = {
  plugins: [
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
    purgecss({
      content: ['./theme/**/*.php', './theme/**/*.js'],
      safelist: [],
    }),
  ],
};
export default postcssConfig;
