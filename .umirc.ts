import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: true, // 开启暗色主题
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/Index.tsx' },
    { exact: true, path: '/editor', component: '@/pages/Editor.tsx' },
    { exact: true, path: '/login', component: '@/pages/Login.tsx' },
    {
      exact: false,
      path: '/dashboard',
      component: '@/pages/Dashboard/index.tsx',
      routes: [],
    },
  ],
  fastRefresh: {},
  // resolve: {
  //   includes: ['src/components']
  // }
});
