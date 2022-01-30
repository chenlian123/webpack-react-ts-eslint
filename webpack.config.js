// Loaders webpack需要loaders解析模块，webpack想要理解 JavaScript css img ts Babel 都需要相应的loder规则
// webpack做的事: 1. 将最新的javascript特性编译成es5 浏览器理解的 2. 模块化css 将scss和less编程成css 3.导入图片 字体等静态资源 3.使用自己想要的框架 如React
// 希望js中导入css 以及将css注入dom，使用css高级特性如cssnext 需要依赖库 css-loader--解析css导入 style-loader-将css注入DOM
// postcss-loader-用post处理css postcss-preset-env-PostCSS的默认配置
//postcss 是一个允许使用JS插件转换样式的工具，这些插件可以检车你的css 支持css variables 和Mixins ，编译尚未被浏览器广泛支持的先进的css语法，内联图片以及其他很多优秀功能
// postcss-next -PostCSS 的插件 可以使用最新的CSS语法
//HMR 当我们改动代码的时候希望能自动重新编译代码，webpack提供了三种不同的方式：1.监听模式 watch 2.webpack-dev-serve 浏览器自动刷新  3.webpack-dev-middleware
//webpack-dev-serve 提供了服务区和reloading 的功能
const path = require('path') //文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin') //html插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin') //打包前清楚dist插件
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') //命令行友好提示插件
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',//更好的追踪代码source map
    entry: {
        app: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react你好",
            template: path.resolve(__dirname, './index.html'),
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new friendlyErrorsWebpackPlugin()
    ],
    module: {
        rules: [
            //js
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //图片
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            //字体
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // CSS, PostCSS, and Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                }, 'postcss-loader'],
            },
            //ts
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, "./dist")
        },
        hot: true,
        historyApiFallback: true
    }
}