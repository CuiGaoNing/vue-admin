/**
 * 通用转换方法，单条数据【一维】
 * @param [{key: '', name: '', value},{key: '', name: '', value: ''},...]
 * result: {xAxis: [], series: []}
 * {name: item.key, value: item.value, xAxis: item.key}
 * name 为一条数据中所对于的key值，xAxis 为一条数据中单值key的值
 */
const _data2Single = function (data) {
  let result = {
    legend: [], // 单曲线legend为空
    xAxis: [],
    series: [{ data: [] }] // 要求的返回格式：{name: '', data: [{name: '', value: 0}]}
  }
  if (Array.isArray(data) && data.length) {
    data.map((item) => {
      result.xAxis.push(item.name)
      result.series[0].data.push({ name: item.key, value: item.value, xAxis: item.key })
    })
  }
  return result
}

/**
 * 【common】转换为多曲线
 * @param [{key: '', name: '', value: [{key: '', name: '', value: ''}, {...}]}, {...}]
 * result: {legend: [], xAxis: [], series: []}
 */
const _data2Multiple = function (data) {
  let result = {
    legend: [],
    xAxis: [],
    series: [] // 要求的返回格式：{name: '', data: [{name: '', value: 0}]}
  }
  if (Array.isArray(data) && data.length) {
    data.map((item, index) => {
      let itemData = []
      result.legend.push(item.name)
      item.value.map(d => {
        // x轴数据
        index === 0 && result.xAxis.push(d.name)
        itemData.push({ name: item.key, value: d.value, xAxis: d.key })
      })
      itemData.length && result.series.push({
        name: item.name,
        data: itemData
      })
    })
  }
  return result
}

/**
 * 接口数据，转换为曲线使用数据
 */
const data2Line = function (data) {
  let result = {
    legend: [],
    xAxis: [],
    series: [] // 要求的返回格式：{name: '', data: [{name: '', value: 0}]}
  }

  if (Array.isArray(data) && data.length) {
    // value为数组的， 为多条曲线
    result = Array.isArray(data[0].value) && data[0].value.length ? _data2Multiple(data) : _data2Single(data)
  }
  return result
}

/**
 * 接口数据，转换为饼图使用数据
 */
const data2Pie = function (data = []) {
  let result = {
    legend: [],
    series: [] // {key: '', name: '', data: 200}
  }
  if (Array.isArray(data) && data.length) {
    // 拼接 legend 和 series
    data.map(item => {
      result.legend.push(item.name)
      result.series.push({
        key: item.key,
        name: item.name,
        data: item.value
      })
    })
  }
  return result
}

/**
 * 接口数据，转换为饼图(环形)使用数据
 */
const data3Pie = function (data = []) {
  let result = {
    legend: [],
    series: [] // {key: '', name: '', data: 200}
  }
  if (Array.isArray(data) && data.length) {
    // 拼接 legend 和 series
    data.map(item => {
      result.legend.push(item.name)
      result.series.push({
        name: item.name,
        data: item.value,
        data1: 100 - item.value
      })
    })
  }
  return result
}
export {
  data2Line,
  data2Pie,
  data3Pie
}
