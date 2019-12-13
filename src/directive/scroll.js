
import { getDomStyle } from '@/lib/dom.js'
import ElementResizeDetectorMaker from 'element-resize-detector'
const IScroll = require('iscroll')
const options = {
  scrollbars: true,
  mouseWheel: true,
  interactiveScrollbars: true,
  shrinkScrollbars: 'scale',
  fadeScrollbars: true,
  // click: false,
  bounce: false,
  disableTouch: true,
  preventDefault: false
}
export default {
  name: 'iscroll',
  hooks: {
    // 初始化
    inserted: function (el, binding, vnode, oldVnode) {
      const overflowAttr = getDomStyle(el, 'overflow')
      const positionAttr = getDomStyle(el, 'position')
      // 需要增加overflow
      el.style.overflow = overflowAttr === 'hidden' ? overflowAttr : 'hidden'
      el.style.position = (positionAttr === 'relative' || positionAttr === 'absolute' ||
        positionAttr === 'fixed') ? positionAttr : 'relative'

      let callBack
      let iscrollOptions = options
      // 判断输入参数
      let vtype = binding.value ? [].toString.call(binding.value) : undefined
      switch (vtype) {
        case '[object Function]':
          callBack = binding.value
          break
        case '[object Object]':
          iscrollOptions = binding.value
          break
        default:
          break
      }

      // 使用vnode绑定iscroll是为了让iscroll对象能够状态传递，避免iscroll重复建立
      vnode.scroll = new IScroll(el, iscrollOptions)

      // 如果指令传递函数进来，把iscroll实例传递出去
      if (callBack) callBack(vnode.scroll)
    },
    bind (el, binding, vNode) {
      if (vNode.children && vNode.children.length && vNode.children[0] && vNode.children[0].elm) {
        // 监听视图元素resize
        let elementResizeDetector = ElementResizeDetectorMaker({
          strategy: 'scroll',
          callOnAdd: false
        })
        // 监听子节点变化，触发滚动条更新
        elementResizeDetector.listenTo(vNode.children[0].elm, () => {
          // 调用iscroll的refresh方法
          vNode.scroll.refresh()
        })
      }
    },
    // 组件发生变更
    componentUpdated: function (el, binding, vnode, oldVnode) {
      // 传递到新的节点上，避免重复或失效
      vnode.scroll = oldVnode.scroll
      // 调用iscroll的refresh方法
      vnode.scroll.refresh()
    },
    // 解绑
    unbind: function (el, binding, vnode, oldVnode) {
      vnode.scroll = oldVnode.scroll
      vnode.scroll.destroy()
      vnode.scroll = null
    }
  }
}
