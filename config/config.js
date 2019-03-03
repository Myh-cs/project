// https://umijs.org/config/
import path from 'path';
// import pageRoutes from './router.config'

export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
        },
        title: {
          defaultTitle: '维护计划',
        },
        dll: false,
        pwa: false,
        hd: false,
        fastClick: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  //   exportStatic: {},
  // 路由配置
  // routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': '#00CC99',
    'brand-primary-tap': '#00CC66',
  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 6,
    ios: 7,
  },
  history: 'hash',
  outputPath: './deploy/defends',
  hash: true,
  publicPath: '/app/defends/',
  alias: {
    '@': path.resolve(__dirname, 'src'),
    utils: path.resolve(__dirname, './src/utils'),
    components: path.resolve(__dirname, './src/components'),
  },
  proxy: {
    '/qtyx': {
      target: 'http://39.105.11.196:8080',
      changeOrigin: true,
      // "pathRewrite": { "^/user-service": "" }
    },
  },
};
