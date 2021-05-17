// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
