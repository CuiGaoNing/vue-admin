<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { throttle } from '@/lib/base'
import BusFactory, { EventName } from '@/lib/bus.js'

let bus
export default {
  name: 'app',
  beforeCreate () {
    this.location = location
  },
  created () {
    bus = BusFactory(this)

    // 对 windows resize 事件内部进行节流控制(再chrome下已对回调函数的调用频率进行了控制)
    let resizeFn = (event) => {
      bus.$emit(EventName.WINDOW_RESIZE, event)
    }
    window.addEventListener('resize', throttle(resizeFn))

    // 监听滚动
    let scrollFn = event => {
      bus.$emit(EventName.SCROLL_EVENT, event)
    }
    window.addEventListener('scroll', throttle(scrollFn))

    // 监听鼠标移出屏幕
    document.addEventListener('mouseleave', event => {
      bus.$emit(EventName.MOUSE_LEAVE_BROWSER, event)
    })
    // 监听点击事件
    document.addEventListener('click', event => {
      bus.$emit(EventName.MOUSE_CLICK_EVENT, event)
    })
  },
  methods: {}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>
