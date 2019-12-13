import Vue from 'vue'

const requireFilter = require.context(
  '.', // 注意，这里只支持静态字符串，不能使用变量
  false,
  /^((?!index).)*\.js$/
)

requireFilter.keys().forEach((fileName) => {
  const componentConfig = requireFilter(fileName)
  if (componentConfig.default.name) {
    Vue.filter(componentConfig.default.name, componentConfig.default.handler)
  }
})
