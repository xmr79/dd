import request from '@/utils/request';
// 保存热词配置
export async function submitWords(data) {
  return request('hotWord/saveHostWords', { data });
}
// 普通热词是否自动更新
export async function updateAutomatic(data) {
  return request('hotWord/updateHotWordUpdateConfig', { data });
}
// 更新热词是否开启
export async function updateHotWordIsOpen(data) {
  return request('hotWord/updateHotWordIsOpen', { data });
}
// 查询热词
export async function getHot(data) {
  return request('hotWord/list', { data });
}
// 查询热词是否开启
export async function hotOpen(data) {
  return request('hotWord/hotWordIsOpen', { data });
}
// 查询热词是否自动更新
export async function hotWordIsAutoUpdate(data) {
  return request('hotWord/hotWordIsAutoUpdate', { data });
}
