import { request } from '@/plugins/request'
import { getToken, setToken, removeToken } from '@/lib/auth'
const API = {
  VERSION: {
    url: '/api/getversion'
  }
}
const base = {
  state: {
    token: getToken(),
    version: '',
    productCode: '',
    serialNumber: '',
    menuList: [],
    timeDiffer: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    },
    SET_MENU_LIST (state, data) {
      state.menuList = data || []
    },
    SET_VERSION: (state, version) => {
      state.version = version
    },
    SET_PRODUCT_CODE: (state, code) => {
      state.productCode = code
    },
    SET_SERIAL_NUMBER: (state, number) => {
      state.serialNumber = number
    },
    SET_TIME_DIFFER: (state, number) => {
      state.timeDiffer = number
    }
  },
  actions: {
    LogOut ({ commit }) {
      commit('SET_TOKEN', {})
      removeToken()
    },
    async getVersion ({ commit }) {
      const content = await request({
        ...API.VERSION
      }, {
        isToken: false
      })
      commit('SET_VERSION', content.version)
    }
  }
}
export default base
