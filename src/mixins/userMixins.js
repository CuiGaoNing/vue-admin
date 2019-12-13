const API = {
  LOGOUT: {
    url: '/api/loginOut'
  },
  SYSTEM_TIME: {
    url: '/api/users/getSystemTime'
  },
  GET_ALARM: {
    url: '/api/audits/getAlarm'
  }
}

export default {
  methods: {
    // 日志存储空间告警
    getAlarm () {
      this.$request({
        url: API.GET_ALARM.url
      }).then(data => {
        this.showAlarm = false
      }).catch(data => {
        this.$message.error(data.data.alarm)
        this.alarm_text = data.data.alarm
        this.showAlarm = true
      })
    },
    logout () {
      this.$request({
        url: API.LOGOUT.url
      }, {
        isToken: false
      }).then(data => {
        this.$socketClose() // 断开 soket
        this.$store.dispatch('LogOut')
        location.href = this.$router.resolve({ name: 'login' }).href // 调转到登录页
      })
    },
    getSystemTime () {
      this.$request({
        url: API.SYSTEM_TIME.url
      }).then(res => {
        let timeStr = res.currSystemTime || Date.now()
        let timediffer = new Date() - timeStr
        this.$store.commit('SET_TIME_DIFFER', timediffer)
        this.time = new Date() - timediffer
        setInterval(_ => {
          this.time = new Date().getTime() - timediffer
        }, 1000)
      })
    }
  }
}
