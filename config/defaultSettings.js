import { routeMaps } from './routerConfig';
export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#3FBAAB',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '一品杭',
  pwa: false,
  iconfontUrl: '',
  //缓存token的key
  tokenKey: 'yipinhang_token',
  //md5的key
  md5Key: 'YPH',
  // 路由对象
  routeMaps,
  logo: 'http://pphz-prod.oss-cn-hangzhou.aliyuncs.com/static/logo.png',
};
