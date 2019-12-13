
export default {
  data () {
    return {
      // loading对象
      loading: {},
      TABLE_HEIGHT: {
        HIGH: 630,
        NORMAL: 330
      }
    }
  },
  methods: {
    /**
     * 消息提示弹框
     * @param {string} [message='恭喜你，提交成功！']
     * @param {string} [type='success']
     * @param {*} [options={duration: 1500}]
     */
    showMessage (message = '恭喜你，提交成功！', type = 'success', options = { duration: 1500 }) {
      this.$message({
        message: message,
        type: type,
        ...options
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), options.duration)
      })
    },

    /**
     * confirm 提示框
     * @param {*} [{
     *       message = '确定删除该行数据吗？',
     *       title = '提示',
     *       confirmButtonText = '确定',
     *       cancelButtonText = '取消',
     *       type = 'warning',
     *       successMessage = '删除成功！',
     *       isRejectCallback = false,
     *       cancelMessage = '已取消删除'
     *     }={}]
     * @returns
     */
    confirmBox ({
      message = '确定删除该行数据吗？',
      title = '提示',
      confirmButtonText = '确定',
      cancelButtonText = '取消',
      type = 'warning',
      successMessage = '删除成功！',
      isRejectCallback = false,
      cancelMessage = '已取消删除'
    } = {}) {
      return new Promise((resolve, reject) => {
        this.$confirm(message, title, {
          confirmButtonText,
          cancelButtonText,
          type
        }).then(() => {
          resolve()
        }).catch(() => {
          isRejectCallback && reject(new Error())
          this.showMessage(cancelMessage, 'info')
          return false
        })
      })
    },

    /**
     * 通用表格请求
     * @param url  请求地址
     * @param currentObj  当前数据对象
     * @param params      请求参数
     * @param isPromptError 是否显示错误提示
     */
    async requestTable (data = {}, options = { isPromptError: true }) {
      let { url, currentObj, tag, params = {} } = data
      data.params = JSON.parse(JSON.stringify(params))
      // 删除tableChange方法中init添加非请求参数
      delete data.params.isNotInitFirstLoad
      let query = Object.assign(
        {
          page: currentObj.page || 0, // 当前页码
          size: currentObj.size || 10 //, // 每页条数
          // sorts: currentObj.sorts // 排序字段（count降序）
        },
        params
      )

      // 补充字段
      currentObj.content || this.$set(currentObj, 'content', [])
      currentObj.totalElements || this.$set(currentObj, 'totalElements', 0)
      currentObj.page || this.$set(currentObj, 'page', 0)
      currentObj.size || this.$set(currentObj, 'size', 10)
      currentObj.currentPage = currentObj.page + 1

      let content = await this.$request({ method: 'post', url: url, data: query, tag: tag }, { tag: options.tag, isPromptError: options.isPromptError })
      if (Array.isArray(content.page.content)) {
        return Object.assign(currentObj, content.page)
      }
      // 无数据
      return Object.assign(currentObj, { totalElements: 0, content: [] })
    },
    /**
     * 通用表格（分页、排序、改变每页展示条数）
     * @param params  参数
     * @param currentObj 当前数据对象
     * @param initMethod 请求数据方法
     * |方法名|作用|
     * |:---|:---|
     * |pageChange|页码发生改变重新获取表格数据|
     * |refresh|点击刷新按钮重新获取表格数据|
     * |sizeChange|每页展示条数发生改变重新获取表格数据|
     * |submit|点击提交按钮重新获取表格数据|
     * |init|初始化时判断是否存在默认排序,避免重复获取数据|
     * |default|默认排序|
     */
    tableChange (params = {}, currentObj, initMethod) {
      let { type, page, size, order, prop } = params
      currentObj.page =
        currentObj.page || this.$set(currentObj, 'page', 0)
      switch (type) {
        case 'pageChange': // 页码发生改变
          currentObj.page = page
          initMethod()
          break
        case 'refresh':
          initMethod()
          break
        case 'sizeChange': // 每页展示条数发生改变
          this.$set(currentObj, 'size', size)
          currentObj.page = 0
          initMethod()
          break
        case 'submit': //  判断是否点了查询按钮，重新拉取数据（elementUi 已修复current-page非用户交互触发bug）
          currentObj.page = 0
          initMethod()
          break
        case 'init': // 判断是否存在默认排序
          // if (!params.defaultSort) {
          //   initMethod()
          // }
          // 处理init第一次不加载，后续都调用回调（处理菜单栏刷新操作）
          if (currentObj.isNotInitFirstLoad || !params.defaultSort) {
            initMethod()
          }
          break
        default:
          // 排序
          currentObj.sorts =
            order && (order === 'ascending' ? [prop] : [`-${prop}`])
          currentObj.page = 0
          initMethod()
      }
      currentObj.currentPage = currentObj.page + 1
      // isNotInitFirstLoad 是否是第一次调用init类型函数
      currentObj.isNotInitFirstLoad = true
    }
  },
  created () { }
}
