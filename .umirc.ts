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
    { exact: true, path: '/login', component: '@/pages/login' },
    { exact: true, path: '/dashboard', component: '@/pages/dashboard' },
  ],
  fastRefresh: {},
});
