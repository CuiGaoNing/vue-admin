const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: 'error',
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8448,
    https: false,
    hotOnly: false,
    proxy: {
      '/api/': {
        target: 'http://localhost:8447',
        // target: 'https://localhost:8489',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        performance: {
          hints: false // 去除打包文件超大时的警告
        },
        plugins: [
          new ParallelUglifyPlugin({
            cacheDir: '.uglify-cache', // 缓存打包文件的目录，在下次有相同输入时直接使用缓存的文件提升打包效率
            uglifyES: {
              output: {
                // 最紧凑的输出
                beautify: false,
                // 删除注释
                comments: true
              },
              compress: {
                warnings: true,
                pure_funcs: ['console.log', 'console.warn', 'console.info']
              }
            }
          }),
          new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 1024, // 对超过10K的数据进行压缩
            deleteOriginalAssets: false // 是否删除源文件
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule.use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  transpileDependencies: [
    'element-ui'
  ]
}
