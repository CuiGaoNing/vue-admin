<template>
  <el-container>
    <app-navigator></app-navigator>
    <el-container>
      <el-row class="menu">
        <el-aside>
          <app-menu></app-menu>
        </el-aside>
      </el-row>
      <el-container>
        <app-main></app-main>
      </el-container>
      <app-footer></app-footer>
    </el-container>
  </el-container>
</template>

<script>
import BusFactory, { EventName } from '@/lib/bus.js'
let bus
export default {
  name: 'layout',
  data () {
    return {
      isMenuOpen: true
    }
  },
  methods: {
    delwithBody () {
      if (document.body.clientWidth <= 1250) {
        this.isMenuOpen = false
      } else {
        this.isMenuOpen = true
      }
    }
  },
  created () {
    bus = BusFactory(this)
    bus.$on(EventName.WINDOW_RESIZE, () => {
      this.delwithBody()
    })
    this.$nextTick(_ => {
      this.delwithBody()
    })
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  width: 230px !important;
}
</style>
