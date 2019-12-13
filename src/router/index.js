import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import permission from '@/router/permission.js'
import workspace from '@/router/workspace.js'
import personal from '@/router/personal.js'
import { getToken } from '@/lib/auth.js'

Vue.use(Router)

/**
 * 扩展VueRouter原型，跳转
 */
Router.prototype.returnUrl = function (to) {
  this.push(to)
}

let isRouterPush = false

const routerMap = [ workspace, personal, permission ]

const sys = [ 'workspace' ] // 系统管理员要显示的路由名字 只判断主菜单
const oper = [ 'personal' ] // 操作员要显示的路由名字 只判断主菜单

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/fe/login',
      name: 'login',
      component: () => import('@/views/login/index'),
      meta: { hidden: true, noRequireAuth: true }
    }
  ]
})

let zipRouterAry = []

function zipRouter (menu, parentPath) {
  // 不存在 || length为0
  if (!menu.children || !menu.children.length) {
    menu.path = `${parentPath}/${menu.path}`.replace(/\/+/g, '/')
    zipRouterAry.push(menu)
  } else {
    menu.children.forEach(item => {
      return zipRouter(item, `${parentPath}/${menu.path}`)
    })
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.noRequireAuth) {
    return next()
  } else if (!getToken()) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }
  if (!isRouterPush) {
    isRouterPush = true
    let token = getToken()
    let role = token[2]
    // 根据权限合并生成新的路由树 // 开发环境加载全部路由
    const newRouters = mergeRouter(routerMap, process.env.NODE_ENV === 'production' ? role : '') // routerMap
    // if (process.env.NODE_ENV === 'development') {
    //   // 开发模式下加载 demo 菜单
    //   newRouters.push(require('@/router/demo.js').default)
    // }

    // 拍路由扁平化处理
    newRouters.forEach(menu => zipRouter(menu, ''))
    // 更新菜单中依赖的数据
    store.commit('SET_MENU_LIST', newRouters)
    // 404 页面
    zipRouterAry.push({
      path: '*',
      component: () => import('@/views/permission/404.vue')
    })
    // 动态添加符合权限的路由 此处动态添加可优化，考虑全部挂载后，只在此处判断路由是否有权限
    router.addRoutes([{
      path: '/fe',
      name: 'index',
      component: () => import('@/views/layout/layout.vue'),
      // 默认跳转到第一个页面。
      redirect: { name: zipRouterAry[0].name, query: { _r: Date.now() } },
      children: zipRouterAry
    }])
    // 如果是根路径，默认跳到登录
    if (to.path === '/' || to.path === '') {
      store.dispatch('LogOut')
      return next({ name: 'login' })
    }
    // 如果是main，默认跳到路由中的第一个
    if (to.path === '/main' || to.path === '/main#' || to.path === '/fe/') {
      // 使用path的话 当第一个路由的路径是/:id这种形式时 第一次进入页面时会直接在浏览器url上显示出 /:id，这里所以使用name
      return next({ name: zipRouterAry[0].name, query: to.query })
    }

    next(to)
  }
  next()
})

/**
 * @description
 * @date 2018-11-08
 * @param {*} originRoutes  所有的路由
 * @param {*} role 角色名字
 * @returns 返回新的路由
 */
function mergeRouter (originRoutes, role) {
  let newRouters = []
  switch (role) {
    case 0: // 系统管理员{审计信息隐藏，任务审批隐藏}
      originRoutes.map(item => {
        if (sys.filter(oper => oper === item.name).length) {
          newRouters.push(item)
        }
      })
      break
    case 1: // 操作员
      originRoutes.map(item => {
        if (oper.filter(oper => oper === item.name).length) {
          newRouters.push(item)
        }
      })
      break
    case 2: // 日志审计员
      originRoutes.map(item => {
      })
      break
    case 3: // 任务审批员
      originRoutes.map(item => {
      })
      break
    default:
      newRouters = originRoutes
      break
  }
  return newRouters
}

export default router
