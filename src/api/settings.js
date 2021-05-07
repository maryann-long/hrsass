import request from '@/utils/request'
// 获取角色列表
export function getRolesList(params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}
// 获取公司信息
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 删除角色
export function delRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 更新角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
// 添加角色
// export function addRole(data) {
//   return request({
//     url: '/sys/role',
//     method: 'POST',
//     data
//   })
// }
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}