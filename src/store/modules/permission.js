import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      // 得到要添加的路由数组
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // 显示在左边导航栏中
    context.commit('setRoutes', routes)
    // 用来动态添加到路由中
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
