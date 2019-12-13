import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// polyfill
import '@/lib/polyfill.js'

// 加载组件
import '@/components'
// 加载图表
import './plugins/element.js'

import '@/styles/base.scss'
import '@/styles/element_cover.scss'
import '@/styles/steps.scss'
import Request from '@/plugins/request.js'

// 过滤器
import '@/filters'
// 指令directive
import '@/directive'

Vue.use(Request)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
