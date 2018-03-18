let path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// let pages = ['index', 'base'];
// pages = pages.map(page => new HtmlWebpackPlugin({
//   template: './src/index.html',//指定产的HTML模板
//   filename: `${page}.html`,//产出的HTML文件名
//   title: `${page}`,
//   chunks: [`${page}`],//在产出的HTML文件里引入哪些代码块
//   hash: true,// 会在引入的js里加入查询字符串避免缓存,
//   minify: {
//     removeAttributeQuotes: true
//   }
// }));
//['./src/index.js','./src/base.js'],
module.exports = {
  entry: {
      entry:'./src/main.js',
     // index:'./src/index.js',
     // base:'./src/base.js'
  },
    resolve: {
        //引入模块的时候，可以不用扩展名
        extensions: [".js", ".less", ".json"],
        alias: {//别名
            "bootstrap": "bootstrap/dist/css/bootstrap.css"
        }
    },
    //表示监控源文件的变化，当源文件发生改变后，则重新打包
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,//每秒钟询问的次数
        aggregateTimeout: 500//
    },
  output: {
    path: path.join(__dirname, 'dist'),//只能写绝对路径
    filename: '[name].[hash].js'//打包后的文件名
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }
      // },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }, {
            //file-loader是解析图片地址，把图片从源位置拷贝到目标位置并且修改原引用地址
            //可以处理任意的二进制，bootstrap 里字体
            //url-loader可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
            test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
            loader: {
                loader: 'url-loader',
                options: {
                    limit: 5 * 1024,
                    //指定拷贝文件的输出目录
                    outputPath: 'images/'
                }
            }
        },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),

    new HtmlWebpackPlugin({
      template: './src/index.html',//指定产的HTML模板
      filename: 'index.html',
        title: 'index',
        hash: true,// 会在引入的js里加入查询字符串避免缓存,
        minify: {
            removeAttributeQuotes: true
        }
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',//指定产的HTML模板
    //   filename: 'base.html',
    //   title: 'hello base!',
    //   chunks: ['base']
    // }),
    // ...pages
  ],
  //配置静态文件服务器，可以预览打包后的项目
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 8080,
    compress: true//服务器返回给浏览器是否使用gzip压缩
  }
}