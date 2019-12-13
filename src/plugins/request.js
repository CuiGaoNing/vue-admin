import axios from 'axios'
import { is } from '../lib/util'
import { Message } from 'element-ui'
import Qs from 'qs'
import { getToken } from '@/lib/auth.js'
import router from '@/router'

// cancel集合，避免互相冲突 <method:url>做主键，适配Restful方式
const CancelToken = axios.CancelToken
let cancelCollection = new Map()

/**
 * 发送请求前拦截
 */
axios.interceptors.request.use(req => {
  if (req.isToken) {
    let header = getToken()
    if (header) {
      req.headers[header[0]] = header[1]
    }
  }
  if (req.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
    req.transformRequest = [function (data) {
      return Qs.stringify(data)
    }]
  }
  return req
}, error => {
  return Promise.reject(error)
})

/**
 * 成功响应后拦截
 */
axios.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

/**
 * 发送请求
 * @param reqData 请求配置项
 * @param reqOptions 请求可选项
 * @returns {Promise}
 */
export const request = function (reqConfig, reqOptions = {}) {
  // 默认get请求、无超时、不需要取消请求、tag
  let { method = 'POST', url = '', timeout = 0, data = {} } = reqConfig
  let {
    isCancel = false,       // 取消请求
    tag = '',               // tag标识、loading使用
    isToken = true,         // 是否加入token
    responseType = 'json',  // 请求类别
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8',  // 参数默认格式
    isPromptError = true   // 错误提示
  } = reqOptions
  // 兼容两种经写法
  tag = tag || reqConfig.tag
  // 请求前增加loading 依赖elementUI
  if (tag && this.loading) {
    this.$set(this.loading, tag, true)
  }

  return new Promise((resolve, reject) => {
    let axiosOptions = {
      method,
      isToken,
      url,
      // contentType,
      data,
      timeout,
      // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'。default json
      responseType
    }
    // 需要取消，按规则<method:url>暂存
    if (isCancel) {
      axiosOptions.cancelToken = new CancelToken(function (c) {
        cancelCollection.set(`${method.toUpperCase()}:${url.toLowerCase()}`, c)
      })
    }
    // 前端部署到spring boot 处理
    if (process.env.NODE_ENV === 'production') {
      axios.defaults.baseURL = window.location.protocol + '//' + window.location.host // originIE 不兼容
      axiosOptions.url = url.replace('/api/', '/')
    }
    axiosOptions.headers = { 'Content-Type': contentType }
    // 发送请求
    axios(axiosOptions).then(res => {
      let { data, content, errorCode, errorMsg } = res.data
      // 请求后移除loading
      if (tag && this.loading) {
        this.$set(this.loading, tag, false)
      }
      // 如果返回的不是 json，直接将 response 返回
      if (responseType !== 'json') {
        return resolve(res)
      }
      if (errorCode === 0) {
        // 成功返回content内容
        resolve(data || content)
      } else {
        /* eslint-disable prefer-promise-reject-errors */
        isPromptError && Message.error({
          message: Array.isArray(errorMsg) ? errorMsg[0].errorMsg : errorMsg
        })
        reject({
          errorCode: errorCode,
          data: data || content,
          message: errorMsg
        })
      }
    }, err => {
      let msg = '请求发送了错误'
      // 请求后移除loading
      if (tag && this.loading) {
        this.$set(this.loading, tag, false)
      }
      if (err.code === 'ECONNABORTED') {
        msg = '请求超时！'
      } else if (axios.isCancel(err)) {
        msg = '请求被取消！'
      } else {
        switch (err.response && err.response.status) {
          case 401:
            msg = 'token失效'
            isPromptError && Message.error({
              message: msg
            })
            // token失效
            if (window.location.pathname !== '/fe/login') {
              let to = window.location.pathname + window.location.search
              router.returnUrl({
                name: 'login',
                query: { redirect: to }
              })
            }
            break
          case 403:
            msg = '无权限访问'
            isPromptError && Message.error({
              message: msg
            })
            break
          // case 404:
          //   msg = err
          //   isPromptError && Message.error({
          //     message: msg
          //   })
          //   break
          case 500:
            msg = '服务器发生未知错误'
            isPromptError && Message.error({
              message: msg
            })
            break
          default:
            msg = err
            window.localStorage.isDebug && Message.error({
              message: msg
            })
            window.localStorage.isDebug && console.log(err)
        }
      }
      reject(new Error(`${msg}：${err}`))
    })
  })
}

/**
 * 取消请求
 */
export const requestCancel = function (reqConfig) {
  let { method = 'get', url = '' } = reqConfig
  let key = `${method.toUpperCase()}:${url.toLowerCase()}`
  // 按规则获取对应的cancel函数 ，然后执行取消操作
  typeof cancelCollection.get(key) === 'function' && cancelCollection.get(key)()
  cancelCollection.delete(key)
}

export default {
  install: function (vue) {
    vue.prototype.$request = request
    vue.prototype.$all = function (requestInfos) {
      if (!Array.isArray(requestInfos)) {
        requestInfos = [requestInfos]
      }
      this.loading = true

      return Promise.all(requestInfos.map(requestInfo => {
        if (is(String, requestInfo)) {
          requestInfo = [requestInfo]
        }
        const config = Object.assign({}, { method: 'get' }, requestInfo[1])
        const url = requestInfo[0]
        return this.$request(url, config, true)
      }))
        .then(responses => {
          this.loading = false
          return responses
        })
        .catch((response) => {
          if (response.response.status === 401) {
            router.returnUrl({
              name: 'login'
            })
          } else {
            // this.$message.error(response.response.data.message)
          }
          this.loading = false
        })
    }
    vue.prototype.$cancel = requestCancel
  }
}
