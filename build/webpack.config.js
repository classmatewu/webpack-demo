const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

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
    module: {
        rules: [
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
            },
            {
                /**
                 * 使用babel“编译” + “适配”es6+语法
                 * 1. 为什么？为什么需要这么做？
                 *      因为有一些浏览器没有那么快支持es6+的语法，所以我们需要将我们的代码“转换”+“打补丁”，来让它可以正常地跑在多个浏览器上
                 * 2. 为什么是“编译”+”适配“？
                 *      编译是代码编译时在语法层面做的代码改造转换，例如将es6的箭头函数转换为普通函数。
                 *      ”适配“也就是”打补丁“，这种方式不是在编译时对代码进行的改造转换，而是**额外**得加上一些“补丁”，例如不会去转换Promise，而是提供一个es5实现的Promise方法，来让代码可以正常运行
                 * 3. 在webpack中使用babel，需要以下几个依赖（且注意版本对应问题，最好同时安装，而不是分开安装）：
                 *      babel-core：babel编译库的核心包
                 *      babel-loader：可以针对指定的文件进行babel改造，webpack中的loader对应某一类文件
                 *      babel-preset-env：编译规则，表示支持对哪些es6+语法进行babel，这个库包含了es6-最新的Storag 4语法
                 *      babel-polyfill：给代码打补丁，增加一些es5实现的兼容性API，但直接用这个工具库会有坑，会污染全局或者多模块重复引入，所以我们一般选择用babel-plugin-transform-runtime + babel-runtime
                 * 4. options参数可以写在根目录的.babelrc里面，效果是一样的
                 */
                 test: /\.js$/,
                 exclude: '/node_modules/',
                 use: {
                    loader: 'babel-loader',
                    // options参数也可以写在 .babelrc 文件中
                    // options: {
                    //     // 也可以写成presets:['env']
                    //     presets: ['babel-preset-env'], // 按照esX规则进行代码编译
                    //     plugins:['transform-runtime'], // 打补丁
                    // }
                 },
            },
            {
                /**
                 * 编译 .vue 文件
                 */
                test: /\.vue$/,
                use: ['vue-loader']
            },
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
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],

    /**
     * 起一个devServer本地服务器，一方面方便用于前端发起网络请求。另一方面方便做一些热更新
     */
    //配置开发服务器
    devServer: {
        //设置端口号
        port: 8080,
        //开启热更新
        hot: true,
        //告诉服务器内容来源
        contentBase: path.join(__dirname, 'dist')
    },

    /**
     * 配置模块如何进行解析
     */
     resolve: {
        // 创建别名
        alias:{
            'vue$':'vue/dist/vue.runtime.esm.js',
            // 设置@引用的地址为根目录下的src
            '@':path.resolve(__dirname,"../src")
        },
        //按顺序解析以下数组后缀名的文件
        extensions:['*','.js','.json','.vue']
    },
}
