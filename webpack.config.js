var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//单独打包css
var extractCSS = new ExtractTextPlugin('[name].css');  //单独打包css
var extractLESS = new ExtractTextPlugin('[name].less');//单独打包less
module.exports = {
    devtool:'eval-source-map',
    //入口文件
    entry:{
        //指定打包公业务模块  默认打包index.js中的依赖
        'module/login/index':['./src/module/login'],
        'module/reg/index':['./src/module/reg'],
        'module/home/index':['./src/module/home'],
        'module/aboutUs/index':['./src/module/aboutUs'],
        'module/easyData/index':['./src/module/easyData'],
        'module/easyDesign/index':['./src/module/easyDesign'],
        'module/easyPrice/index':['./src/module/easyPrice'],
        'module/help/index':['./src/module/help'],
        //指定打包公共模块
        'common/common':['./src/common/js/cookie.js'],
    },
    //入口文件输出配置
    output:{
        path:'dist/',
        filename:'[name].js'  //name为entry中配置的key
    },
    module: {
        loaders: [
            //{
                //test: /\.(less|css)$/, //匹配的文件名 单独打包css 需要手动在用link 引入
                //loader: ExtractTextPlugin.extract('style', 'css!less') //编译less文件
            //}
            {test:/\.css$/,loader: 'style!css'},//css打包进js,动态放入html<style></style>内
            {test:/\.less$/,loader:'style!css!less'},//编译less文件
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        ]
    },
    plugins: [
        // extractCSS   //打包css
        //extractLESS   //打包less
    ],
    //其它配置
    resolve:{
        //设根路径 查找module的话从这里开始查找(如果设置此项，无法自动编译更新文件)
        // root:'d://testWebpack/src',
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions:['','.js','.json','.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias:{
            shortName1:'/js/page1/index.js'
        }
    }
    //配置本地服务器
    //devServer:{
    //    contentBase:'../testWebpack',//本地服务器所加载的页面所在的目录
    //    colors:true,//终端中输出结果为彩色
    //    istoryApiFallback: true,//不跳转,
    //    inline: true//实时刷新
    //}

}