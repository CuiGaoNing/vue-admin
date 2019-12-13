<template>
  <div :style="[{ padding: '0', 'text-align': 'center' }, styles]">
    <el-pagination
      v-show="tableData.total"
      small
      background
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :current-page.sync="tableData.pageNum"
      :page-size="tableData.pageSize"
      :total="isLimit ? totalLimit : tableData.total"
      @size-change="tableSizeChange"
      @current-change="tablePageChange"
    >
      <slot>
        <span class="el-pagination__total">
          共 {{tableData.total}} 条
          <template v-if="isLimit">，最多展示 {{totalLimit}} 条</template>
        </span>
      </slot>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'idss-pagination',
  props: {
    // 表格数据，通常要包含 { pageNum: number, pageSize: number, total: number }
    tableData: {
      type: Object,
      required: true
    },
    // 样式控制，相同名称会覆盖已有样式
    styles: {
      type: Object
    },
    // 限制最大显示条数
    totalLimit: {
      type: Number
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default () {
        return 'total, prev, pager, next, jumper'
      }
    },
    // 每页显示条目个数
    pageSizes: {
      type: Array,
      default () {
        return [20, 50, 100, 200]
      }
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default () {
        return 7
      }
    }
  },
  computed: {
    /**
      * 是否包含最大展示数据条数限制
      */
    isLimit () {
      return this.totalLimit && this.tableData.total > this.totalLimit
    }
  },
  methods: {
    /**
     * 每页展示条数发生改变
    */
    tableSizeChange (pageSize) {
      // 改变每页展示条数后，回到首页
      this.$emit('size-change', { pageSize, type: 'sizeChange' })
    },
    /**
     * 页码发生改变（注意：页面相同时不会触发current-change事件，current-page默认为1）
    */
    tablePageChange (pageNum) {
      this.$emit('page-change', { pageNum, type: 'pageChange' })
    }
  }
}
</script>
