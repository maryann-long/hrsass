// 配置全局组件(插件)
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import print from 'vue-print-nb'
import ThemePicker from '@/components/ThemePicker'
import ScreenFull from '@/components/ScreenFull'
import Lang from '@/components/Lang'
export default {
  install(vue) {
    vue.component('PageTools', PageTools)
    vue.component('UploadExcel', UploadExcel)
    vue.component('ImageUpload', ImageUpload)
    vue.use(print)
    vue.component('ThemePicker', ThemePicker)
    vue.component('ScreenFull', ScreenFull)
    vue.component('Lang', Lang)
  }
}
