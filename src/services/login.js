import request from '@/utils/request';
//登录
export async function queryLogin(value) {
  return request('login', {
    data: { ...value },
    headers: { 'Content-Type': 'application/json' },
  });
}

//退出用户
export async function loginOut(value) {
  return request('admin/loginOut', { data: { ...value } });
}
