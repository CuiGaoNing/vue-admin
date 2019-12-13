
/**
 * 判断参数的类型
 * @export
 * @param {*} constructor 要判断类型
 * @param {*} value 要判断的类型的参数
 * @returns true / false
 */
export function is (constructor, value) {
  return Object.prototype.toString.call(value) === '[object ' + constructor.name + ']'
}

/**
 * 验证字符串中是否包含特殊字符
 * @export
 * @param {*} str 要判断的字符串
 * @returns true / false
 */
export function checkSpecificKey (str) {
  var specialKey = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#@￥……&*（）——|-+={}《》【】‘；：”“'。，、？]‘'"
  for (var i = 0; i < str.length; i++) {
    if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
      return false
    }
  }
  return true
}
/**
 * 文本特殊字符转义与反转义
 * @export
 * @param {*} str
 * @returns str
 */
export function htmlEncode (html) {
  var temp = document.createElement('div')
  temp.textContent !== undefined ? temp.textContent = html : temp.innerText = html
  var output = temp.innerHTML
  temp = null
  return output
}
export function htmlDecode (text) {
  var temp = document.createElement('div')
  temp.innerHTML = text
  var output = temp.innerText || temp.textContent
  temp = null
  return output
}
// /**
//  * 验证字符串中是否是网址
//  * @export
//  * @param {*} str 要判断的字符串
//  * @returns true / false
//  */
// export function IsURL (str) {
//   let a = '^((https|http|ftp|rtsp|mms)?://)'
//   let b = "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
//   let c = '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
//   let d = '|' // 允许IP和DOMAIN（域名）
//   let e = "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
//   let f = '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
//   let g = '[a-z]{2,6})' // first level domain- .com or .museum
//   let h = '(:[0-9]{1,4})?' // 端口- :80
//   let i = '((/?)|' // a slash isn't required if there is no file name
//   let j = "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
//   let strRegex = a + b + c + d + e + f + g + h + i + j
//   let re = new RegExp(strRegex)
//   // re.test()
//   if (re.test(str)) {
//     return true
//   } else {
//     return false
//   }
// }
