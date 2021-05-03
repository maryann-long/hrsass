// 配置路由规则
import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [
    {
      // 二级路由
      path: '',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
