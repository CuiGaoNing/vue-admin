<template>
  <section class="app-main-container">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  created () {
  },
  // 关闭连接
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.app-main-container {
  margin-top: 45px;
  padding: 20px;
  width: 100%;
  height: calc(100% - 75px);
}
</style>
