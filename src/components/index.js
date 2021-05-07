// 配置全局组件(插件)
import PageTools from '@/components/PageTools'
export default {
  install(vue) {
    vue.component('PageTools', PageTools)
  }
}
