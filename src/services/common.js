import request from '@/utils/request';

// 上传图片
export async function uploadImg(file) {
  console.log(file)
  const formData = new FormData();
  formData.append('file', file);
  return request('upload/uploadImg', { data: formData, requestType: 'form' });
}

export async function uploadVideo(file) {
  const formData = new FormData();
  formData.append('file', file);
  return request('upload/video', { data: formData });
}

// 获取账号列表
export async function accountList(data) {
  return request('admin/list', { data });
}

// 省市区
export async function findBaseProvinceList(data) {
  return request('baseProvince/findBaseProvinceList', { data });
}

// 获取账号
export async function getListAll(data) {
  return request('admin/listAll', { data });
}

// 获取平台电话
export async function getSystemMobile(data) {
  return request('admin/getMobile', { data });
}
