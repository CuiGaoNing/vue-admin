const BASE_URL = '/api'
const API = {
  // 任务执行状态1
  GET_TASK_ONE: {
    url: BASE_URL + '/holmes/getTaskOne',
    tag: 'log-taskViewOne-collect'
  }
}
export default {
  methods: {
    // 任务执行状态
    async getTaskOne () {
      let { tag, url } = API.GET_TASK_ONE
      await this.$request({
        url: url
      }, {
        tag: tag
      }).then(data => {
        if (data) {
          this.taskViewOne = data
        } else {
          this.taskViewOne = []
        }
      }).catch(data => {
        this.$message.error(data.data)
      })
    }
  }
}
