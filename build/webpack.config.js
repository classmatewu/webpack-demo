const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    /**
     * 开发模式
     */
    mode : 'development',

    /**
     * 开启 scourceMap
     */
    devtool : 'cheap-source-map',

    /**
     * 入口文件
     */
    entry : './app.js',

    /**
     * 打包出口
     */
    output : {
        filename : '[name].[hash:8].js', // 
        // filename : 'bundle.js',
        path : path.join(__dirname, '../dist')
    },

    /**
     * plugins配置，plugin的配置是一个数组，每一个plugin是一个对象
     */
    plugins : [
        new HtmlWebpackPlugin({
          template : path.resolve(__dirname, '../public/index.html'),
          filename: 'index.html'
        })
    ]
}
