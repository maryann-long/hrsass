// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
