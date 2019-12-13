<template>
  <div class="bread">
    <el-collapse-transition>
      <el-breadcrumb class="app-breadcrumb" separator="/" :class="!isMenuOpen ? 'left-95' : 'left-180'">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
          <span v-if="index==levelList.length-1" class="no-redirect txt-ellipsis">{{item.title}}</span>
          <span v-else class="no-redirect txt-ellipsis hove-bread" @click="toClick(item)">{{item.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-collapse-transition>
    <div class="date-st">
      <span class="time-st">{{formatDate(time)}}</span>  <idss-icon-svg name="yonghushuoming" style="font-size: 18px;margin-left: 10px;"></idss-icon-svg>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/lib/format.js'
import userMixins from '@/mixins/userMixins'
import BusFactory from '@/lib/bus.js'
let bus
export default {
  name: 'AppBreadcrumb',
  mixins: [userMixins],
  created () {
    bus = BusFactory(this)
    this.getBreadcrumb()
    this.getSystemTime()
  },
  props: ['isMenuOpen'],
  data () {
    return {
      levelList: null,
      time: new Date().getTime()
    }
  },
  watch: {
    isMenuOpen: {
      handler (curVal) {
      }
    },
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    toClick (param) {
      if (this.$router.currentRoute.meta.notallow) {
        bus.$emit('menuClick', param.name)
      } else {
        this.$router.push({ name: param.name })
      }
    },
    formatDate (timestamp) {
      return formatDate.call(new Date(+timestamp), 'yyyy-MM-dd hh:mm:ss ')
    },
    generate (matched) {
      let result = []
      if (matched[1].meta.breadcrumb) {
        result = [ ...result, ...JSON.parse(JSON.stringify(matched[1].meta.breadcrumb)) ]
        result.push({
          name: matched[1].name,
          title: this.$route.query.breadcrumb || matched[1].meta.title
        })
      } else {
        result.push({
          name: matched[1].name,
          title: this.$route.query.breadcrumb || matched[1].meta.title
        })
      }
      return result
    },
    getBreadcrumb () {
      this.levelList = this.generate(this.$route.matched)
      // let matched = this.$route.matched.filter(item => item)
      // this.levelList = matched
    }
  },
  mounted () {
  }
}
</script>

<style  lang="scss" scoped>
@import '@/styles/common.scss';
.bread {
  min-width: 1250px !important;
}
/deep/.hove-bread {
  cursor: pointer !important;
}
.hove-bread:hover {
  font-weight: bold;
  cursor: pointer;
}
/deep/.el-breadcrumb__item .el-breadcrumb__inner a:hover {
  color: $title-color;
  text-decoration: none;
}
/deep/.el-breadcrumb__separator {
  color: $title-color;
}
.date-st {
  position: fixed;
  right: 10px;
  top: 80px;
  z-index: $zindex-bread-above;
  font-size: $font-size-12;
  color: $title-color;
}
.time-st {
  position: absolute;
  width: 130px;
  right: 20px;
  top: 3px;
}
.left-180{
  animation: open 0.45s;
  left: 180px;
}
.left-95{
  animation: close 0.45s;
  left: 95px;
}
@keyframes open
{
  from {left:95px;}
  to {left:180px;}
}

@-moz-keyframes open
{
  from {left:95px;}
  to {left:180px;}
}

@-webkit-keyframes open
{
  from {left:95px;}
  to {left:180px;}
}

@-o-keyframes open
{
  from {left:180px;}
  to {left:180px;}
}
@keyframes close
{
  from {left:180px;}
  to {left:95px;}
}

@-moz-keyframes close
{
  from {left:180px;}
  to {left:95px;}
}

@-webkit-keyframes close
{
  from {left:180px;}
  to {left:95px;}
}

@-o-keyframes close
{
  from {left:180px;}
  to {left:95px;}
}
.app-breadcrumb{
  display: flex;
  position: fixed;
  top: $header-height;
  border-top: 1px solid $bread-color;
  right: 0;
  z-index: $zindex-bread;
  width: inherit;
  height: 40px;
  padding: 0 20px 0 0;
  background: $white;
  color: $bread-color;
  padding-left: 10px;
  &.el-breadcrumb {
    font-size: $font-size-10;
    /deep/ .el-breadcrumb__inner{
      cursor: pointer;
      & a{
        font-weight: normal;
        cursor: pointer;
        &:hover{
          font-weight: bold;
          text-decoration: underline;
        }
      }
    }
    .no-redirect {
      color: $black;
      cursor: text;
    }
    .redirect {
      color: $black;
      cursor: text;
    }
  }
}
.app-breadcrumb /deep/ .el-breadcrumb__item{height: 25px;margin-top: 5px;line-height: 24px;text-align: center;}
.app-breadcrumb /deep/ .el-breadcrumb__item .el-breadcrumb__inner{display: inline-block}
.app-breadcrumb /deep/ .el-breadcrumb__item .el-breadcrumb__separator{display: inline-block;position: absolute;margin-left: -2px;}
.app-breadcrumb /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__separator{display: none;}
.app-breadcrumb .el-breadcrumb__inner .txt-ellipsis{display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 0 10px;}
</style>
