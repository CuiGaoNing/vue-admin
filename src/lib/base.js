import Message from 'element-ui/packages/message/index.js'

/**
 *
 * 节流函数生成器
 * 对于调用频繁的地方，可保障在设置时间间隔后执行一次，或每相隔固定时间执行一次
 * 使用方法:   window.onresize = throttle(arguments)
 * @param {*} fn 设置此生成器的阈值
 * @param {number} [delay=14] 执行的时间间隔
 * @param {number} [mustRunDelay=14] 必须执行的时间间隔
 * @returns {Function}
 */
const throttle = function (fn, delay = 14, mustRunDelay = 14) {
  let timer = null
  let timestamp

  return function () {
    let context = this
    let args = arguments
    let now = +new Date()
    clearTimeout(timer) // 清除定时器
    if (!timestamp) {
      timestamp = now
    }
    if (now - timestamp >= mustRunDelay) {
      fn.apply(context, args)
      timestamp = now
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 *
 * 函数去抖动
 * 业务：页面中有一个输入框，我们根据输入框里输入内容同时可能会去掉用http接口去查询对应的数据，如果这个用户输入的同时，频繁的触发input事件，然后频繁的向后台发送请求，那么直到用户输入完成时，之前的请求都应该是多余的，假设网络慢一点，后台返回的数据比较慢，那么显示的数据可能会出现频繁的变换，直到最后的一个请求返回。
 * @param {*} fn 设置此生成器的阈值
 * @param {number} [wait=14] 执行的时间间隔
 * @returns {Function}
 */
const debounce = function (fn, wait = 500) {
  var timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

/**
 * 获取后台错误提示语
 * @param message
 * 兼容三种message模式
 * 1. 字符串 {message:'XXXX'}
 * 2. 数组模式 {message: [item: 'xxx', message: 'xxxx']}
 * 3. 混合模式 {message: [item: ['name1', 'name2'], message: 'xxxx]}
 * @param {string} customErrorMsg 自定义错误消息
 * @returns {{}}
 */
const getErrorMsgByEnd = function ({ message = [] }, customErrorMsg) {
  try {
    // 后台错误提示语
    let errors = {}
    // 兼容非校验错误处理
    if (!Array.isArray(message)) {
      throw new Error(message)
    }
    message.map(obj => {
      if (typeof obj.item === 'string') {
        Object.assign(errors, { [obj.item]: obj.message })
      } else if (Array.isArray(obj.item)) {
        // 兼容返回item为数组处理
        obj.item.map(filed => {
          Object.assign(errors, { [filed]: obj.message })
        })
      } else {
        // 其他错误结构抛出异常
        throw new Error('接口校验错误结构返回异常！')
      }
    })
    return errors
  } catch (err) {
    Message({
      type: 'error',
      message: err.message || customErrorMsg
    })
    return false
  }
}
// 图表坐标轴为 ‘log’ 类型时的特殊值
const logValueDictionary = [ 1.001, 1.20001 ]

// 把log 类型值转换成正常值
const logToValue = function (value) {
  return logValueDictionary.includes(value) ? logValueDictionary.indexOf(value) : value
}

/**
 * 获取后台错误提示语
 * @param key 加密秘钥   默认为idss
 * @param {string} val 自定义错误消息
 * @returns 生成加密字符串
 */
const getEncrypted = function (key = 'idss', val) {
}

/* 获取时间差 */
const timeDifferenceFun = function (time1, time2) { // 时间差
  time1 = parseInt(time1)
  time2 = parseInt(time2)
  var str = ''
  if (isNaN(time1) || isNaN(time2)) {
    str = '—'
  } else {
    var dif = (time1 - time2 > 0) ? (time1 - time2) : (time2 - time1)
    var days = Math.floor(dif / (24 * 3600 * 1000)) // 计算出相差天数
    var leave1 = dif % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
    var leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
    var leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)  // 计算相差秒数
    if (seconds === 60) {
      seconds = 0
      minutes = minutes + 1
    }
    if (minutes === 60) {
      minutes = 0
      hours = hours + 1
    }
    if (hours === 24) {
      hours = 0
      days = days + 1
    }
    if (days > 0) {
      str += days + '天'
    }
    if (hours > 0) {
      str += hours + '小时'
    }
    if (minutes > 0) {
      str += minutes + '分'
    }
    if (seconds > 0) {
      str += seconds + '秒'
    }
  }
  return str
}

export {
  throttle,
  debounce,
  getErrorMsgByEnd,
  getEncrypted,
  logToValue,
  timeDifferenceFun
}
