const path = require('path')
const fs = require('fs')
const http = require('http')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
let jsonfile = require('jsonfile')
jsonfile.spaces = 4

const app = new Koa()
const router = new Router()

router.use('*', function (ctx, next) {
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

app.use(bodyParser())

app.use(async (ctx) => {
  let url = ctx.request.url
  console.log(url)
  const replaceAPI = ctx.request.url.startsWith('/api')
  let filePath = path.join(__dirname, (replaceAPI ? ctx.request.path.replace('/api/', '') : ctx.request.path).replace('/query', '').replace('/delete', '') + '.json')
  let data

  console.log(filePath)

  if (fs.existsSync(filePath)) {
    try {
      data = jsonfile.readFileSync(filePath)
    } catch (err) {
      console.error('request: ' + url + ' fail!!!')
    }
  } else {
    console.warn('request: ' + url + ' not exist!!!!')
  }

  // 延迟1s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 300)
  })

  ctx.set('Content-Type', 'application/json')
  ctx.body = data
})

const port = 8447
const server = http.createServer(app.callback())
server.listen(port)
console.log(`'http://localhost:${port} listen!!!`)

// // WebSocket 服务
// const WebSocketServer = require('websocket').server
// // 开启 socket 服务
// const wsServer = new WebSocketServer({
//   httpServer: server,
//   // You should not use autoAcceptConnections for production
//   // applications, as it defeats all standard cross-origin protection
//   // facilities built into the protocol and the browser.  You should
//   // *always* verify the connection's origin and decide whether or not
//   // to accept it.
//   autoAcceptConnections: false
// })
// wsServer.on('request', function (request) {
//   const connection = request.accept('', request.origin)
//   console.log((new Date()) + ' Connection accepted.')
//   // 客户端消息监听
//   connection.on('message', function (message) {
//     if (message.type === 'utf8') {
//       console.log('Received Message: ' + message.utf8Data)
//     } else if (message.type === 'binary') {
//       console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
//     }
//   })
//   // 监听关闭
//   connection.on('close', function (reasonCode, description) {
//     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
//   })
//   // socket 消息推送
//   setInterval(() => {
//     connection.sendUTF(JSON.stringify(getRadomData()))
//   }, 1000)
// })

// function getRadomData () {
//   var cpuUsage = Math.random() * 100
//   var netUsageSend = Math.random() * 1000
//   var netUsageGet = Math.random() * 1000
//   var ioRead = Math.random() * 100
//   var memUsage = Math.random() * 100
//   var ioWrite = Math.random() * 100
//   var time = Date.now()
//   return { type: 'systemMonitor', content: { 'netUsageSend': netUsageSend, 'cpuUsage': cpuUsage, 'netUsageGet': netUsageGet, 'ioWrite': ioWrite, 'ioRead': ioRead, 'memUsage': memUsage, 'time': time } }
// }
