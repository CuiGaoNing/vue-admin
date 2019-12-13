
import Vue from 'vue'

const requireComponent = require.context(
  '.', // 注意，这里只支持静态字符串，不能使用变量
  false,
  /^((?!index).)*\.js$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  if (!componentConfig.default) {
    return
  }
  let { name, hooks } = componentConfig.default
  Vue.directive(name, hooks)
})
