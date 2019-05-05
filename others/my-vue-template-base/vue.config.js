const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9528 // dev port

module.exports = {

    devServer: {
        port: port,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        proxy: {
          // change xxx-api/login => mock/login
          // detail: https://cli.vuejs.org/config/#devserver-proxy
          [process.env.VUE_APP_BASE_API]: {
            target: `http://localhost:${port}/mock`,
            changeOrigin: true,
            pathRewrite: {
              ['^' + process.env.VUE_APP_BASE_API]: ''
            }
          }
        },
        after: require('./mock/mock-server.js')
      },

    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}