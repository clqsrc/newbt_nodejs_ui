
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="functions.js" />
/// <reference path="panel.js" />
/// <reference path="center_panel_v2.js" />
/// <reference path="free_panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//日期选择，可以模仿安卓的

function CreateAlertDate(name)
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
function AlertDate(_name,_parent){
    //Panel.call(this, _name,_parent);
    CenterPanel_v2.call(this, _name,_parent); //v2 的居中是用 flex 实现的,更简洁但兼容性对旧浏览器不太好
    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    this.name=_name;
    //Person类的私有属性，类的私有属性的定义方式是：”var 属性名“
    //var age=_age;//私有属性
    this.parent=_parent;//类的公开属性
    //var salary=_salary;//私有属性

    //--------------------------------------------
    //现在的页面经常要标志是否在点击中,是否在展开中等,这里直接用一个整数标志就行了 1 为是 0 为否
    //代替掉 jquery 的 .hasClass("active")
    //this.active = 0;
    this.active = false; //算了,还是 bool 类型方便

    this.background_color = "red";
    this.active_background_color = "transparent";

    //--------------------------------------------
    this.year = 2019;
    this.month = 3;
    this.day = 29;

    this.lastClick=null; //上次点击的控件

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

        //在 vh 两个方向上都垂直居中
        this._center_vh();

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
        ////$("#" + this.name).css({"display": "inline-block"});

        //fixed 生成绝对定位的元素，相对于浏览器窗口进行定位
        $("#" + this.name).css({"position": "fixed"});
        $("#" + this.name).css({"left": "0px"});
        $("#" + this.name).css({"top": "0px"});
    }//


//--------------------------------------------



}//

//------------------------------------------------------
//下面是代替 alert 的函数
function _alert_date(msg) {

    var colorBase = "#2D9BD8"; //"#0000ff"; //基础颜色,然后计算出淡的颜色
    var colorBaseWhite = "#eeeeee";  //"#ffffff"; //基础的色,然后计算出深的颜色

    var colorBase_leve2 = Functions_ColorHighlight(colorBase, 10); //高亮色 第 2 级//不能加太多,否则颜色会偏差
    var colorBase_day = Functions_ColorHighlight(colorBase, 100); //每一天的颜色
    var colorBase_day = Functions_ColorHighlight_v2(colorBase, 90); //每一天的颜色


    var form = new AlertDate("alert_id" + new Date().getTime()); //id 加个时间戳比较好，因为可能有多个
    form.Create();
    //form.set_background_color("#00252525", "#00353535");
    //form.space_width("16px"); //能真正居中就不用这个了
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
    // var pnlTmp1 = new Panel(form.name + "_pnlTmp1", form, "b"); // //注意名称不要和已有的冲突
    // pnlTmp1.Create(); 
    // pnlTmp1.width("90%");//autowidth();
    // pnlTmp1.height("30%", true);   
    // pnlTmp1.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    //---------------------------
    ///*
    var pnlMain = new Panel(form.name + "_pnlMain", form, "b"); // //注意名称不要和已有的冲突
    pnlMain.Create(); 
    pnlMain.width("240px");//autowidth(); //为兼容手机,不能超过 320px
    //pnlMain.height("200px", false); //line-height 在 100% 下是不行的
    //pnlMain.center(); //左右居中
    form.set_text_center(); //用父节点的文本对齐应该也是可以的
    form.height("100%", false); //第二个参数为 true 时在 ie10 及以下兼容性问题比较严重 
    pnlMain.AddShadow(); //加个阴影好看点

    /*
    //https://www.cnblogs.com/lxg0/p/6798028.html
    $("#" + form.name).css({
        "display": "table-cell", "vertical-align":"middle", 
        "text-align": "center"
        //position: fixed; //有这个属性就不行
        });

    form.add_html("aaa");
    //*/
    /*
    $("#" + form.name).css({
        
        "vertical-align":"middle", 

        "display": "flex", "justify-content":"center", "align-items":"center", //这3个配合，可以让子元素垂直居中
        
        "text-align": "center",
        //position: fixed; //有这个属性 table-cell 就不行,flex 就可以//但是 ie11 才支持
        "z-index": "10000"
        });
    //*/

    
    $("#" + form.name).css({ "z-index": "10000"}); //在最上显示
    //在 vh 两个方向上都垂直居中
    //form._center_vh(); //ie10 下其实还是没有用,实际上可以用 absolute 绝对定位再算一次
    //$("#" + form.name).css({"display": "flex"});

    //form.add_html("aaa");

    pnlMain.set_background_color("#252525", "#353535");

    var t = new Panel(form.name + "_pnlTitle", pnlMain); // //注意名称不要和已有的冲突
    var pnlTitle = t;
    t.Create(); 
    t.width("100%");//autowidth();
    //t.height("30px", true);   
    t.autoheight();  
    t.space_width("8px");
    t.set_background_color(colorBase, colorBase);
    t.color("#fff");
    $("#" + t.name).append("星期五"); //加完图标再加标题
    $("#" + t.name).css({"font-size": "12px"});
    $("#" + t.name).css({"line-height": "normal"}); 

    var t = new Panel(form.name + "_pnlYear", pnlMain); // //注意名称不要和已有的冲突
    var pnlYear = t;
    t.Create(); 
    t.width("100%");//autowidth();
    t.height("30px", true);   
    t.space_width("2px");
    t.set_background_color(colorBase_leve2, colorBase_leve2);
    t.color("#fff");
    //$("#" + t.name).append("2019"); //加完图标再加标题
    pnlYear.set_caption_span(form.year);
    $("#" + t.name).css({"font-size": "24px"});
    $("#" + t.name).css({"line-height": "normal"}); 

    //----
    //年的左边按钮
    var t = new FreePanel(form.name + "_pnlYeaar_left", pnlYear); // //注意名称不要和已有的冲突
    var pnlYeaar_left = t;
    t.Create(); 
    t.width("48%");//autowidth();
    t.height("30px", true);   
    t.free_pos("0px", "0px", true);
    t.alignLeft();
    //t.alignRight();
    t.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    $("#" + pnlYeaar_left.name).click(
        function(e){
            form.year = form.year -1;

            pnlYear.set_caption_span(form.year);
            //重置天的数据
            _dialogs_date_ResetDays(form, pnlGrid,colorBaseWhite, colorBase_day);
        }

    );
    
    //年的右边按钮
    var t = new FreePanel(form.name + "_pnlYeaar_right", pnlYear); // //注意名称不要和已有的冲突
    var pnlYeaar_right = t;
    t.Create(); 
    t.width("48%");//autowidth();
    t.height("30px", true);   
    t.free_pos("0px", "0px", true);
    t.alignRight();
    //t.alignRight();
    t.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    $("#" + pnlYeaar_right.name).click(
        function(e){
            form.year = form.year -1;

            pnlYear.set_caption_span(form.year);
            //重置天的数据
            _dialogs_date_ResetDays(form, pnlGrid,colorBaseWhite, colorBase_day);
        }

    );

    //----

    var t = new Panel(form.name + "_pnlMonth", pnlMain); // //注意名称不要和已有的冲突
    var pnlMonth = t;
    t.Create(); 
    t.width("100%");//autowidth();
    t.height("30px", true);   
    t.space_width("2px");
    t.set_background_color(colorBase_leve2, colorBase_leve2);
    t.color("#fff");
    t.set_caption("3月"); //加完图标再加标题
    $("#" + t.name).css({"font-size": "22px"});
    $("#" + t.name).css({"line-height": "normal"}); 

    //----
    //月的左边按钮
    var t = new FreePanel(form.name + "_pnlMonth_left", pnlMonth); // //注意名称不要和已有的冲突
    var pnlMonth_left = t;
    t.Create(); 
    t.width("48%");//autowidth();
    t.height("30px", true);   
    t.free_pos("0px", "0px", true);
    t.alignLeft();
    //t.alignRight();
    t.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    $("#" + pnlMonth_left.name).click(
        function(e){
            //now = Functions_decMonth(form.year,form.month, form.day, 1); //ok
            //now = Functions_addMonths(form.year,form.month, form.day, -1); //这个函数当减去 3月29 的一个月时会显示为 3 月 1 日
            now = Functions_addMonths(form.year,form.month, 1, -1); //这个函数当减去 3月29 的一个月时会显示为 3 月 1 日

            form.year = now.getFullYear();
            form.month = now.getMonth() + 1;
            //form.day = now.getDate(); //日还是不要改

            //pnlMonth.set_caption(form.month); //不能这样，会清空内部内容的
            pnlMonth.set_caption_span(form.month + "月"); //不能这样，会清空内部内容的
            pnlYear.set_caption_span(form.year); 
            //pnlDay.set_caption_span(form.day); 

            //重置天的数据
            _dialogs_date_ResetDays(form, pnlGrid,colorBaseWhite, colorBase_day);
        }

    );

    //月的右边按钮
    var t = new FreePanel(form.name + "_pnlMonth_right", pnlMonth); //注意名称不要和已有的冲突
    var pnlMonth_right = t;
    t.Create(); 
    t.width("48%");//autowidth();
    t.height("30px", true);   
    t.free_pos("0px", "0px", true);
    //t.alignLeft();
    t.alignRight();
    t.set_background_color(Functions_colorTransparent(), Functions_colorTransparent());

    $("#" + pnlMonth_right.name).click(
        function(e){
            //now = Functions_decMonth(form.year,form.month, form.day, 1); //ok
            //now = Functions_addMonths(form.year,form.month, form.day, 1);
            now = Functions_addMonths(form.year,form.month, 1, 1);

            form.year = now.getFullYear();
            form.month = now.getMonth() + 1;
            //form.day = now.getDate(); //日还是不要改

            //pnlMonth.set_caption(form.month); //不能这样，会清空内部内容的
            pnlMonth.set_caption_span(form.month + "月"); //不能这样，会清空内部内容的
            pnlYear.set_caption_span(form.year); //不能这样，会清空内部内容的

            //重置天的数据
            _dialogs_date_ResetDays(form, pnlGrid,colorBaseWhite, colorBase_day);
        }

    );    

    //----

    var t = new Panel(form.name + "_pnlDay", pnlMain); // //注意名称不要和已有的冲突
    var pnlDay = t;
    t.Create(); 
    t.width("100%");//autowidth();
    //t.height("30px", true);  
    t.autoheight(); 
    //t.height("default", true);
    t.space_width("4px");
    //t.set_background_color(colorBase, colorBase);
    t.set_background_color(colorBase_leve2, colorBase_leve2);
    t.color("#fff");
    //$("#" + t.name).append(form.day); //加完图标再加标题
    t.caption(form.day);
    $("#" + t.name).css({"font-size": "64px"}); 
    $("#" + t.name).css({"line-height": "normal"}); 
    

    pnlMain.autoheight();

    var t = new Panel(form.name + "_pnlGrid", pnlMain); //注意名称不要和已有的冲突
    var pnlGrid = t;
    t.Create(); 
    t.width("100%");//autowidth();
    //t.height("auto", false);   
    t.autoheight();
    t.space_width("32px");
    t.space_width_bottom("0px");
    t.set_text_left();
    t.set_background_color(colorBaseWhite, colorBaseWhite);
    $("#" + t.name).append(msg); //加完图标再加标题

    //星期几
    var weekString = ["日","一","二","三","四","五","六"];
    for (i=0; i<7; i++){

        var t = new Panel(form.name + "_pnlGrid_title" + i, pnlGrid); // //注意名称不要和已有的冲突
        var pnlCell = t;
        t.Create(); 
        t.width("24px");//autowidth();
        t.height("24px", true);   
        //t.autoheight();
        //t.space_width("4px");
        t.set_text_center();
        $("#" + t.name).css({"font-size": "14px"}); 
        t.set_background_color(colorBaseWhite, colorBaseWhite);
        $("#" + t.name).append(weekString[i]); //加完图标再加标题
        t.color("#000000");

        if (i == 10 ) t.set_background_color(colorBase_day, colorBase_day);

        //border-radius: 100%; //100% 50% 都可以
        $("#" + t.name).css({"border-radius": "50%"}); 
    
    }//for

    //每一天的控件生成
    _dialogs_date_ResetDays(form, pnlGrid, colorBaseWhite, colorBase_day, true);

    var pnlBottom = new Panel(form.name + "_pnlBottom", pnlMain, "b"); // //注意名称不要和已有的冲突
    pnlBottom.Create(); 
    pnlBottom.width("100%");//autowidth();
    //pnlMessge.height("auto", false);   
    pnlBottom.autoheight();
    pnlBottom.set_text_right();
    //pnlBottom.space_width("32px");
    pnlBottom.set_background_color(colorBaseWhite, colorBaseWhite);

    var t = new Button(form.name + "_btnOk", pnlBottom, "确定"); //注意名称不要和已有的冲突
    var btnOk =t;
    t.Create(); 
    t.width("80px");
    t.height("48px", true);
    $("#" + t.name).css({"font-size": "14px"}); 
    $("#" + t.name).css({"background-color": "#666"});      
    //$("#" + t.name).css({"margin":"0 auto"});   
    //$("#" + t.name).css({"display":""}); 
    //t.center(); //这个目前只能左右居中
    t.set_background_color(colorBaseWhite, colorBaseWhite);
    t.color(colorBase);

    $("#" + t.name).click(

        function(){


            //$("#" + _this.name).hide();
            $("#" + form.name).remove(); //光 hide 是不行的

            _alert(form.year + "-" + form.month + "-" + form.day);

            return false;
        }

    );  
    //*/

    
    var t = new Button(form.name + "_btnCancel", pnlBottom, "取消"); //注意名称不要和已有的冲突
    var btnCancel =t;
    t.Create(); 
    t.width("80px");
    t.height("48px", true);
    $("#" + t.name).css({"font-size": "14px"}); 
    $("#" + t.name).css({"background-color": "#666"});      
    //$("#" + t.name).css({"margin":"0 auto"});   
    //$("#" + t.name).css({"display":""}); 
    //t.center(); //这个目前只能左右居中
    t.set_background_color(colorBaseWhite, colorBaseWhite);
    t.color(colorBase);

    $("#" + t.name).click(

        function(){


            //$("#" + _this.name).hide();
            $("#" + form.name).remove(); //光 hide 是不行的

            return false;
        }

    );  
    //*/

    

}//

//---------------------------------------------------

//重置天的数据//bCreate 是否需要创建,还是只设置数据和事件
function _dialogs_date_ResetDays(form, pnlGrid, colorBaseWhite, colorBase_day, bCreate) {
    //每一天
    //算出是星期几
    //var now = new Date().getDay();
    var now = new Date(); //var week = new Date().getDay(); //取得周几,从 0 到 6
    //now.setFullYear(form.year,form.month,form.day);
    now.setFullYear(form.year,form.month-1, 1); //月是从 0 开始的,日是从1开始的

    var week = now.getDay(); //取得本月1号周几,从 0 到 6
    //alert(now + ">>" + week);

    ///使用new Date(year,month,0)的方式,可以获取该月的最后一天
    //var lastDay = new Date(form.year,form.month-1,0).getDate(); //应该是从 1 开始的
    now = new Date(form.year,form.month,0); //构造函数和 setFullYear 不一样,这里的月是从 0 开始的
    var lastDay = now.getDate(); //应该是从 1 开始的//月中的哪一天
    //alert(now + ">>" + week + ">>" + lastDay);
    //alert(lastDay);

    for (i=0; i<49; i++){

        var t = new Panel(form.name + "_pnlGrid_cell" + i, pnlGrid); // //注意名称不要和已有的冲突
        var pnlCell = t;

        if (bCreate) { //是否需要创建 dom 节点
            t.Create(); 
            t.width("24px");//autowidth();s
            t.height("24px", true);   
            //t.autoheight();
            //t.space_width("4px");
            t.set_text_center();
        }//if

        $("#" + t.name).css({"font-size": "14px"}); 
        t.set_background_color(colorBaseWhite, colorBase_day);

        $("#" + t.name).html(""); //先清空

        //要根据 week 更改偏移,计算第一天出现在什么位置
        //$("#" + t.name).append(i); //加完图标再加标题
        var day = (i-week)+1; //日是从1开始的
        if (day>0 && day <= lastDay) {
            $("#" + t.name).html(day); //加完图标再加标题
            t.set_background_color(colorBaseWhite, colorBase_day);

            //var eData = {t, form}; //ie11,ie10 居然不支持这种写法//这种写法首见于微信小程序
            var eData = {t:t, form:form};
            $("#" + t.name).click( //事件里好像是不能直接访问外面的变量的
                eData, //第一个参数就是 jquery 事件函数中的 data ,一般传的 json 对象进去
                function(e){
        
                    //$("#" + _this.name).hide();
                    //$("#" + form.name).remove(); //光 hide 是不行的

                    //$("#" + t.name).remove(); //no//光 hide 是不行的//这里取出的 t 是不能直接用的,一定要取参数中的
                    //$("#" + e.data.t.name).remove(); //ok//光 hide 是不行的//e.data 中的 data 是固定的,还有 e.target 等固定的数据过来
                    //http://www.runoob.com/jquery/jquery-ref-events.html

                    var form = e.data.form; //一定要再用本地变量从事件变量中再取一次
                    var t = e.data.t; //一定要再用本地变量从事件变量中再取一次

                    //--------

                    if (form.lastClick) form.lastClick.set_background_color(colorBaseWhite, colorBaseWhite); //不会变化的变量可以直接用

                    t.set_background_color(colorBase_day, colorBase_day);
                    form.day = t.get_caption_value(); //改变日期
                    //alert(form.day);
                    //--
                    form.lastClick = t;
        
                    return false;
                }
        
            );  

        }else{//不在日期范围内的清空
            t.set_background_color(colorBaseWhite, colorBaseWhite);
        }//if

        t.color("#000000");

        //当天的高亮
        //if (i == 10 ) t.set_background_color(colorBase_day, colorBase_day);
        if (day == form.day ) {
            t.set_background_color(colorBase_day, colorBase_day);
            form.lastClick = t;
        }//if

        //圆形
        //border-radius: 100%; //100% 50% 都可以
        $("#" + t.name).css({"border-radius": "50%"}); 
    
    }//for
}//



