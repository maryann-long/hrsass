// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
