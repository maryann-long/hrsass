import request from '@/utils/request'
// 获取部门列表
export function getDepartments() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}
// 删除功能
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
/**
 *  新增部门接口
 *
 * ****/
export function addDepartments(data) {
  return request({
    url: `/company/department`,
    method: 'post',
    data
  })
}
// 获取用户详细信息
export function getDetails(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 编辑用户信息
export function updateDetail(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
