import request from '@/utils/request'
export function getDepartments() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}
