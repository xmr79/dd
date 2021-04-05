import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { isArray } from 'util';
import { IMG_URL } from '@/common';
import { phoneReg } from '@/constants/reg';
import moment from 'moment';
import { getLocation } from '@/services/map';
import { message } from 'antd';
// 获取七牛图片
export function getImgUrl(imgname) {
  return `${IMG_URL}${imgname}`;
}

// 获取七牛图片的文件名
export function getFileName(fileurl) {
  let index1 = fileurl.lastIndexOf('/');
  let index2 = fileurl.length;
  fileurl = fileurl.substring(index1 + 1, index2);
  return fileurl;
}
// 获取文件类型
export function getFileType(file) {
  let filename = file;
  let index1 = filename.lastIndexOf('.');
  let index2 = filename.length;
  let type = filename.substring(index1, index2);
  return type;
}

/**
 * 将对象转换为以key对应的值为内容的数组
 * @param {Object} enums (将要转换的对象)
 */
export const objToArray = (enums = {}) => {
  const arr = [];
  Object.keys(enums).forEach(key => {
    arr.push(enums[key]);
  });
  return arr;
};
/**
 * 将数组转换为以指定字段为key的对象
 * @param {Array} arrs (将要转换的数组)
 * @param {String} key (以哪个字段作为对象的key)
 */
export const arrayToObj = (arrs = [], key = 'id') => {
  const params = {};
  for (let i = 0, len = arrs.length; i < len; i++) {
    const item = arrs[i];
    params[item[key]] = item;
  }
  return params;
};

// 将数字转换成金额显示
export const toMoney = num => {
  const type = Object.prototype.toString.call(num);

  switch (type) {
    case '[object Number]': {
      num = num.toFixed(2).replace('.00', '');
      break;
    }
    case '[object String]': {
      num -= 0;
      num = num.toFixed(2).replace('.00', '');
      break;
    }
    default: {
      num = '--';
    }
  }
  return num;
};

/**
 *
 * @param {*生成的独立id的长度} n
 * @param {*和将要生成的随机数作比较去重的id集合} arr
 * @param {*可用于生成随机数id的字符集合} str
 */
export const getUniqueId = (arr = [], n = 8, comb = '123456789') => {
  const random = n => {
    let str = comb;
    let result = '';
    for (let i = 0; i < n; i++) {
      result += str[parseInt(Math.random() * str.length)];
    }

    if (arr.includes(result)) {
      random(n);
    } else {
      return result;
    }
  };

  return random(n);
};

export const isPhone = phone => phoneReg.test(phone);

/**
 * 获取图表数据
 * @param {后端返回的数据: Array}data
 * @param {选择的时间范围: number}timeStart，timeEnd
 * @param {时间类型: String}timeType
 * @param {isToTime: Boolean}是否包过当前天，月，年
 */
export function getChartData({
  data,
  timeStart,
  timeEnd,
  timeType = 'day',
  isToTime = true,
  timeKey = 'statDate',
}) {
  let initData = [];
  let initObj = {};
  for (var prop in data[0]) {
    initObj[prop] = 0;
  }
  for (
    var i = 0;
    i <
    Math.ceil(
      (timeEnd - timeStart) /
        (timeType === 'year' ? 86400000 * 366 : timeType === 'month' ? 86400000 * 31 : 86400000),
    );
    i++
  ) {
    const obj = { ...initObj };
    obj[timeKey] = moment(timeEnd)
      .add(-i, timeType)
      .startOf(timeType)
      .valueOf();
    initData.push(obj);
  }
  let finalData = initData.map(item => {
    data.map(subItem => {
      if (item[timeKey] === subItem[timeKey]) {
        item = subItem;
      }
    });
    return item;
  });
  return finalData;
}

export function getDaysBetween(dateString1, dateString2) {
  var startDate = dateString1;
  var endDate = dateString2;
  var days = Math.ceil((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
  return days;
}

/**
 * @param {用于比较的时间} arrTime
 * @param {作为目标比较的时间} targetTime
 */
export const getTimeType = (arrTime = [], targetTime = [], type = 'day', lastParams) => {
  let _stringTime = !lastParams
    ? `${arrTime[0].startOf(type).valueOf()},${arrTime[1].endOf(type).valueOf()}`
    : `${arrTime[0].valueOf()},${arrTime[1].valueOf()}`;
  let _targetValue = targetTime.filter(item => _stringTime === item.value.join(','));
  return _targetValue.length ? _targetValue[0].key : null;
};
/**
 *对比两个对象是否相等
 * @param {*对象1} obj1
 * @param {*对象2} obj2
 */
export function objDiff(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (var o in obj1) {
    var t1 = obj1[o] instanceof Object;
    var t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return objDiff(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}

export async function getmapLocation(param) {
  const res = await getLocation(param);
  const { status, infocode, geocodes } = res;
  let obj;
  if (res && status === '1') {
    if (geocodes.length > 0) {
      obj = geocodes[0].location;
    } else {
      message.error('地址无效');
    }
  } else {
    message.error(infocode);
  }
  return obj;
}
// decimal
export const numLimit = (value, min, max, type, xs = 1) => {
  switch (type) {
    case 'integer':
      return (
        value < min ||
        value % 1 !== 0 ||
        value > max ||
        !isRealNum(value) ||
        (value + '').indexOf('.') !== -1
      );
      break;
    default:
      return (
        value < min ||
        (value &&
          (value + '').indexOf('.') !== -1 &&
          value.length - (value + '').indexOf('.') > xs + 1) ||
        value > max ||
        !isRealNum(value)
      );
      break;
  }
};

//判断值是否是数字
export const isRealNum = val => {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，

  if (val === '' || val == null) {
    return false;
  }
  if (!isNaN(val)) {
    //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
    //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true;
  } else {
    return false;
  }
};
//减
export function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
/**
 * 判断数据类型
 * @param {*} data
 */
export function getDataType(data) {
  return Object.prototype.toString
    .call(data)
    .replace('[object ', '')
    .replace(']', '');
}

export function getssqname(BaseProvinceList, ssq) {
  const obj = {};
  const { province, city, district } = ssq;
  for (let i = 0; i < BaseProvinceList.length; i++) {
    const element = BaseProvinceList[i];
    if (element.value === province) {
      obj.province = element.label;
      for (let idx = 0; idx < element.children.length; idx++) {
        const ele = element.children[idx];

        if (ele.value === city) {
          obj.city = ele.label;
          for (let index = 0; index < ele.children.length; index++) {
            const el = ele.children[index];
            if (el.value === district) {
              obj.district = el.label;
              break;
            }
          }
          break;
        }
      }
      break;
    }
  }
  return obj;
}

export function formatSeconds(value) {
  let result = parseInt(value);
  let h =
    Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? '0' + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60);

  let res = '';
  if (h !== '00') res += `${h}:`;
  res += `${m}:`;
  res += `${s}`;
  return res;
}
