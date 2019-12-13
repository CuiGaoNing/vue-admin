const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/**
 * 获取当前元素的样式
 * @param {object<node>} dom dom元素
 * @param {string} attr dom样式名
 */
export function getDomStyle (dom, attr) {
  // 判断dom是否为dom节点元素
  if (!(dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string')) {
    return
  }
  // 将属性转成小驼峰
  attr = attr.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  // 主流浏览器
  if (getComputedStyle) {
    return getComputedStyle(dom, null)[attr]
  } else if (dom.currentStyle) {
    if (attr === 'float') {
      return dom.currentStyle.getAttribute('styleFloat')
      // 取高宽使用 getBoundingClientRect
    } else if ((attr === 'width' || attr === 'height') && (dom.currentStyle[attr] === 'auto')) {
      let clientRect = dom.getBoundingClientRect()
      return clientRect[attr] + 'px'
    }
    // 其他样式，无需特殊处理
    return dom.currentStyle.getAttribute(attr)
  }
}

/**
 * 提取html内容 如：span style=\"00DB00\">192.168.200.90</span>
 * @param content
 * @returns {*}
 */
export function extractHtmlContent (content) {
  let extractReg = /<.*?>(.+)<\/.*?>/
  let extractAry = extractReg.exec(content)
  // 匹配不成功 192.168.200.90
  if (!extractAry) {
    return content
  }
  return extractAry[1]
}
