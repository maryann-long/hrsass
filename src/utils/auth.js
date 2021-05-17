import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// 设置时间戳
const timeKey = 'vue_timestap_key'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setTimeStap() {
  return Cookies.set(timeKey, Date.now())
}
export function getTimeStap() {
  return Cookies.get(timeKey)
}
