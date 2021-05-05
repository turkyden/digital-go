import { defineConfig } from 'dumi';

export default defineConfig({
  title: '5+3',
  favicon: '/images/5-3.jpg',
  logo: '/images/5-3.jpg',
  outputPath: 'docs-dist',
  theme: {
    '@c-primary': '#751485',
  },
  mode: 'site',
  // more config: https://d.umijs.org/config
});
