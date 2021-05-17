// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      name: 'permissions',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
