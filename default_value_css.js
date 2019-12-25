
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//css 中有个很让人两难的事情,即子节点会继承父节点的属性,而且还不能取消. 这在设置 line-height 等属性时会让设计出来的大小与设想中的不同
//这时候就要许原为 css 的默认缺省值,而这种值对于不同的属性又是不同的!!!
//所以只好定义一个缺省值的列表

//参考
// this.autoheight = function() {
//     //有很多种方法,不一定用这种
//     $("#" + this.name).css({"overflow": "hidden"});
//     //$("#" + this.name).css({"height": ""}); //必须清空//好像没用,要用 default 才行
//     //$("#" + this.name).css({"line-height": ""}); //必须清空/好像没用,要用 default 才行
//     //$("#" + this.name).css({"height": "default"}); //必须清空//好像没用,要用 default 才行//height 的缺省值应该是 auto
//     //$("#" + this.name).css({"line-height": "default"}); //必须清空/好像没用,要用 default 才行//line-height 的缺省值应该是 normal
// }//

var default_height = "auto";
var default_line_height = "normal";

var default_position = "static"; //static 	默认值. 没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）


