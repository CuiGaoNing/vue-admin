<template>
  <div class="app-navigator">
    header
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userMixins from '@/mixins/userMixins'
import { getToken } from '@/lib/auth.js'
export default {
  name: 'AppNavigator',
  mixins: [userMixins],
  props: ['isMenuOpen'],
  data () {
    return {
      alarm_text: '',
      showAlarm: false,
      dropdownShow: false,
      role: '',
      time: new Date().getTime()
    }
  },
  computed: {
    ...mapGetters([
      'version'
    ]),
    getUserName () {
      return window.localStorage.getItem('current')
    }
  },
  methods: {
    showDropdown (val) {
      this.dropdownShow = val
    },
    selectAlarm () {
      if (this.showAlarm) {
        this.$message.error(this.alarm_text)
      } else {
        this.$message.success('数据库存储容量充足')
      }
    },
    // 修改密码
    updatePwd () {
      this.$router.push({ name: 'passwd-index' })
    },
    // 退出登录
    loginOut () {
      this.$confirm('确认要退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出系统请求
        this.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  mounted () {
    let token = getToken()
    this.role = token[2]
    if (token[2] === 2) {
      Promise.all([this.getAlarm()])
    }
  },
  created () {
    if (this.version || this.version === '') {
      this.$store.dispatch('getVersion')
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-navigator {
    position: fixed;
    width: 100%;
    height: 45px;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 2000;
    border-bottom: solid 1px #e6e6e6;
    text-align: center;
    font-size: 24px;
    line-height: 40px;
  }
</style>
