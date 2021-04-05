/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { urlConfig } from '@/common';
import defaultSettings from '../../config/defaultSettings';

const { tokenKey } = defaultSettings;
const domain = window.location.hostname.toLowerCase();
const port = window.location.port;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录已超时, 请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include',
  // prefix: `http://${domain}:${port}/`, //接口公共
  prefix: urlConfig.URL_API, //接口公共
  method: 'post', // 设置默认的请求类型
});

//请求拦截
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem(tokenKey) || '';
  return {
    options: {
      ...options,
      headers: token
        ? {
            ...options.headers,
            token: localStorage.getItem(tokenKey) || '',
          }
        : {
            ...options.headers,
          },
    },
  };
});
//响应拦截
request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  if (data.errorCode === 401) {
    localStorage.removeItem(tokenKey);
    window.location.href = '/user/login';
  } else if (data.status === 1 || data.status === '1') {
    return response;
  } else {
    message.error(`${data.msg || data.details || data.infocode}`);
  }
  return response;
});
export default request;