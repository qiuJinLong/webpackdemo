# 纯用 yarn 实现模块依赖管理的 webpack1 小例子
# tag 0.1
# yarn install
# webpack
# 运行build/views/index.html
# window环境下，先全局安装webpack 1.13.3

# tag0.2 已实现的功能：
多个入口文件，但是还没有区分顺序；
js，css文件分离，并增加hash：5后缀；
js，css，html文件压缩；
less文件的编译；
提取公共的js文件；
还没有实现的功能：
es6文件的编译；

# tag0.2 待解决的问题：
分包的机制？？？app.js跟own.js如果有顺序，那么该怎么办？？？
如果是多个html文件，引入不同的js文件，该怎么做？？？
如何辨别压缩后的代码，map机制还没有实现？？？
编译出来的css文件名不是原来的css文件名？？？
如何和swig模板引擎结合？？？
