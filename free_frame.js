
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />
/// <reference path="free_panel.js" />
/// <reference path="functions.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//可拖放的窗口

//参考 https://www.cnblogs.com/humin/p/4556820.html
//构造继承
//也可以换用其他继承方法,我们对类的使用非常浅

function FreeFrame(_name,_parent){
    //Panel.call(this); //构造继承//构造函数的参数一定要对上,否则其中的 _name 带不过去的
    FreePanel.call(this, _name, _parent); //构造继承
    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    //this.name=_name;
    //Person类的私有属性，类的私有属性的定义方式是：”var 属性名“
    //var age=_age;//私有属性
    //this.parent=_parent;//类的公开属性
    //var salary=_salary;//私有属性

    var title; //可拖放的标题栏//私有属性
    var btnClose; //关闭按钮
    var clientPanel; //客户区的面板，可用于插入其他元素

    var x, y; //鼠标相对与div左边，上边的偏移

    var isDrop = false; //移动状态的判断鼠标按下才能移动

    //var CanMoveWindow = true; //本窗口是否能移动，一般是可以的，特殊需要时可固定
    this.CanMoveWindow = true; //本窗口是否能移动，一般是可以的，特殊需要时可固定

    var _self = this; //2020 用来表示控件本身，在所有函数体中都是唯一的，都可以用，而 _this 则是临时的

    //--------------------------------------------
    //定义Person类的公开方法(特权方法)，类的公开方法的定义方式是：”this.functionName=function(){.....}“
    this.Create = function(){

        //document.writeln("在公开方法里面访问类的私有属性是允许的，age="+age+"\t"+"salary="+salary);//在公开方法里面访问类的私有属性是允许的
        //$("#"+_name).
        //$("#a").t
        
        var _this = this; //可以用微信小程序的方法取得 this
        //var _this_control = this; //这个控件本身//可以在各个事件中用
        //不能放这里，要放到生成后//var thisjq = $("#" + _this.name);

        var s = CreatePanel(_name);
        if (null == _parent)
        $(document.body).append(s); //不能用 document.write(s); 那样会清空整个 html 因为文档流已经结束了
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        dom._this = this; //似乎传不过去
        dom.get(0)._this = this; //要先取得 jquery 变量对应的原始 dom 变量后才能传

        this.default_click(); //可以给一个默认的点击事件

        //在 vh 两个方向上都垂直居中
        //this._center_vh();

        this.free_pos("0px", "0px");

        //初始化子窗口等子元素
        this.init_controls();

    }//

    //初始化子窗口等子元素
    this.init_controls = function(){

        var _this_control = this; //这个控件本身//可以在各个事件中用

        o = new FreePanel(this.name  + "_title", this);
        this.title = o;//new FreeFrame(this.name  + "_title", this);

        o.Create();
        o.width("100px");
        o.height("25px")
        o.set_background_color("#555555", "#444444");   
        
        
        _this = o;

        //var _this = this;
        var thisjq = $("#" + o.name);        

        $("#" + o.name).click(

            function(){

                _this.active = !_this.active;
 
                if (_this.active)
                thisjq.css({"background-color": _this.active_background_color});
                else
                thisjq.css({"background-color": _this.background_color});

                ////_alert("this.click_parent:" + _this.click_parent);

                if (_this.click_parent != false) return true; //点击事件中是否传递给父节点

                return false; // 阻止事件冒泡和默认操作
          
            }

        );     


        //--------------------------------------------------------
        //用三个事件来实现 div 的拖动//onmousedown, onmousemove, onmouseup //另外上面的 click 事件还是会触发的

        //this.title.onmousedown 是不行的

        //var dom_title = (thisjq).get(0); //这是 jquery 变量转换成普通 js 变量的方法
        var dom_title = ($("#" + this.title.name)).get(0); //这是 jquery 变量转换成普通 js 变量的方法
        var dom_form =  ($("#" + this.name)).get(0); //这是 jquery 变量转换成普通 js 变量的方法

        dom_title.onmousedown = function(e) { //this.title.onmousedown = function(e) {
            var box = dom_form;

            var e = e || window.event; //要用event这个对象来获取鼠标的位置
            this.x = e.clientX - box.offsetLeft;
            this.y = e.clientY - box.offsetTop;
            this.isDrop = true; //设为true表示可以移动

            if (e.preventDefault) e.preventDefault(); //阻止默认事件，取消文字选中//据说可以，不一定有效//ie 不支持，所以要判断一下是否存在
            e.returnValue = false; //同上，据说 ie 支持

            //_alert("onmousedown");

        } //onmousedown

        //var _this = this; //事件里不能直接用 this //奇怪，这个居然有影响
        
        dom_title.onmousemove = function(e) {//document.onmousemove = function(e) {//dom_title.onmousemove = function(e) {

            if (false == _self.CanMoveWindow) return; //设置为不能移动的话，直接跳出就行了

            //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
            if(this.isDrop) {　　　//if(this.isDrop) {//if(_this.isDrop) {//其实这样写是有问题的，这时候的 this 不是 freeframe 而是 dom_title
                
                var box = dom_form;
                　
                var e = e || window.event;                    　　
                var moveX = e.clientX - this.x; //得到距离左边移动距离                    　　
                var moveY = e.clientY - this.y; //得到距离上边移动距离
                //可移动最大距离
                //ie6 下 document.documentElement.clientWidth 这两个都是 0//window.screen.width
                //var maxX = document.documentElement.clientWidth - box.offsetWidth;
                //var maxY = document.documentElement.clientHeight - box.offsetHeight;
                var maxX = window.screen.width - box.offsetWidth;
                var maxY = window.screen.height - box.offsetHeight;

                //范围限定  当移动的距离最小时取最大  移动的距离最大时取最小
                //范围限定方法一
                /*if(moveX < 0) {
                    moveX = 0
                } else if(moveX > maxX) {
                    moveX = maxX;
                }

                if(moveY < 0) {
                    moveY = 0;
                } else if(moveY > maxY) {
                    moveY = maxY;
                }　*/
                //范围限定方法二　
                moveX=Math.min(maxX, Math.max(0,moveX));
                
                moveY=Math.min(maxY, Math.max(0,moveY));
                box.style.left = moveX + "px";　　
                box.style.top = moveY + "px";　　　　　　　　　　
            } else {
                return;　　　　　　　　　　
            }

        } //onmousemove       

        dom_title.onmouseup = function() {
            this.isDrop = false; //设置为false不可移动
        }//onmouseup

        //--------------------------------------------------------
        //关闭按钮
        o = new FreePanel(this.name  + "_btnclose", this.title);
        this.btnClose = o;//new FreeFrame(this.name  + "_title", this);

        o.Create();
        o.width("100px");
        o.height("25px")
        //o.set_background_color("#55000000", "#44000000");  //这个 ie 系解析不了 
        //o.set_background_color("#555555", "#444444"); 
        // o.set_background_color("transparent", "transparent");  
        o.set_background_color_Transparent(); 
        
        o.add_html("<canvas id='"+ o.name +"_canvas'>.</canvas>"); //ie6 应该是不支持的

        o.canvas_id =  o.name +"_canvas"; //加上属性，以便调用者重绘

        //canvas = $("#" + o.name +"_canvas");
        canvas = $("#" + o.name +"_canvas")[0]; //注意要转换成 js 原生变量
        if(canvas.getContext){    //  必须判断是否存在该方法，即判断浏览器是否支持canvas

            var ctx = canvas.getContext("2d");

            //https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
            //_alert(ctx.width);//Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。但是，可以使用HTML的高度和宽度属性来自定义Canvas 的尺寸。
            var x = 20;//canvas.width; //ctx.width;
            var y = 20;//canvas.height; //ctx.height;
            //_alert(canvas.height);

            ctx.lineWidth = 1; //线宽度
            // ctx.fillStyle = "#FFA500"; //填充色
            //ctx.strokeStyle = "#FFA500"; //线的颜色
            ctx.strokeStyle = "#000000"; //"#444444"; //线的颜色

            var sp_width = 6; //边距

            ctx.beginPath(); //一定要有这个才画得出线
            ctx.moveTo(sp_width, sp_width); //将画笔抬起点到x，y处
            ctx.lineTo(x - sp_width, y - sp_width); //将画笔移到x，y处

            ctx.moveTo(x - sp_width, sp_width); //将画笔抬起点到x，y处
            ctx.lineTo(sp_width, y - sp_width); //将画笔移到x，y处
            ctx.stroke(); //一定要有这个才画得出线

            // ctx.fillStyle = "rgb(200,0,0)";
            // ctx.fillRect (10, 10, 55, 50);

        }//
        
        //_this = o;

        //var _this = this;
        //var thisjq = $("#" + o.name);        

        $("#" + o.name).click(

            function(){

                //_this.active = !_this.active; //不能这样取 _this //要取得最顶端的 this 再向下找
                var _this =_this_control.btnClose;

                if (true){

                    $("#" +_this_control.name).remove(); //jQuery remove() 方法删除被选元素及其子元素//销毁整个控件

                    return false;
                }
 
                // if (_this.active)
                // thisjq.css({"background-color": _this.active_background_color});
                // else
                // thisjq.css({"background-color": _this.background_color});

                _alert("btnClose:" + _this.click_parent); //可以，不会与前面的混淆

                if (_this.click_parent != false) return true; //点击事件中是否传递给父节点

                return false; // 阻止事件冒泡和默认操作
          
            }//func

        ); //click         
        
        this.btnClose.free_pos("0px", "130px");
        
        //--------------------------------------------------------
        //var clientPanel; //客户区的面板，可用于插入其他元素
        o = new FreePanel(this.name  + "_panelclient", this);
        this.clientPanel = o;//new FreeFrame(this.name  + "_title", this);

        o.Create();
        o.width("100px");
        o.height("25px")
        o.set_background_color("#ffffff", "#ffffff");  
        
        //$("#" + o.name).css({"line-height": _height}); //边框
        //.css('border','1px solid red');
        $("#" + o.name).css('border','1px solid #444444'); //边框
        
        //_this = o;

        //var _this = this;
        var ojq = $("#" + o.name);        

        this.clientPanel.free_pos("30px", "30px");

        //_alert(ojq.width());
        //取 div 宽度//客户端
        var w =  Div_GetWidth_client(this.name);
        //取 div 高度//客户端
        var h = Div_GetHeight_client(this.name);   
        
        this.clientPanel.free_pos("0px", "30px");

        ////_alert((h));
       //// _alert((this.name));
       //// _alert($("#" +this.name).height()); //这时可能是 0 ，所以要在改变大小时再计算各位位置

        this.clientPanel.height( (h - 30) + "px" );
      
        //--------------------------------------------------------

        this.free_pos("10px", "10px");

        

    }//


    //在客户区显示一个内嵌网页
    this.ShowHtml_src = function(url){
        //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='http://163.com/test2.htm' />");
        //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='' />"); //ok 不过默认样式不好看
        //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='' frameborder='0' width='100%' height='100%' />");

        var _this_control = this; //这个控件本身//可以在各个事件中用

        $("#" + _this_control.clientPanel.name).html("<iframe id='" + _self.name + "_src_id' name='his_window' src='" + url + "' frameborder='0' width='100%' height='100%' />");

        //--------------------------------------------------------
        //目前的 iphone6 这样的，对 iframe 中的内容是不能滚动的
        //
        //据说可以在 iphone 下解决 iframe 不滚动的问题
        // -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
        // -webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */

        //----
        //也可以这样，但是对于动态页面就可能不合适
        //<iframe name="iframe2" onload="this.height=iframe2.document.body.scrollHeight" src="iframe2.html" frameborder="0" width="100%"></iframe>

        //----
        //<!--iframe外层加div 主要css:-webkit-overflow-scrolling:touch;overflow:auto!important;-->

        //----
        //overflow-y: scroll; 
        //这两的组合后确实可以，但是在 pc 上会很难看，怎样判断是 pc 呢
        //改用 overflow-y: auto; 可以解决，但估计这种方式以后肯定是要改的//自己做滑动控件？ 参考 https://blog.csdn.net/zfzhuman123/article/details/90520355
        $("#" + _this_control.clientPanel.name).css("-webkit-overflow-scrolling", "touch");
        //$("#" + _this_control.clientPanel.name).css("overflow-y", "scroll");
        $("#" + _this_control.clientPanel.name).css("overflow-y", "auto");

        //-------------------------------------------------------
        //重要！ 在页面是 <!DOCTYPE html> 的情况下，iframe 的高度会多出 4px, 这时要将它的 display:block; 
        //参考 http://newbt.net/ms/vdisk/show_bbs.php?id=67B5EEA2BF98395B06E8ABDE110039A8&pid=160

        $("#" + _self.name + "_src_id").css("display", "block");
        $("#" + _self.name + "_src_id").css("box-sizing", "border-box");


    }//

    //在某个 div 正文显示//未全面测试，也许某些情况下会失败，供参考//只是方便性函数//非核心函数
    this.ShowAtBottom = function(div_id) {
        l = Div_GetLeft(div_id);
        t = Div_GetTop(div_id) + Div_GetHeight(div_id);
        
        this.free_pos(l, t);

    }//


    //大小变化时要调用这个
    this.OnSize = function(){    

        //_alert(ojq.width());
        //取 div 宽度//客户端
        var w =  Div_GetWidth_client(this.name);
        //取 div 高度//客户端
        var h = Div_GetHeight_client(this.name);   

        //--------------------------------------------------------
        this.title.width(w + "px" );
        

        //--------------------------------------------------------
        this.clientPanel.free_pos("0px", "25px");

        //_alert((h));
        //_alert((this.name));
        //_alert($("#" +this.name).height()); //这时可能是 0 ，所以要在改变大小时再计算各位位置

        this.clientPanel.height( (h - 25) + "px" );
        this.clientPanel.width(w + "px" );

        //--------------------------------------------------------
        //关闭按钮的位置
        this.btnClose.free_pos( (w - 22) + "px", "2px");
        //this.btnClose.set_background_color("#ff0000", "#ffffff");  
        this.btnClose.width("20px");
        this.btnClose.height("20px");


    }//
  
}//
