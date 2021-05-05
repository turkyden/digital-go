import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: true, // 开启暗色主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/Index' },
    { exact: true, path: '/editor', component: '@/pages/Editor' },
    { exact: true, path: '/login', component: '@/pages/Login' },
    {
      exact: false,
      path: '/dashboard',
      component: '@/pages/Dashboard',
      routes: [],
    },
  ],
  fastRefresh: {},
  // resolve: {
  //   includes: ['src/components']
  // }
});
