import Cookies from 'js-cookie'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import customEN from './en'
import customZH from './zh'
// 全局注册国际化包
Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookies.get('language') || 'zh',
  messages: {
    en: {
      ...elementEN,
      ...customEN
    },
    zh: {
      ...elementZH,
      ...customZH
    }
  }
})
