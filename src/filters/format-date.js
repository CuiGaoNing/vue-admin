import { formatDate } from '@/lib/format.js'

export default {
  name: 'formatDate',
  handler: function (value, options) {
    var format
    options = options || 'yyyy-MM-dd hh:mm:ss'
    if (typeof (value) === 'string') value = parseInt(value)
    if (isNaN(value) || value === null) {
      format = '-'
    } else {
      format = formatDate.call(new Date(value), options)
    }
    return format
  }
}
