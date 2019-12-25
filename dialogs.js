
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="functions.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//alert 在 chrome 中现在已经不兼容，所以应该自己实现一个，而 layer /layer ui 目前又不兼容手机

function CreateAlert(name)
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
    '">' +
    
    

    //title +
    //'aaa' + //没有这个 div 的效果会很糟糕//为什么//似乎是顶部对齐的问题//据说是 inline-block 元素默认 vertical-align：baseline 的原因
    '</div>'
    
    
    ;    
}

//参考 https://www.cnblogs.com/xdp-gacl/p/3700840.html
//定义一个类
function Alert(_name,_parent,_salary){
    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    this.name=_name;
    //Person类的私有属性，类的私有属性的定义方式是：”var 属性名“
    //var age=_age;//私有属性
    this.parent=_parent;//类的公开属性
    var salary=_salary;//私有属性

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

        var s = CreateAlert(_name);
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
                //$("#" + _this.name).hide();
                ////$("#" + _this.name).remove(); //光 hide 是不行的

                return false; // 阻止事件冒泡和默认操作
                //jquery怎么在父元素事件中禁止子元素的事件？
                //1、在父元素事件的function中加if(event.target==this){ }
                //2、子元素事件function最后加event.stopPropgation（）；// 阻止事件冒泡
                //3、简单点，直接在子元素事件function最后加return false；// 阻止事件冒泡和默认操作                
            }

        );        

    }//

    //定义对外公开访问方法//全屏
    //小结DIV实现全屏技巧： 一般要实现全屏自适应我们只需要设置对象宽度为100%即可
    //http://www.divcss5.com/rumen/r566.shtml
    this.FullScreen = function() {
        $("#" + this.name).css({"width": "100%"});
        $("#" + this.name).css({"height": "100%"});
        //设置宽度的同时最好是设置一下 display, 要不然会排到下一行去了
        $("#" + this.name).css({"display": "inline-block"});

        //fixed 生成绝对定位的元素，相对于浏览器窗口进行定位
        $("#" + this.name).css({"position": "fixed"});
        $("#" + this.name).css({"left": "0px"});
        $("#" + this.name).css({"top": "0px"});
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

        if (_vcenter) $("#" + this.name).css({"line-height": _height}); //可以让单行的文字垂直居中//暂时,不好

    }//

    //定义对外公开访问方法//自动高度
    this.autoheight = function() {
        //有很多种方法,不一定用这种
        $("#" + this.name).css({"overflow": "hidden"});
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

    //这个有点特殊,只是因为现在比较常用
    this.set_background_color = function(_background_color, _active_background_color) {
        $("#" + this.name).css({"background-color": _background_color});

        this.background_color = _background_color;
        this.active_background_color = _active_background_color;

    }//        

//--------------------------------------------



}//

//------------------------------------------------------
//下面是代替 alert 的函数
function _alert(msg) {
    //alert(msg);

    //CreateAlert("alert_id");
    //$("#" + edit1.name).val("aaa中文");
    //_alert("新的 alert");

    var form = new Alert("alert_id" + new Date().getTime()); //id 加个时间戳比较好，因为可能有多个
    form.Create();
    //form.set_background_color("#00252525", "#00353535");
    form.space_width("16px");
    form.FullScreen();
    //form.set_background_color("#00ff0000", "#00ff0000"); //chrome 下无法用 alpha 颜色值设置透明
    //form.set_background_color("transparent", "transparent"); //ok
    //form.set_background_color("#05ff0000", "#05ff0000"); //chrome 下无法用 alpha 颜色值设置透明//半透明也不行
    //在 layer ui 中用的是 rgba(0,0,0,.7)
    //也可参考 https://www.cnblogs.com/chuaWeb/p/5092087.html

    //form.set_background_color("rgba(0,0,0,.7)", "rgba(0,0,0,.7)");
    form.set_background_color(Functions_colorTransparent_half("0.5"), Functions_colorTransparent_half("0.5"));
    //form.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    
    //---------------------------
    //暴力居中 :) //这个很重要，所以还是不用 CenterPanel 了
    var pnlTmp1 = new Panel(form.name + "_pnlTmp1", form, "b"); // //注意名称不要和已有的冲突
    pnlTmp1.Create(); 
    pnlTmp1.width("90%");//autowidth();
    pnlTmp1.height("30%", true);   
    pnlTmp1.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    //---------------------------
    ///*
    var pnlMain = new Panel(form.name + "_pnlMin", form, "b"); // //注意名称不要和已有的冲突
    pnlMain.Create(); 
    pnlMain.width("100%");//autowidth();
    pnlMain.height("200px", false);   

    pnlMain.set_background_color("#252525", "#353535");

    var pnlTitle = new Panel(form.name + "_pnlTitle", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlTitle.Create(); 
    pnlTitle.width("100%");//autowidth();
    pnlTitle.height("30px", true);   
    pnlTitle.space_width("2px");
    pnlTitle.set_background_color("#fff", "#fff");
    pnlTitle.color("#000");
    $("#" + pnlTitle.name).append("提示"); //加完图标再加标题

    var pnlMessge = new Panel(form.name + "_pnlMessge", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlMessge.Create(); 
    pnlMessge.width("100%");//autowidth();
    //pnlMessge.height("auto", false);   
    pnlMessge.autoheight();
    pnlMessge.space_width("32px");
    pnlMessge.set_background_color("#252525", "#353535");
    $("#" + pnlMessge.name).append(msg); //加完图标再加标题

    var pnlBottom = new Panel(form.name + "_pnlBottom", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlBottom.Create(); 
    pnlBottom.width("100%");//autowidth();
    //pnlMessge.height("auto", false);   
    pnlBottom.autoheight();
    pnlBottom.space_width("32px");
    pnlBottom.set_background_color("#252525", "#353535");

    var btnOk = new Button(form.name + "_btnOk", pnlBottom, "确定"); //注意名称不要和已有的冲突
    btnOk.Create(); 
    btnOk.width("100px");
    btnOk.height("48px", true);
    $("#" + btnOk.name).css({"background-color": "#666"});      
    //$("#" + btnOk.name).css({"margin":"0 auto"});   
    //$("#" + btnOk.name).css({"display":""}); 
    btnOk.center(); //这个目前只能左右居中

    $("#" + btnOk.name).click(

        function(){


            //$("#" + _this.name).hide();
            $("#" + form.name).remove(); //光 hide 是不行的

            return false;
        }

    );  
    //*/

    

}//

//---------------------------------------------------
//确认对话框//代替 chrome 中取消的 confirm 函数
//onClickOK 是确认后执行的函数
function _confirm(msg, onClickOK) {

    var form = new Alert("alert_id" + new Date().getTime()); //id 加个时间戳比较好，因为可能有多个
    form.Create();

    form.space_width("16px");
    form.FullScreen();

    form.set_background_color(Functions_colorTransparent_half("0.5"), Functions_colorTransparent_half("0.5"));
    //form.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    
    //---------------------------
    //暴力居中 :) //这个很重要，所以还是不用 CenterPanel 了
    var pnlTmp1 = new Panel(form.name + "_pnlTmp1", form, "b"); // //注意名称不要和已有的冲突
    pnlTmp1.Create(); 
    pnlTmp1.width("90%");//autowidth();
    pnlTmp1.height("30%", true);   
    pnlTmp1.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    //---------------------------
    ///*
    var pnlMain = new Panel(form.name + "_pnlMin", form, "b"); // //注意名称不要和已有的冲突
    pnlMain.Create(); 
    pnlMain.width("100%");//autowidth();
    pnlMain.height("200px", false);   

    pnlMain.set_background_color("#252525", "#353535");

    var pnlTitle = new Panel(form.name + "_pnlTitle", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlTitle.Create(); 
    pnlTitle.width("100%");//autowidth();
    pnlTitle.height("30px", true);   
    pnlTitle.space_width("2px");
    pnlTitle.set_background_color("#fff", "#fff");
    pnlTitle.color("#000");
    $("#" + pnlTitle.name).append("提示"); //加完图标再加标题

    var pnlMessge = new Panel(form.name + "_pnlMessge", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlMessge.Create(); 
    pnlMessge.width("100%");//autowidth();
    //pnlMessge.height("auto", false);   
    pnlMessge.autoheight();
    pnlMessge.space_width("32px");
    pnlMessge.set_background_color("#252525", "#353535");
    $("#" + pnlMessge.name).append(msg); //加完图标再加标题

    var pnlBottom = new Panel(form.name + "_pnlBottom", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlBottom.Create(); 
    pnlBottom.width("100%");//autowidth();
    //pnlMessge.height("auto", false);   
    pnlBottom.autoheight();
    pnlBottom.space_width("32px");
    pnlBottom.set_background_color("#252525", "#353535");

    var pnlButtons = new Panel(form.name + "_pnlButtons", pnlBottom, "b"); // //注意名称不要和已有的冲突
    pnlButtons.Create(); 
    //pnlButtons.autowidth(); //没有宽度就不能自动居中了
    pnlButtons.width("220px"); //没有宽度就不能自动居中了//这样太不可靠了，以后直接用 js 计算好了
    //pnlMessge.height("auto", false);   
    pnlButtons.autoheight();
    pnlButtons.space_width("0px");//("32px"); //宽度减去这个要大于按钮组的高度，否则按钮会自动折行
    pnlButtons.set_background_color("#252525", "#353535");
    pnlButtons.center(); //这个目前只能左右居中

    var btnOk = new Button(form.name + "_btnOk", pnlButtons, "确定"); //注意名称不要和已有的冲突
    btnOk.Create(); 
    btnOk.width("100px");
    btnOk.height("48px", true);
    $("#" + btnOk.name).css({"background-color": "#666"});      
    //$("#" + btnOk.name).css({"margin":"0 auto"});   
    //$("#" + btnOk.name).css({"display":""}); 
    //btnOk.center(); //这个目前只能左右居中

    $("#" + btnOk.name).click(

        function(){


            //$("#" + _this.name).hide();
            $("#" + form.name).remove(); //光 hide 是不行的

            //onClickOK 是确认后执行的函数
            onClickOK();

            return false;
        }

    );  

    //加一个分隔块，按网页的做法一般是加 ma... 属性，不过还是代码控制爽
    var sp1 = new Panel(form.name + "_sp1", pnlButtons, "取消"); //注意名称不要和已有的冲突
    sp1.Create(); 
    sp1.width("16px");
    sp1.height("48px", true);
    sp1.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    var btnCancel = new Button(form.name + "_btnCancel", pnlButtons, "取消"); //注意名称不要和已有的冲突
    btnCancel.Create(); 
    btnCancel.width("100px");
    btnCancel.height("48px", true);
    $("#" + btnCancel.name).css({"background-color": "#666"});  

    $("#" + btnCancel.name).click(

        function(){


            //$("#" + _this.name).hide();
            $("#" + form.name).remove(); //光 hide 是不行的

            //onClickOK 是确认后执行的函数
            //onClickOK();

            return false;
        }

    );  

    //*/

    

}//