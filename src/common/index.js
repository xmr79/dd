import { createFromIconfontCN } from '@ant-design/icons';
/* 接口域名 */
const domain = window.location.hostname.toLowerCase();
export const urlConfig = {
  'b.1pinhang.net': {
    URL_API: 'https://b.1pinhang.net/api/',
    msg_Api: 'https://b.1pinhang.net/notice/',
    wsUrl: 'wss://b.1pinhang.net/wss/ws',
    cmsPreview: 'https://b.1pinhang.net/xcx/cms',
    contentPreview: 'https://b.1pinhang.net/xcx/content',
    activityPreview: 'https://b.1pinhang.net/xcx/activity',
  },
  'test.1pinhang.net': {
    URL_API: 'https://test.1pinhang.net/api/',
    msg_Api: 'https://test.1pinhang.net/notice/',
    wsUrl: 'wss://test.1pinhang.net/wss/ws',
    cmsPreview: 'https://test.1pinhang.net/xcx/cms',
    contentPreview: 'https://test.1pinhang.net/xcx/content',
    activityPreview: 'https://test.1pinhang.net/xcx/activity',
  },
}[domain] || {
  URL_API: 'https://test.1pinhang.net/api/',
  msg_Api: 'https://test.1pinhang.net/notice/',
  wsUrl: 'wss://test.1pinhang.net/wss/ws',
  cmsPreview: 'https://test.1pinhang.net/xcx/cms',
  contentPreview: 'https://test.1pinhang.net/xcx/content',
  activityPreview: 'https://test.1pinhang.net/xcx/activity',
};

export const GAODE_CONFIG = {
  URL: 'https://restapi.amap.com/',
  KEY: 'cfd78beb3c1817fd159783900a0d4dde',
};

export const IconFontConfig = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2048328_nqxswioa2tl.js',
});

// 图片域名
export const IMG_URL = 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/';

//
export const HELP_CENTER = {
  SYSTEM:
    'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/%E5%B9%B3%E5%8F%B0%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E.pdf',
  EXPERT:
    'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/%E4%B8%93%E5%AE%B6%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E.pdf',
  COMPANY:
    'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/%E4%BC%81%E4%BA%8B%E4%B8%9A%E5%8D%95%E4%BD%8D%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E.pdf',
};
