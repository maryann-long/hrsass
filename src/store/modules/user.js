import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  // 设置token为共享状态
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 保存全局状态
  setToken(state, token) {
    state.token = token
    // 持久性
    setToken(token)
  },
  // 删除token，退出登录
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 封装获取用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const userInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...userInfo })
    return result
  },
  // 登出操作
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 重置路由，避免下个人登陆时访问前面人的路由权限
    resetRouter()
    // 删除vuex中的routes，控制显示侧边栏内容
    // 调用其他模块的mutations要加{root: true}
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
