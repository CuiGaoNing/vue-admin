/**
 * @description 首页
 * @date 2019-04-01
 */
export default {
  path: '/fe/home',
  name: 'home',
  component: () => import('@/views/empty'),
  meta: { title: '首页', icon: 'el-icon-s-custom' },
  children: [{
    path: 'index',
    name: 'personal-index',
    meta: { title: '数据概览', breadcrumb: [{ name: 'personal-index', title: '首页' }] },
    component: () => import('@/views/personal/index')
  }, {
    path: 'monitor',
    name: 'personal-monitor',
    meta: { title: '监控', breadcrumb: [{ name: 'personal-monitor', title: '首页' }] },
    component: () => import('@/views/personal/monitor')
  }]
}
