var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var outputPath = path.join(__dirname, "/build");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
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
		filename:"scripts/[name]-[hash].js"
	},
	module: {
		loaders: [
			{
				test:/\.less$/i,
				loader:ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minify: {
				collapseWhitespace: true
			},
			filename: "scripts/[name].[hash:5].bundle.js"
		}),
		new ExtractTextPlugin("stylesheets/[name]-[hash:5].css"),
		new htmlWebpackPlugin({
			filename: "views/index.html",  
			template:__dirname+"/src/views/index.html"
		})	
	],
	resolve: {
		extensions: ["", ".js", ".css"]
	}
}