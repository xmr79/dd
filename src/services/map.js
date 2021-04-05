import { jsonp } from '@/utils/jsonp';
import { GAODE_CONFIG } from '@/common';

// 高德地理编码
export function getLocation(data) {
  return jsonp({
    url: `${GAODE_CONFIG.URL}v3/geocode/geo`,
    data: {
      key: GAODE_CONFIG.KEY,
      ...data,
    },
  });
}
