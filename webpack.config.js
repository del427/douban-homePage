//引入Path
const path = require('path');

//html模块导出
const HtmlWebpackPlugin = require('html-webpack-plugin');

//压缩代码
const uglifyjs = require('uglifyjs-webpack-plugin');

//单独css
const MiniCss = require('mini-css-extract-plugin');

//判断下环境变量 设置通过后台export NODE_ENV=development
const devMode = process.env.NODE_ENV !== 'production';

//引入添加css前缀
const autoPreFixer = require('autoprefixer');

//引入webpack
const webpack = require('webpack')

//自动加载模块
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    entry:{
        index:'./src/js/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js',
        //本地路径 静态资源路径
        publicPath:'../',

        // 单独导出html开启服务器
        // publicPath:'http://localhost:9991/src/html',

        //  html插件导出html开启服务器
        //  publicPath:'http://localhost:9991/src',
    },
    //开发环境
    // mode:'development',
    //生产环境
    mode:'development',
    //服务器参数设置
    devServer:{
        port:9991,
        
    },
    module:{
        rules:[
            {
                //less文件
                test:/\.(less|css)$/,
                //css和js一个文件
                // use:['style-loader','css-loader','less-loader'],
                //单独打包css
                use:[MiniCss.loader,'css-loader',{loader: 'postcss-loader',options:{plugins:[require("autoprefixer")("last 100 versions")]}},'less-loader'],
            },
            {
                //sass文件
                test:/\.(scss|sass|css)$/,
                //css和js一个文件
                // use:['style-loader','css-loader','less-loader'],
                //单独打包css
                use:[MiniCss.loader,'css-loader',{loader: 'postcss-loader',options:{plugins:[require("autoprefixer")("last 100 versions")]}},'sass-loader']
            },
            {
                //单独抽离html,需要在html里引入css和js文件
                //如果是开启服务器自动刷新的话,output的路径拼接,要后面要添加html,
                //引入的路径要改下和output的路径拼接
                // test:/\.(html|htm)$/,
                // use:[{
                //         //对html进行配置
                //         loader:'file-loader',
                //         options:{
                //             name:'html/[name].[ext]',
                //     }},
                //     {
                //         //单独抽离html
                //         loader:'extract-loader',
                //     },
                //     {
                //         //找到html
                //         loader:'html-loader'
                //     }]
            },
            {
                test:/\.(jpg|png)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:8192,
                        name:'img/[name].[ext]'
                    }
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                }
            },
        ]
    },
    plugins:[
        // 导出html模版,自动引入js和html文档,如果有多个html文件,就加载多次插件
        new HtmlWebpackPlugin({
            title:'webpack',
            //加载路径
            template:'./src/html/index.html',
            //导出路径
            filename:'html/index.html'
        }),
      
        new MiniCss({
            filename:devMode ? 'css/[name].css' : 'css/[name]_[contenthash:8].css',
        }),
        // new uglifyjs(),
        providePlugin,
    ]
}