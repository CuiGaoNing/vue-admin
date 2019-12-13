
import Vue from 'vue'

// 目的是使用 vue 内置的事件监听触发方法
const Bus = new Vue()

// 记录所有的事件类型与事件函数
const EventStore = {}

// 组件销毁时，移除组件内部所有的全局事件的方法
const destroyHandler = function () {
  // this 为调用此方法的vue组件
  const currentEventMap = EventStore[this._uid]
  if (typeof currentEventMap === 'undefined') {
    return
  }
  for (let type in currentEventMap) {
    const key = Array.isArray(type) ? type.join(',') : type
    // Bus 解绑事件
    Bus.$off(type, currentEventMap[key])
  }
  // 删除记录的事件集合
  delete EventStore[this._uid]
}

const BusFactory = vm => {
  // 当前组件的唯一标示(vue生成的自增ID)
  const uid = vm._uid
  // 初始化当前组件的事件集合对象
  EventStore[uid] = {}
  // 当前实例组件的 destroyed 钩子
  const destroyed = vm.$options.destroyed
  // 为当前组件挂载 destroyed 钩子，组件销毁时，自动移除所有全局事件方法
  !destroyed.includes(destroyHandler) && destroyed.push(destroyHandler)

  return {
    $on: (type, handler) => {
      const key = Array.isArray(type) ? type.join(',') : type
      EventStore[uid][key] = handler
      Bus.$on(type, handler)
    },
    $off: (type, handler) => {
      // $off() 时 type 为空，移除所有事件
      if (!type) {
        // 删除该uid下事件集合
        delete EventStore[uid]
        Bus.$off()
        return
      }
      const key = Array.isArray(type) ? type.join(',') : type
      // 删除对应的事件
      delete EventStore[uid][key]
      Bus.$off(type, handler)
    },
    $once: (...params) => Bus.$once(...params),
    $emit: (...params) => Bus.$emit(...params)
  }
}

BusFactory.$emit = (...params) => Bus.$emit(...params)
BusFactory.$once = (...params) => Bus.$once(...params)

const EventName = {
  WINDOW_RESIZE: 'window-resize',
  SCROLL_EVENT: 'scroll-event',
  MOUSE_LEAVE_BROWSER: 'mouse-leave-browser',
  MOUSE_CLICK_EVENT: 'mouse-click-event'
}

export default BusFactory
export { Bus, EventName }
