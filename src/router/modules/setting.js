// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      component: () => import('@/views/setting'),
      name: 'setting',
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
