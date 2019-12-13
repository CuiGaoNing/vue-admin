<template>
  <div class="idss-widget relative" :class="{'is_border':!hideBorder, 'hide_margin': hideMargin}" :style="{'min-width': minWidth}">
    <header :class="{'bg-color' : bgColor, 'center': center}" v-if="title || $slots.title">
      <span class="title" v-if="title">{{title}}</span>
      <span class="title" v-if="$slots.title">
        <slot name="title"></slot>
      </span>
      <div class="top-right">
        <slot name="titleRight"></slot>
      </div>
    </header>
    <slot name="tool"></slot>
    <main :style="{'padding': padding}">
      <slot></slot>
    </main>
    <footer :style="{'padding-bottom': footerPadding}">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IdssWidget',
  props: {
    hideMargin: {
      type: Boolean,
      default: false
    },
    hideBorder: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    type: String,
    titleAlgin: {
      type: String,
      default: 'left'
    },
    title: String,
    padding: {
      type: String,
      default: '0'
    },
    footerPadding: {
      type: String,
      default: '0'
    },
    minWidth: String // 配置整个容器最小宽度属性
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .idss-widget {
    background-color: $white;
    margin-right: $widget-gutter;
    margin-bottom: $widget-gutter;

    &.is_border {
      // border: $widget-border;
      // border-top: $box-border-top;
      border-radius: $border-radius-default;
    }
    &.hide_margin {
      margin-right: 0;
      margin-bottom: 0;
    }
    & > header {
      // border-bottom: $header-bottom-border-color solid 1px;
      border-top-left-radius: $border-radius-default;
      border-top-right-radius: $border-radius-default;
      &.bg-color {
        background-color: $box-header-bgcolor;
      }
      & .top-right {
        position: absolute;
        z-index: 8;
        right: 10px;
        top: 0px;
      }
      &.left{
        text-align: left;
      }
      &.center{
        text-align: center;
      }
      &.right{
        text-align: right;
      }

      & > .title {
        display: inline-block;
        font-size: 1.6rem;
        line-height: 1;
        font-weight: bold;
        padding: 10px 15px;
        color: $box-title-color;
      }
    }
    & > footer {
      text-align: center;
    }
  }
</style>
