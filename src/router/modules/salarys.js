// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      component: () => import('@/views/salarys'),
      name: 'salarys',
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
