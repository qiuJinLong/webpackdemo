var $ = require("jquery");
function init() {
	console.log("owner index");
}
init();
const myFn = (data) => {
	console.log(data);
	console.log("es6 编译之后的文件");
}
myFn("Hello es6");
console.log("owner jquery:", $);