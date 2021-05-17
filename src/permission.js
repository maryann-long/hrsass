// 主页路由的token拦截处理
import router from '@/router'
import store from '@/store'
// 进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import
const whiteList = ['/login', '/404']
// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 判断有没有token
  if (store.getters.token) {
    // 判断去不去登录页面
    if (to.path === '/login') {
      // 去主页
      next('/')
    } else {
      // 判断是否有用户id
      if (!store.getters.userId) {
        // 获取用户信息，调用action
        const { roles } = await store.dispatch('user/getUserInfo')
        console.log(roles.menus)
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 动态添加路由
        // 必须用next(to.path)跳转两次
        next(to.path)
      } else {
        // 放行
        next()
      }
    }
  } else {
    // 没有token，判断是否在白名单
    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单中,放行
      next()
    } else {
      // 不在白名单中，转到登录页
      next('/login')
    }
  }
  NProgress.done()
})
// 路由的后置守卫
router.afterEach(function() {
  NProgress.done()
})
