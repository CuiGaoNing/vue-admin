
import IdssStep from './step'

const components = [
  IdssStep
]

const install = function (Vue) {
  if (install.installed) return false

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}
export {
  IdssStep
}

export default install
