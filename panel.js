
/// <reference path="jquery-1.11.3.min.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

function CreatePanel(name)
{
    //也可以按 https://www.cnblogs.com/lyzg/p/5133250.html
    //改成 mustache.js 模板
    //ie10 不支持这种写法
    /*
    return `
    <div id="` + name + `" style="background-color:#333;color: #fff;">

    aaa
    </div>
    
    
    `;
    */

    return '' +
    //'<div id="' + name + '" style="background-color:#333;color: #fff; overflow:hidden; ">' +
    //'<div id="' + name + '" style="background-color:#333;color: #fff;">' +
    '<div id="' + name + '" style="background-color:#ccc;color: #fff; ' + 
    ' vertical-align: top; ' + //vertical-align: top 很重要
    ' box-sizing: border-box; ' + //很重要,消除浏览器边框宽度计算差异
    //border-box定义的盒子，不会随着padding和boder的加入而增大盒子的占用空间
    //即 border-box限定了盒子模型的总面积
    
    ' overflow: hidden; ' + //还是加上比较好，否则定位时会出现比较奇怪的东西
    '">' +
    
    

    //title +
    //'aaa' + //没有这个 div 的效果会很糟糕//为什么//似乎是顶部对齐的问题//据说是 inline-block 元素默认 vertical-align：baseline 的原因
    '</div>'
    
    
    ;    
}

//参考 https://www.cnblogs.com/xdp-gacl/p/3700840.html
//定义一个类
//function Panel(_name,_parent,_salary){
function Panel(_name,_parent){
    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    this.name=_name;
    //Person类的私有属性，类的私有属性的定义方式是：”var 属性名“
    //var age=_age;//私有属性
    this.parent=_parent;//类的公开属性
    //var salary=_salary;//私有属性
    var salary = _name;//私有属性//留着测试而已

    this.click_parent = false; //点击事件中是否传递给父节点

    //--------------------------------------------
    //现在的页面经常要标志是否在点击中,是否在展开中等,这里直接用一个整数标志就行了 1 为是 0 为否
    //代替掉 jquery 的 .hasClass("active")
    //this.active = 0;
    this.active = false; //算了,还是 bool 类型方便

    this.background_color = "red";
    this.active_background_color = "transparent";

    //--------------------------------------------
    //定义Person类的公开方法(特权方法)，类的公开方法的定义方式是：”this.functionName=function(){.....}“
    this.Create = function(){

        //document.writeln("在公开方法里面访问类的私有属性是允许的，age="+age+"\t"+"salary="+salary);//在公开方法里面访问类的私有属性是允许的
        //$("#"+_name).
        //$("#a").t
        
        var _this = this; //可以用微信小程序的方法取得 this
        //不能放这里，要放到生成后//var thisjq = $("#" + _this.name);

        var s = CreatePanel(_name);
        if (null == _parent)
        //document.write(s);
        $(document.body).append(s); //不能用 document.write(s); 那样会清空整个 html 因为文档流已经结束了
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        var thisjq = $("#" + _this.name);

        dom._this = this;
        
        this.default_click(); //可以给一个默认的点击事件

    }//

    //可以给一个默认的点击事件
    this.default_click = function() {

        var _this = this;
        var thisjq = $("#" + _this.name);

        $("#" + _this.name).click(

            function(){

                _this.active = !_this.active;
                //alert("ok"); //这个居然后造成 chrome 死翘翘
                //这样不行//
                //$("#" + this.name).toggle();
                //dom.toggle();
                ////$("#" + _this.name).toggle(); //可以用微信小程序的方法取得 this
                //$(this).css({"background-color": "red"});
                //thisjq.toggle();
                if (_this.active)
                thisjq.css({"background-color": _this.active_background_color});
                else
                thisjq.css({"background-color": _this.background_color});

                //_alert("this.click_parent:" + _this.click_parent);

                if (_this.click_parent != false) return true; //点击事件中是否传递给父节点

                return false; // 阻止事件冒泡和默认操作
                //jquery怎么在父元素事件中禁止子元素的事件？
                //1、在父元素事件的function中加if(event.target==this){ }
                //2、子元素事件function最后加event.stopPropgation（）；// 阻止事件冒泡
                //3、简单点，直接在子元素事件function最后加return false；// 阻止事件冒泡和默认操作                
            }

        );        

    }//

    //定义对外公开访问方法//设置其宽度
    this.width = function(_width) {
        $("#" + this.name).css({"width": _width});
        //设置宽度的同时最好是设置一下 display, 要不然会排到下一行去了
        $("#" + this.name).css({"display": "inline-block"});
    }//
 
    //定义对外公开访问方法//设置其宽度
    this.height = function(_height, _vcenter) {
        $("#" + this.name).css({"height": _height});
        //设置宽度的同时最好是设置一下 display, 要不然会排到下一行去了
        //$("#" + this.name).css({"display": "inline-block"});

        //第二个参数为 true 时在 ie10 及以下兼容性问题比较严重 
        if (_vcenter){
            $("#" + this.name).css({"line-height": _height}); //可以让单行的文字垂直居中//暂时,不好

            
            //itemRight1.height(h, true); //百分比的高用在 line-height 上会有问题，所以要重新计算一下 
            //不过感觉这些方法很危险，尽量少用
            var h = $("#"+this.name).height() + "px";
            $("#" + this.name).css({"line-height": h}); //可以让单行的文字垂直居中//暂时,不好
        } 

    }//

    //定义对外公开访问方法//自动高度
    this.autoheight = function() {
        //有很多种方法,不一定用这种
        $("#" + this.name).css({"overflow": "hidden"});
        //$("#" + this.name).css({"height": ""}); //必须清空//好像没用,要用 default 才行
        //$("#" + this.name).css({"line-height": ""}); //必须清空/好像没用,要用 default 才行
        //$("#" + this.name).css({"height": "default"}); //必须清空//好像没用,要用 default 才行//height 的缺省值应该是 auto
        //$("#" + this.name).css({"line-height": "default"}); //必须清空/好像没用,要用 default 才行//line-height 的缺省值应该是 normal
    }//    

    //定义对外公开访问方法//自动宽度
    this.autowidth = function() {
        //有很多种方法,不一定用这种
        $("#" + this.name).css({"overflow": "hidden"});
    }//     

    //定义对外公开访问方法//设置空白区域
    this.space_width = function(_width) {
        $("#" + this.name).css({"padding": _width});

    }//    

    //定义对外公开访问方法//设置空白区域
    this.space_width_bottom = function(_width) {
        $("#" + this.name).css({"padding-bottom": _width});

    }//    

    //定义对外公开访问方法//设置空白区域//直接设置 padding 会导致 line-height 居中失败，所以应该有个左右空白的东西
    this.space_width_LR = function(_width) {
        $("#" + this.name).css({"padding-left": _width});
        $("#" + this.name).css({"padding-right": _width});

    }//   

    //设置标题
    this.caption = function(_caption) {
        //$("#" + this.name).append(_caption); //其实就是加内部 html
        $("#" + this.name).html(_caption); //其实就是加内部 html

    }//    

    //设置标题
    this.set_caption = function(_caption) {
        //$("#" + this.name).append(_caption); //其实就是加内部 html
        //$("#" + this.name).html(_caption); //其实就是加内部 html

        this.set_caption_span(_caption);

    }//    

    //设置标题
    this.get_caption = function(_caption) {
        $("#" + this.name).append(_caption); //其实就是加内部 html

    }//  

    //设置标题//在目前的浏览器兼容环境来说，还是用 span 实现标题比较好
    this.set_caption_span = function(_caption) {
        //$("#" + this.name).append(_caption); //其实就是加内部 html
        //$("#" + this.name).html(_caption); //其实就是加内部 html

        var _id = this.name + "_caption";

        //alert($("#" + _id));

        if ($("#" + _id).length >0 ) //jquery 中判断节点是否存在只能用 length 
            $("#" + _id).html(_caption); //其实就是加内部 html
        else
            $("#" + this.name).html("<span id='" + _id +"'>" + _caption + "</span>"); //其实就是加内部 html

    }//    

  
    //设置标题//在目前的浏览器兼容环境来说，还是用 span 实现标题比较好//不过 span 在 chrome firefox 中的效果差异有时候蛮大的,尽量少用
    this.get_caption_span = function() {
        //$("#" + this.name).append(_caption); //其实就是加内部 html
        //$("#" + this.name).html(_caption); //其实就是加内部 html

        var _id = this.name + "_caption";

        //alert($("#" + _id));

        if ($("#" + _id).length >0 ) //jquery 中判断节点是否存在只能用 length 
            return $("#" + _id).html(); //其实就是加内部 html
        else
            return $("#" + this.name).html(); //其实就是加内部 html

    }//

    //设置标题
    this.get_caption_value = function(_caption) {
        return $("#" + this.name).text(); //其实就是加内部 html

    }//    

    
    this.add_html = function(_html) {
        $("#" + this.name).append(_html); //其实就是加内部 html

    }//   
    
    //内容居中
    this.set_text_center = function() {
        $("#" + this.name).css({"text-align":"center"});

    }// 
    
    //内容居左
    this.set_text_left = function() {
        $("#" + this.name).css({"text-align":"left"});

    }// 

    //内容居右
    this.set_text_right = function() {
        $("#" + this.name).css({"text-align":"right"});

    }// 

    //这个有点特殊,只是因为现在比较常用//设置背景色和点击后的背景色
    this.set_background_color = function(_background_color, _active_background_color) {
        $("#" + this.name).css({"background-color": _background_color});

        this.background_color = _background_color;
        this.active_background_color = _active_background_color;

    }//     
    
    //这个有点特殊,只是因为现在比较常用//背景透明
    this.set_background_color_Transparent = function() {
        this.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    }//     
    
    this.color = function(_background_color) {
        $("#" + this.name).css({"color": _background_color});

        //this.background_color = _background_color;
        //this.active_background_color = _active_background_color;

    }//  

    //左右居中//没法子，上下居中是不行的
    this.center = function(_background_color) {

        $("#" + this.name).css({"margin":"0 auto"});   
        $("#" + this.name).css({"display":""});   //要去掉默认的 inline-block 才能左右居中

    }//  

    //贴住底部//调整 div 的位置
    this.setPosition_fixed_bottom = function(_background_color) {

        ("#" + this.name).css({"position": "fixed", "bottom": "0px"}); //贴住底部

    }//

    //阴影效果
    this.AddShadow = function () {

        // box-shadow:-10px 0 10px red, /*左边阴影*/  
        // 10px 0 10px yellow, /*右边阴影*/  
        // 0 -10px 10px blue, /*顶部阴影*/  
        // 0 10px 10px green; /*底边阴影*/

        //这个也有兼容性问题,不过可以不用管,只是效果增强而已
        //webkit-box-shadow: 50px 50px blue;  
        //-moz-box-shadow: 50px 50px blue; 

        $("#" + this.name).css({
            //"box-shadow": "-10,-10,5,#0cc",//no
            //"box-shadow": "5px 2px 5px #000"//ok//向右下的阴影
            "box-shadow": "0px 0px 20px 0px #000"

        });

        //box-shadow: h-shadow v-shadow blur spread color inset;
        // h-shadow 	必需。水平阴影的位置。允许负值。 
        // v-shadow 	必需。垂直阴影的位置。允许负值。 
        // blur 	可选。模糊距离。 
        // spread 	可选。阴影的尺寸。 
        // color 	可选。阴影的颜色。请参阅 CSS 颜色值。 	
        // inset 	可选。将外部阴影 (outset) 改为内部阴影。

        //jquery.boxshadow.js 下才有
        //$("#" + this.name).boxShadow(-10,-10,5,"#0cc"); //obj元素使用了box-shadow  

    }//
    



//--------------------------------------------

    /*定义私有属性Age的对外公开访问方法*/
    this.setAge = function(intAge) {
        age = intAge;
    }
    /*定义私有属性Age的对外公开访问方法*/
    this.getAge = function() {
        return age;
    }

    //定义Person类的公开方法(特权方法)，类的公开方法的定义方式是：”this.functionName=function(){.....}“
    this.Show=function(){
        document.writeln("在公开方法里面访问类的私有属性是允许的，age="+age+"\t"+"salary="+salary);//在公开方法里面访问类的私有属性是允许的
    }
    //公共方法
    this.publicMethod = function(){
        document.writeln("在公开方法里面访问类的私有方法是允许的");
        privateFn();//在公开方法里面调用类的私有方法
        privateFn2();//在公开方法里面调用类的私有方法
    }
    /*
    定义Person类的私有方法(内部方法)，
    类的私有方法的定义方式是：”function functionName(){.....}“，
    或者 var functionName=function(){....}
    */
    function privateFn(){
        document.writeln("我是Person类的私有函数privateFn");
    }

    var privateFn2=function(){
        document.writeln("我是Person类的私有函数privateFn2");
    }
}//
