const BASE_URL = '/api'
const API = {
  EDIT_PWD: {
    url: BASE_URL + '/test',
    tag: 'edit-pwd'
  }
}
export default {
  methods: {
    async editFn () {
      let { tag, url } = API.EDIT_PWD
      await this.$request({
        url: url,
        data: this.ruleForm
      }, {
        tag: tag
      }).then(data => {
        if (data.errorCode === 0) {
          this.$message.success(data.errorMsg)
        }
      }, err => {
        this.$message.error(err.message)
      })
    }
  }
}
