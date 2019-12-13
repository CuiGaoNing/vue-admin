<template>
  <div class="app-footer-container">
    footer  版本号：{{version}}
  </div>
</template>

<script>
import userMixins from '@/mixins/userMixins'
import { mapGetters } from 'vuex'
export default {
  name: 'appFooter',
  mixins: [userMixins],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'version'
    ])
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.app-footer-container {
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  border-top: solid 1px #e6e6e6;
  text-indent: 20px;
  line-height: 30px;
  background: #fff;
  text-align: center;
  padding-right: 30px;
}
</style>
