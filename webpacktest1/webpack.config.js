var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
	entry: __dirname+"/src/scripts/app",
	output:{
		path:__dirname+"/build",
		filename:"scripts/[name]-[hash].js"
	},
	module: {
		loaders: [
			{	
				/* test相当于正则的test方法，看文件名这个string是否包含我们写的正则 */
				test:/\.css$/,
				loader:"style-loader!css-loader"  

			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			/* 
				views/index.html前边不能加/来变成/views/index.html，
				因为/一般都代表根目录，如果加了就会使引用文件的路径变乱。
				不加的时候生成的script是<script src="../scripts/main-19d7224ad91df7c52119.js"></script>
               如果加了，src就会变成src="../xampp/htdocs/toolwk/webpacktest1/build/scripts/main-19d7224ad91df7c52119.js"

			*/
			filename: "views/index.html",  
			template:__dirname+"/src/views/index.html"
		}),
		new uglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	resolve: {
		extensions: ["", ".js", ".css"]
	}
}