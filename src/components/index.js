import Vue from 'vue'

const requireComponent = require.context(
  '.', // 注意，这里只支持静态字符串，不能使用变量
  false,
  /.*\.vue$/
)

requireComponent.keys().forEach((fileName) => {
  if (fileName.endsWith('primary-foreign-relation.vue') || fileName.endsWith('process.vue')) {
    return
  }
  const componentConfig = requireComponent(fileName)
  componentConfig.default.name && Vue.component(componentConfig.default.name, componentConfig.default)
})
