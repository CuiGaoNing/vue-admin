<template>
  <div class="home-monitor">cccccccccccc
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'
import { formatDate } from '@/lib/format.js'
import { data2Line } from '@/lib/data-factory.js'
export default {
  name: 'home-monitor',
  mixins: [globalMixins],
  data () {
    return {
      cpuConfig: {
        series: {
          showSymbol: false
        },
        yAxis: {
          name: '%',
          nameTextStyle: {
            padding: [0, 0, 0, 0],
            color: '#666666'
          },
          nameGap: 12,
          splitLine: {
            show: false
          },
          max: 100,
          minInterval: 100,
          min: 0
        }
      },
      memConfig: {
        series: {
          showSymbol: false
        },
        yAxis: {
          name: '%',
          nameTextStyle: {
            padding: [0, 0, 0, 0],
            color: '#666666'
          },
          nameGap: 12,
          splitLine: {
            show: false
          },
          max: 100,
          minInterval: 100,
          min: 0
        }
      },
      diskConfig: {
        series: {
          showSymbol: false
        },
        yAxis: {
          name: 'KB/s',
          nameTextStyle: {
            padding: [0, 0, 0, 0],
            color: '#666666'
          },
          nameGap: 12,
          splitLine: {
            show: false
          },
          splitNumber: 1,
          min: 0
        }
      },
      netConfig: {
        series: {
          showSymbol: false
        },
        yAxis: {
          name: 'KB/s',
          nameTextStyle: {
            padding: [0, 0, 0, 0],
            color: '#666666'
          },
          nameGap: 12,
          splitLine: {
            show: false
          },
          splitNumber: 1,
          min: 0
        }
      },
      cpuTemData: [],
      memTemData: [],
      diskTemData: [{ key: '读取速度', name: '读取速度', value: [] }, { key: '写入速度', name: '写入速度', value: [] }],
      netTemData: [{ key: '接收速率', name: '接收速率', value: [] }, { key: '发送速率', name: '发送速率', value: [] }],
      cpuData: undefined,
      memData: undefined,
      diskData: undefined,
      netData: undefined
    }
  },
  methods: {
    handle (data) {
      this.initData()
      if (this.cpuTemData.length >= 60) {
        this.cpuTemData.shift()
        this.memTemData.shift()
        this.diskTemData[0].value.shift()
        this.diskTemData[1].value.shift()
        this.netTemData[0].value.shift()
        this.netTemData[1].value.shift()
      }
      this.cpuTemData.push({ key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'), name: formatDate.call(new Date(data.time), 'mm:ss'), value: data.cpuUsage })
      this.memTemData.push({ key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'), name: formatDate.call(new Date(data.time), 'mm:ss'), value: data.memUsage })
      this.diskTemData[0].value.push({
        key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'),
        name: formatDate.call(new Date(data.time), 'mm:ss'),
        value: data.ioRead
      })
      this.diskTemData[1].value.push({
        key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'),
        name: formatDate.call(new Date(data.time), 'mm:ss'),
        value: data.ioWrite
      })
      this.netTemData[0].value.push({
        key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'),
        name: formatDate.call(new Date(data.time), 'mm:ss'),
        value: data.netUsageGet
      })
      this.netTemData[1].value.push({
        key: formatDate.call(new Date(data.time), 'yyyy-MM-dd hh:mm:ss'),
        name: formatDate.call(new Date(data.time), 'mm:ss'),
        value: data.netUsageSend
      })
      this.cpuData = data2Line(this.cpuTemData)
      this.cpuData.tooltipFormatter = (o) => {
        return [
          `时&nbsp;&nbsp;&nbsp;&nbsp;间: ${o.name || '-'}`,
          `使用率: ${o.value}%`
        ].join('<br/>')
      }
      this.memData = data2Line(this.memTemData)
      this.memData.tooltipFormatter = (o) => {
        return [
          `时&nbsp;&nbsp;&nbsp;&nbsp;间: ${o.name || '-'}`,
          `使用率: ${o.value}%`
        ].join('<br/>')
      }
      this.diskData = data2Line(this.diskTemData)
      this.diskData.tooltipFormatter = (o) => {
        return [
          `时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间: ${o[0].data.xAxis || '-'}`,
          `${o[0].data.name}: ${o[0].data.value}KB/s`,
          `${o[1].data.name}: ${o[1].data.value}KB/s`
        ].join('<br/>')
      }
      this.netData = data2Line(this.netTemData)
      this.netData.tooltipFormatter = (o) => {
        return [
          `时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间: ${o[0].data.xAxis || '-'}`,
          `${o[0].data.name}: ${o[0].data.value}KB/s`,
          `${o[1].data.name}: ${o[1].data.value}KB/s`
        ].join('<br/>')
      }
    },
    initData () {
      if (this.cpuTemData.length === 0) {
        for (let index = 0; index <= 60; index++) {
          this.cpuTemData.push({ name: '', value: '-' })
          this.memTemData.push({ name: '', value: '-' })
          this.diskTemData[0].value.push({ name: '', value: '-' })
          this.diskTemData[1].value.push({ name: '', value: '-' })
          this.netTemData[0].value.push({ name: '', value: '-' })
          this.netTemData[1].value.push({ name: '', value: '-' })
        }
      }
    },
    init () {
    }
  },
  created () {
  },
  // 关闭连接
  destroyed () {
  }
}
</script>
