<template>
  <div>
    <el-form :model="loginForm" label-width="100px" class="login-class">
      <el-form-item
        prop="user"
        label="用户"
      >
        <el-input v-model="loginForm.user"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
      >
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login" style="width: calc(100% - 100px);margin-left: 100px;">登录</el-button>
    </el-form>
  </div>
</template>

<script>
const API = {
  LOGIN: {
    url: '/api/login',
    method: 'post'
  },
  PUBLIC_KEY: {
    url: '/api/getPublicKey',
    method: 'post'
  }
}
export default {
  name: 'login',
  computed: {
  },
  data () {
    return {
      loginForm: {
        user: 'test',
        password: '1111111111'
      }
    }
  },
  methods: {
    login () {
      try {
        // 获取token
        this.$request({
          ...API.LOGIN,
          data: this.loginForm
        }, {
          isToken: false,
          isPromptError: false
        }).then((content) => {
          this.loading = false
          let { csrfToken, csrfHeaderName, role } = content
          window.localStorage.setItem('current', this.loginForm.userName)
          // 存储 token
          this.$store.commit('SET_TOKEN', [csrfHeaderName, csrfToken, role])
          // 路由跳转
          let { redirect } = this.$route.query
          if (redirect) {
            delete this.$route.query.redirect
            // this.$router.push({ path: '/' })
            location.href = this.$router.resolve({ path: '/fe' }).href
            // this.$router.push({
            //   path: redirect
            // })
          } else {
            // this.$router.push({ path: '/' })
            location.href = this.$router.resolve({ path: '/fe' }).href
          }
        }, (error) => {
          this.loading = false
          console.log(error)
        })
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.login-class{
  width: 34%;
  margin: 70px auto;
  text-align: center;
}
</style>
