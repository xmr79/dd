import JsonP from 'jsonp';

export const jsonp = options => {
  const { url, data } = options;
  let str = '';
  for (const key in data) {
    if (!str) {
      str += `?${key}=${data[key]}`;
    } else {
      str += `&${key}=${data[key]}`;
    }
  }
  return new Promise((resolve, reject) => {
    JsonP(
      url + str,
      {
        param: 'callback',
      },
      function(err, res) {
        resolve(res);
      },
    );
  });
};
