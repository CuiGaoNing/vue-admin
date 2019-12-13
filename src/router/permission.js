/**
 * @description 实例
 * @date 2018-12-20
 */
export default {
  path: '/fe/permission',
  name: 'permission',
  component: () => import('@/views/empty'),
  meta: { title: '权限', hidden: true, noRequireAuth: true },
  children: [
    {
      path: '403',
      name: 'permission-403',
      component: () => import('@/views/permission/403.vue'),
      meta: { title: '403', noRequireAuth: true }
    },
    {
      path: '404',
      name: 'permission-404',
      component: () => import('@/views/permission/404.vue'),
      meta: { title: '404', noRequireAuth: true }
    },
    {
      path: '500',
      name: 'permission-500',
      component: () => import('@/views/permission/500.vue'),
      meta: { title: '500', noRequireAuth: true }
    }
  ]
}
