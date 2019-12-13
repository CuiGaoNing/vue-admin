/**
 * @description 工作台
 * @date 2019-04-01
 */
export default {
  path: '/fe/workspace',
  name: 'home',
  component: () => import('@/views/empty'),
  meta: { title: '工作台', icon: 'el-icon-menu' },
  children: [{
    path: 'index',
    name: 'workspace-index',
    meta: { title: '个人信息', breadcrumb: [{ name: 'workspace-index', title: '工作台' }] },
    component: () => import('@/views/workspace/index')
  }, {
    path: 'mine',
    name: 'workspace-mine',
    meta: { title: '我的报工', breadcrumb: [{ name: 'workspace-mine', title: '工作台' }] },
    component: () => import('@/views/workspace/mine')
  }]
}
