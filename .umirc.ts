import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: true, // 开启暗色主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/editor', component: '@/pages/editor' },
  ],
  fastRefresh: {},
});
