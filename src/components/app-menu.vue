<template>
  <el-scrollbar style="height: 100%;overflow-x:hidden;">
    <div class="app-menu-container">
      <el-menu :default-active="activeIndex"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <template v-for="(item, index) in menus">
          <el-submenu :key="index" :index="`${index}`" v-if="!item.meta.hidden">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </template>
            <el-menu-item-group>
              <template v-for="(item1, index1) in item.children">
                <el-menu-item @click="toPage(item1, index, index1)" :index="`${index}-${index1}`" :key="index1">
                  <span>{{item1.meta.title}}</span>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
import BusFactory from '@/lib/bus.js'
let bus
// import $ from 'jquery'
export default {
  name: 'AppMenu',
  props: ['isMenuOpen'],
  data () {
    return {
      activeIndex: '0-0',
      isCollapse: false,
      currentMenu: '',
      currentModle: ''
    }
  },
  computed: {
    menus () {
      return this.$store.state.base.menuList
    }
  },
  watch: {
    $route: {
      deep: true,
      handler: function (val) {
      },
      immediate: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toPage (param, index, index1) {
      if (this.$router.currentRoute.meta.notallow) {
        bus.$emit('menuClick', param.name)
      } else {
        let active = index + '-' + index1
        if (this.activeIndex !== active) {
          this.activeIndex = active
          this.$router.push({ name: param.name })
        }
      }
    },
    navMainClick (param) {
      if (!this.isMenuOpen && !param.children) {
        this.$router.push({ name: param.name })
      }
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.path !== '/fe/workspace/index') {
      let menuName = this.$route.path.split('/')[2]
      let menuChildren = this.$route.path.split('/')[3]
      this.menus.map((item, index) => {
        if (item.path.split('/')[2] === menuName) {
          item.children.map((item1, index1) => {
            if (item1.path.split('/')[3] === menuChildren) {
              this.activeIndex = index + '-' + index1
              return false
            }
          })
        }
      })
    }
  },
  created () {
    console.log(this.$route)
    bus = BusFactory(this)
  }
}
</script>
<style lang="scss" scoped>
.app-menu-container {
  margin: 0;
  padding: 0;
  top: 45px;
  width: 230px;
  position: fixed;
  height: calc(100% - 45px);
  border-right: solid 1px #e6e6e6;
  z-index: 1999;
  background: #FFF;
  .el-menu {
    border-right: none;
  }
}
</style>
