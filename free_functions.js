
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="functions.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法


//绝对定位函数
//要求大多数要支持 ie6,因为绝对定位是很成熟了的

//支持 ie6
function ScreenWidth()
{
    // 屏幕缩放因子：window.devicePixelRatio
    // 屏幕逻辑分辨率：window.screen.width * window.devicePixelRatio (缩放因子与物理分辨率的乘积)

    return window.screen.width; //这个是电脑的屏幕宽度

}//

//页面并不一定占满全部屏幕，所以一般是用的这个//可视区域，其实应该对应 window ,html 本身大小其实是可以超过可视区域的，这个概念很混乱，以后再说吧
function ScreenWidth_html()
{
    // 屏幕缩放因子：window.devicePixelRatio
    // 屏幕逻辑分辨率：window.screen.width * window.devicePixelRatio (缩放因子与物理分辨率的乘积)
    //例如，在 windows 高分屏笔记本下，window.devicePixelRatio 的值就是 1.25

    //return window.screen.width; //这个是电脑的屏幕宽度
    //return window.width; //这个是网页的宽度//不对
    var w = document.documentElement.clientWidth; //这个是网页的宽度//ie6 不支持
    if (w<1) 
    {
        //w = $(window).width();
        //document.documentElement 得到的是 html 
        //w = window.outerWidth;
        //w = document.documentElement.clientWidth;
        //w = document.documentElement.offsetWidth  * (1.0 / window.devicePixelRatio); //不对，ie6 下没有 devicePixelRatio
        w = document.documentElement.offsetWidth; //ie6 高分屏幕下直接是未计算放大系数的 1920，但是又不能取得放大系数，所以 ie6 下应该是没有办法取得正确的数值了的
    }

    return w;
}//

//支持 ie6
function ScreenHeight()
{
    // 屏幕缩放因子：window.devicePixelRatio
    // 屏幕逻辑分辨率：window.screen.width * window.devicePixelRatio (缩放因子与物理分辨率的乘积)

    return window.screen.height;
}//

//支持 ie6
//页面并不一定占满全部屏幕，所以一般是用的这个
function ScreenHeight_html()
{
    // 屏幕缩放因子：window.devicePixelRatio
    // 屏幕逻辑分辨率：window.screen.width * window.devicePixelRatio (缩放因子与物理分辨率的乘积)

    var h = document.documentElement.clientHeight; //这个是网页的宽度//ie6 不支持//chrome ok

    if (h<1) 
    h = document.documentElement.offsetHeight; //ie6 ok

    //奇怪，firefox 到这里还是 0
    if (h<1) 
    {
        h = window.height; //firefox no
        h = document.body.offsetHeight; //firefox no
        h = document.body.clientHeight; //firefox ok 但不一定对
    }

    return h;
}//

//全屏//像素绝对定位方式
function FullScreen_free(div_id)
{
    //var w = ScreenWidth();
    //var h = ScreenHeight();
    var w = ScreenWidth_html();
    var h = ScreenHeight_html();

    $("#" + div_id).css({"width": w, "height":h});
}//


//全屏
//百分比方式//其实 ie6 支持这种方式,只不过为了统一计算定位，所以还是用 FullScreen_free 吧
function FullScreen(div_id)
{
    //var w = ScreenWidth();
    //var h = ScreenHeight();
    var w = ScreenWidth_html();
    var h = ScreenHeight_html();

    $("#" + div_id).css({"width": "100%", "height":"100%"});
}//



//取 div 宽度
function Div_GetWidth(div_id)
{
    var h = $("#" + div_id).outerHeight();
    var w = $("#" + div_id).outerWidth();

    return w;
}//


//取 div 高度
function Div_GetHeight(div_id)
{
    var h = $("#" + div_id).outerHeight();
    var w = $("#" + div_id).outerWidth();

    return h;
}//

//取 div 宽度//客户端
function Div_GetWidth_client(div_id)
{
    var w = $("#" + div_id).width(); // 获得的是该div本身的宽度, (不包含padding,margin,border)
    var h = $("#" + div_id).height(); // 获得的是该div本身的高度, (不包含padding,margin,border)

    return w;
}//

//取 div 高度//客户端
function Div_GetHeight_client(div_id)
{
    var w = $("#" + div_id).width(); // 获得的是该div本身的宽度, (不包含padding,margin,border)
    var h = $("#" + div_id).height(); // 获得的是该div本身的高度, (不包含padding,margin,border)

    return h;
}//

//清空 body 默认的空白
//https://www.runoob.com/jsref/prop-doc-body.html
//提示: 与 document.documentElement 属性不同的是， document.body 属性返回 <body> 元素， document.documentElement 属性返回 <html> 元素
//支持 ie6
function HtmlBody_FullScreen_free()
{
    //$("#text").attr("href","http://www.baidu.com");
    //$("#" + this.name).css({"padding": _width});
    $(window.document.body).css({"padding": 0, "margin":0}); //jquery 操作 body 的方法//那么如何操作 <html> 元素呢？
    $(window.documentElement).css({"padding": 0, "margin":0}); //jquery 操作 body 的方法//那么如何操作 <html> 元素呢？//似乎 ie6 也支持

    //目的是实现以下的 css 样式
    // html,body{
    //     margin:0;
    //     padding:0;
    //  }    

}//

/*
 jquery获取html元素的绝对位置和相对位置
　　jquery获取html元素的绝对位置坐标和相对父元素的位置坐标方法：

　　绝对位置坐标：
　　$("#elem").offset().top
　　$("#elem").offset().left

　　相对父元素的位置坐标：
　　$("#elem").position().top
　　$("#elem").position().left

　　另：
　　static(默认):默认定位方式。
　　relative(相对定位):在static的基础上，相对元素本来的位置变化，通过设定top,bottom,left,right实现。
　　absolute(绝对定位):是相对父元素来说的，如果父元素中有relative，那么该元素的位置是经过计算后的结果。即absolute定位的参照物是“上一个定位过的父元素(static不算)”。绝对定位会使元素从文档流中被删除。
　　fixed(固定定位):fixed定位的参照物总是当前的文档。利用fixed定位，很容易让一个div定位在浏览器文档的左上，右上等方位。

*/

//取 div 的位置//用于其他 div 相对于它定位
function Div_GetLeft(div_id)
{
    var l = $("#" + div_id).offset().left;
    var t = $("#" + div_id).offset().top;

    return l;
}//

function Div_GetTop(div_id)
{
    var l = $("#" + div_id).offset().left;
    var t = $("#" + div_id).offset().top;

    return t;
}//




//--------------------------------------------------------




