import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  antd: {
    dark: true, // 开启暗色主题
    compact: true, // 开启紧凑主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/editor', component: '@/pages/editor' },
    { exact: true, path: '/newEditor', component: '@/pages/newEditor' },
    { exact: true, path: '/login', component: '@/pages/login' },
    {
      exact: false,
      path: '/dashboard',
      component: '@/pages/dashboard',
      routes: [],
    },
  ],
  fastRefresh: {},
  // resolve: {
  //   includes: ['src/components']
  // }
});
