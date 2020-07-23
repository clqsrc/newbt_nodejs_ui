
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
        //w = $(window).width(); //这个是不行的，ie6 和 firefox 应该都不支持
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
//这在 firefox 下其实有问题//所以最好是先将 body 的高度设置为 100%,实际上名为 html 的特殊元素也要设置
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

//--------------------------------------------------------
//设置窗体大小变化时的事件
//1.0
function SetHtmlOnSizeFunction(func)
{
    //窗口大小改变时，执行//ie6 也支持//只支持 window 不支持普通 div
    // $(window).resize(function () {
    //     //执行代码块
	// 	//MenuHeight();
		
	// 	Html_OnSize();
    // });	
    
    $(window).resize(func);

}//

//因为普通 div 不支持 onsize，所以需要一系列的函数来支持
//2.1
function AddOnSizeObj(list, obj, func)
{
    if (list == null) list = new Array();

    if (func){ //要执行的函数可以在这里设置也可以先设置了，再加入 list
        obj.onsize = func;
    }

    list.push(obj);

    //----
    //test 可知，$(window).resize 和 $(){} 是不同的，只有最后一次起作用//不对，也是多次起作用的
    //window.onresize与$(window).resize() 是区别是前者只有最后一个起作用，后面所有的都会起作用。所以 2.1 和 2.2 是没有必要的，最好是使用 3.0 函数，使用 obj 自己的 this 来传参数
    //不过 2.1, 2.2 方式是通用的，还是保留作为参考吧
    $(window).resize(function () {
        obj.onsize();
    });
    //----

    return list;
}//

//设置窗体大小变化时的事件//多控件版本
//2.2
function SetHtmlOnSizeFunction_List(list, func)
{
    //窗口大小改变时，执行//ie6 也支持//只支持 window 不支持普通 div
    $(window).resize(function () {
        //执行代码块

        for (var i=0; i<list.length; i++){

            var obj = list[i];
            
            if (func){
                func(list[i]);
            }

            if (obj.onsize) obj.onsize(); //如果控件本身绑定有事件则也执行一下

        }//for
        
    });	
    
    //$(window).resize(func);

}//

//3.0 版本，只用一个函数就可以了，用 obj 的 this 来传参数，这是目前最简单的版本
//唯一的要求是 obj 必须有 onsize 函数
function AddHtmlOnSizeFunctionObj(obj)
{
    //窗口大小改变时，执行//ie6 也支持//只支持 window 不支持普通 div
    $(window).resize(function () {
        //执行代码块
		//MenuHeight();
		
        //Html_OnSize();
        obj.onsize();
    });	
    
    //$(window).resize(func);

}//


//使用示例:

//--------------------------------------------------------

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
    //在 div 的 onclick 事件中会有 bug //jquery-1.11.3.min.js 下时
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
//--------------------------------------------------------
//下面的和绝对定位无关，只是用于 ui 的方便性函数

//panel 这些 ui 库默认点击事件是不传递的，所以要让 a 标签起作用的话要打开它
function UI_EnableUrlClick(panel) 
{

    //p = panel.parent;
    p = panel;

    //return;

    //for (var i=0;i<1000;i++){ //防止死循环//var 声明还是要的，否则会修改外面的变量，这是 js 非常特殊的地方!!!
    for (var i=0;i<1000;i++){ //防止死循环

        if (!p) break;
        if (null == p) break;

        p.click_parent = true;

        p = p.parent;
    }//

}//

//设置鼠标为按钮一样的
function UI_SetCursorAsButton(panel) 
{
    $("#" + panel.name).css({"cursor":"default"});
}//

//设置鼠标为 url 链接一样的
function UI_SetCursorAsUrl(panel) 
{
    $("#" + panel.name).css({"cursor":"pointer"});
}//

//自由定位//左上
//function UI_free_pos(div_id, x, y, parent_div_id)
function UI_free_pos(div_id, x, y)
{
    $("#" + div_id).css({"position": "absolute"});
    $("#" + div_id).css({"left": x});
    $("#" + div_id).css({"top": y});

    //一般还要设置父节点
    // if (parent_div_id){
    //     //$("#" + this.parent.name).css({"position": "absolute"});
    //     $("#" + parent_div_id).css({"position": "relative"}); //父节点为 absolute 的时候效果还不一样，那样的话就是基于自己的正常位置偏移了，比较古怪
    // }

    // if (parent_div_id){ //如果设置了父亲节点已经是 absolute 时还要再改
    //     //$("#" + this.parent.name).css({"position": "absolute"});
    //     $("#" + div_id).css({"position": "relative"}); //父节点为 absolute 的时候效果还不一样，那样的话就是基于自己的正常位置偏移了，比较古怪
    // }

    //感觉都不好，这样如果父级本身为 absolute 时候又被改了位置，还不如直接计算位置好了//否则父节点被修改的后果不可预料

    //当 父元素 的 position 设为 relative 时，
    //其子元素的 absolute position 是按照父元素的相对位置来的 
    //否则就是相对于整个文档的位置，官方说法是 //absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位

    //其中 static 是 position 的默认值。没有定位，元素出现在正常的流中

}//

//设置标题为按钮一样的//上下、左右都居中
function UI_SetCaptionAsButton(div_id, _caption) 
{
    var caption_id = div_id + "_caption";
    //$("#" + panel.name).css({"cursor":"default"});
    //var div_id = panel.name;

    $("#" + div_id).html("<span id='" + caption_id +"'>" + _caption + "</span>"); //其实就是加内部 html

    //取 div 宽度//客户端
    var w = Div_GetWidth_client(div_id);
    var h = Div_GetHeight_client(div_id);    
    var x = Div_GetLeft(div_id);   
    var y = Div_GetTop(div_id);   

    var w2 = Div_GetWidth_client(caption_id);
    var h2 = Div_GetHeight_client(caption_id);    


    var x2 = (w - w2) / 2;
    var y2 = (h - h2) / 2;

    //使用 position: absolute 进行定位时，本身就是相对于上一级的定位了，只不过这个上一级并不一定是上层父节点，而是上一个 absolute/relative/fixed/inherit 节点
    //所以这里是不需要再进行偏移了的，除非父节点是 position:static 
    //static 为 position 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
    //参考 https://www.w3school.com.cn/cssref/pr_class_position.asp
    ////x2 = x2 + x;     
    ////y2 = y2 + y;

    //
    // UI_free_pos(caption_id, 0, 0, div_id);
    // UI_free_pos(caption_id, x, y, div_id);
    UI_free_pos(caption_id, 0, 0);
    UI_free_pos(caption_id, x2, y2);

}//

//设置一个 dom 节点的提示
function UI_SetHint(div_id, hint)
{
    document.getElementById(div_id).title = hint;
}//

//--------------------------------------------------------




