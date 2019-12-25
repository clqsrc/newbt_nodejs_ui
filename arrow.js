
/// <reference path="jquery-1.11.3.min.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//在 layer,element,amazeui 中喜欢叫做 caret-left,caret-down . 不过即使在 css 中 caret 一般也指的是输入框中的光标
//http://element-cn.eleme.io/#/zh-CN/component/icon
//http://amazeui.org/css/icon?_ver=2.x#guan-yu-bu-fen-qi-pa-yong-hu-dai-li-bu-xian-shi-zi-ti-tu-biao
//amazeui 是用字体实现的，这里是用 css

function CreateArrow(name)
{
    //   
}

//参考 https://www.cnblogs.com/xdp-gacl/p/3700840.html
//定义一个类
function Arrow(_name,_parent){
    //Panel.call(this); //构造继承//构造函数的参数一定要对上,否则其中的 _name 带不过去的
    Panel.call(this, _name, _parent); //构造继承

    //--------------------------------------------
    //本控件独有的属性
    this._color = "#555"; //默认灰色
    this._width = "12px"; //默认大小//宽高是一样的

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
        
        //this.default_click(); //可以给一个默认的点击事件

    }//

    //可以给一个默认的点击事件
    this.default_click = function() {

        var _this = this;
        var thisjq = $("#" + _this.name);

        $("#" + _this.name).click(

            function(){

                _this.active = !_this.active;

                if (_this.active)
                thisjq.css({"background-color": _this.active_background_color});
                else
                thisjq.css({"background-color": _this.background_color});

                //_alert("this.click_parent:" + _this.click_parent);

                if (_this.click_parent != false) return true; //点击事件中是否传递给父节点

                
                //return false; // 阻止事件冒泡和默认操作
                return true; //这只是个图标，显然是要允许事件通过的
                //jquery怎么在父元素事件中禁止子元素的事件？
                //1、在父元素事件的function中加if(event.target==this){ }
                //2、子元素事件function最后加event.stopPropgation（）；// 阻止事件冒泡
                //3、简单点，直接在子元素事件function最后加return false；// 阻止事件冒泡和默认操作                
            }

        );        

    }//

    //利用 css 画出图形//这是向右的箭头，其他方向其实并不重画，而是旋转一个角度//原理是利用边框绘制时的切角
    this.draw = function(){
 
        //css 画三角形 https://www.cnblogs.com/v-weiwang/p/5057588.html
        /*
        var btntree1_img = new Panel("btntree1_img", btntree1, "b"); //下拉框
        btntree1_img.Create(); 
        btntree1_img.width("12px");
        btntree1_img.height("12px"); 
        $("#" + btntree1_img.name).css(
            {
                //"background-color": "#252525", 
                "background-color": "transparent", 
                //"border-width": "100px 100px 100px 100px",
                // "border-color": "red forestgreen blue cyan",
                //"border-width": "24px",
                "border-width": "6px", //宽度的一半就可以了,要不反而不对
                "border-color": "transparent transparent transparent #555",
                "vertical-align": "middle", //居中的元素必须有这个属性
                "border-style": "solid"
            }
        );   
        */

        this.width(this._width);
        this.height(this._width); 
        var bw = function_StrToInt(this._width);
        //_alert(bw);
        $("#" + this.name).css(
            {
                //"background-color": "#252525", 
                "background-color": "transparent", 
                //"border-width": "100px 100px 100px 100px",
                // "border-color": "red forestgreen blue cyan",
                //"border-width": "24px",
                //"border-width": "6px", //宽度的一半就可以了,要不反而不对
                "border-width": bw / 2 + "px", //宽度的一半就可以了,要不反而不对
                "border-color": "transparent transparent transparent #555",
                "border-left-color": this._color,
                "vertical-align": "middle", //居中的元素必须有这个属性
                "border-style": "solid"
            }
        );   


    }//

    //画出向下的箭头
    this.draw_down = function(){

        this.draw();

        ////事件要操作其他人,最好放在最后
        // $("#" + btntree1.name).click( //这个会比默认点击事件后执行,因为那个先写的
        //
        //     function(){
        //         //图片旋转 90 度
        //         var r = 90; 
        //         if (btntree1.active)
        //         $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');
        //
        //         r = 0;
        //         if (!btntree1.active) $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');
        //
        //         //return false;
        //     }
        //
        // ); 


        //图片旋转 90 度
        var r = 90; 
        $("#" + this.name).css('transform', 'rotate(' + r + 'deg)');

        //r = 0;
        //if (!btntree1.active) $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');

    }//

        //画出向下的箭头
    this.draw_down = function(){

        this.draw();

        ////事件要操作其他人,最好放在最后
        // $("#" + btntree1.name).click( //这个会比默认点击事件后执行,因为那个先写的
        //
        //     function(){
        //         //图片旋转 90 度
        //         var r = 90; 
        //         if (btntree1.active)
        //         $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');
        //
        //         r = 0;
        //         if (!btntree1.active) $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');
        //
        //         //return false;
        //     }
        //
        // ); 


        //图片旋转 90 度
        var r = 90; 
        $("#" + this.name).css('transform', 'rotate(' + r + 'deg)');

        //r = 0;
        //if (!btntree1.active) $("#" + btntree1_img.name).css('transform', 'rotate(' + r + 'deg)');

    }//

    //画出向下的箭头
    this.draw_right = function(){

        this.draw();



        //图片旋转 90 度
        //var r = 90; 
        //$("#" + this.name).css('transform', 'rotate(' + r + 'deg)');

        var r = 0;
        $("#" + this.name).css('transform', 'rotate(' + r + 'deg)');

    }//    


//--------------------------------------------


}//
