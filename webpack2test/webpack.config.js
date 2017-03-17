var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var outputPath = path.join(__dirname, "/build");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

/*
	多个入口文件，但是还没有区分顺序；
	js，css文件分离，并增加hash：5后缀；
	js，css，html文件压缩；
	less文件的编译；
	提取公共的js文件；
	还没有实现的功能：
	es6文件的编译；
	分包的机制？？？app.js跟own.js如果有顺序，那么该怎么办？？？
	如果是多个html文件，引入不同的js文件，该怎么做？？？
	如何辨别压缩后的代码，map机制还没有实现？？？
	编译出来的css文件名不是原来的css文件名？？？
*/

//把css提取出来，用到的是下面这个插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	//下面这种方式的写两个入口文件，最终还是会打包成一个
	//entry: [__dirname+"/src/scripts/app", __dirname+"/src/scripts/owner"],
	entry: {
		app: __dirname+"/src/scripts/app",
		owner: __dirname+"/src/scripts/owner" 
	},
	output:{
		path:outputPath,
		filename:"scripts/[name]-[chunkhash:5].js"
	},
	module: {
		rules: [
			{
				test:/\.es$/,
				use: ["babel-loader"]								
			},
			{
				test:/\.less$/i,
				//在这个loader的阶段，ExtractTextPlugin 它在中间插了一脚，把css从js中分离出来
				use: ExtractTextPlugin.extract({
						fallback: 'style-loader',	
						use: ['css-loader', 'less-loader']
					})
			}
		]
	},	
	plugins: [
		//提取公共模块的js
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minify: {
				collapseWhitespace: true
			},
			filename: "scripts/[name].[chunkhash:5].bundle.js"
		}),
		//js和css分离
		new ExtractTextPlugin({filename:"stylesheets/[name]-[chunkhash:5].css"}),
		//编译html，并向编译后的html自动注入js和css
		new htmlWebpackPlugin({
			filename: "views/index.html",  
			template:__dirname+"/src/views/index.html",
			minify: {
				removeCommets: true,
				collapseWhitespace: true
			}
		}),
		//代码压缩插件
		new uglifyJsPlugin({
			compress : {
				warnings: false
			}
		})
	],
	resolve: {
		extensions: [".js", ".css", ".es"]
	}
}