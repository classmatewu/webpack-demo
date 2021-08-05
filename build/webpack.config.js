const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

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
        filename : '[name].[hash:8].js', // 避免因缓存问题，没访问到最新文件
        // filename : 'bundle.js',
        path : path.join(__dirname, '../dist')
    },

    /**
     * loader配置，plugin的配置是一个数组，每一个plugin是一个对象
     * 注意：
     * loader的加载顺序是从上到下，**从右往左**的。
     * 从上到下好理解，符合正常的顺序逻辑，但为什么是从左到右呢？
     * 其实要从链式操作说起，链式操作有两种，
     * 一种是pipe（例如：gulp、ps aux | grep node 等），即管道，是连接起来的，上一个输出作为下一个输入，eg A -> B -> C
     * 另一种是compose，这种是函数式编程的组合概念，loader就是采用这种，eg：A(B(C()))，就想函数的调用顺序一样从里到外执行
     */
    module:{
        rules:[
            {
                /**
                 * 为什么解析css文件需要两个loader？分别是做什么的？
                 * css-loader：是帮我们解析css文件的，因为webpack打包工具只认识js文件
                 * style-loader：经过css-loader解析后的内容，需要挂载到style标签节点上，否则不生效，style-loader就是帮我们做这件事情的
                 */
                test: /\.css$/,
                use: ['style-loader','css-loader'] // css文件先经过css-loader处理，再经过style-loader处理
            },
            {
                /**
                 * 解析scss需要安装：npm install css-loader style-loader sass-loader node-sass -D
                 * 否则打包会报错
                 * 
                 * 扩展：
                 * 可以利用 postcss-loader autoprefixer 两个loader来为css添加浏览器前缀
                 * postcss类似babel的打补丁功能，根据caniuse网站自动给css加上兼容的前缀
                 * (一开始报错，结果降低了这两个loader的版本就好了，可能是跟其他的cssloader不兼容)
                 */
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader:'postcss-loader',
                    options:{
                        plugins:[require('autoprefixer')]
                    }
                }, 'sass-loader']
            },
            {
                /**
                 * file-loader搭配url-loader打包图片
                 * 小于 limit 的，则使用 url-loader 打包成base64，大于 limit 的则使用 file-loader 将文件移动到输出的目录中
                 */
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 1024 * 10, // 10M
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'images/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },

    /**
     * plugins配置，plugin的配置是一个数组，每一个plugin是一个对象
     */
    plugins : [
        new HtmlWebpackPlugin({
          template : path.resolve(__dirname, '../public/index.html'), // 模版
          filename: 'index.html' // 生成的文件名
        }),
        new CleanWebpackPlugin()
    ]
}
