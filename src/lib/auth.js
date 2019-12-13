
import Cookies from 'js-cookie'

let TokenKey = {
  key: 'web-refactor-token',
  value: '1542187743668'
}

let LoginInfoKey = {
  key: 'web-refactor-loginInfo',
  value: '1545213508247'
}

export function getToken () {
  if (TokenKey.value === '' || Cookies.get(TokenKey.value) === undefined || Cookies.get(TokenKey.value) === 'undefined') {
    return undefined
  } else {
    return JSON.parse(Cookies.get(TokenKey.value))
  }
}

export function getLoginInfo () {
  if (LoginInfoKey.value === '' || Cookies.get(LoginInfoKey.value) === undefined || Cookies.get(LoginInfoKey.value) === 'undefined') {
    return undefined
  } else {
    return JSON.parse(Cookies.get(LoginInfoKey.value))
  }
}

export function setToken (token) {
  // clearAllCookie()
  return Cookies.set(TokenKey.value, JSON.stringify(token), { expires: 7 })
}

export function setLoginInfo (info) {
  // clearAllCookie()
  return Cookies.set(LoginInfoKey.value, JSON.stringify(info), { expires: 7 })
}

export function removeToken () {
  if (TokenKey.value === '') {
    return undefined
  } else {
    return Cookies.remove(TokenKey.value)
  }
}

export function removeLoginInfo () {
  if (LoginInfoKey.value === '') {
    return undefined
  } else {
    return Cookies.remove(LoginInfoKey.value)
  }
}
// function clearAllCookie () {
//   let keys = document.cookie.split(';').map(item => {
//     return item.split('=')[0].replace(/^\s*/, '')
//   })
//   !keys || keys.map(item => {
//     Cookies.remove(item)
//   })
// }
