<template>
  <div style="text-align: center;">
    <h1>您无权访问此页面</h1>
    <div style="margin-top: 20px;">
      <el-button size="small">
        <router-link :to="{name: 'index'}" tag="span">返回系统首页</router-link>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'permission-403',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
