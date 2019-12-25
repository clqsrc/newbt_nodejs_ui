
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//垂直居中在前面的 center_panel.js 是使用多个 div 层层嵌套得来的，在调试时很是不便.
//如果只是支持手机或者是最新的 ie11 以上的浏览器的话
//可以使用 "display": "flex", "justify-content":"center", "align-items":"center", //这3个配合，可以让子元素垂直居中
//flex 是 2012 年才正式定下的布局方式,也称为弹性布局
//这种布局代替了之前的 
//display: -webkit-box;  
//display: -moz-box; 
//display: -ms-flexbox;  
//display: -o-box; 
//display: box; 
//display: flexbox; 
//等

//最早见于微信小程序,不过目前来说最好还是只用于手机


// Flexbox布局的语法版本
//https://www.w3cplus.com/css3/ie10-flexbox-layout.html
// Flexbox布局的语法经过几年发生了很大的变化，也给Flexbox的使用带来一定的局限性，因为语法版本众多，浏览器支持不一致，致使Flexbox布局使用不多。从前面的教程中我们可以得知，Flexbox布局主要有三种语法版本：
//     2009版本，我们称之为老版本，使用的是“display:box”或者“display:inline-box”；
//     2011版本，我们称之为混合版本，使用的是“display:flexbox”或者“display:inline-flexbox”；
//     2013版本，也就是最新语法版本，使用的是“display:flex”或者“display:inline-flex”。

//各浏览器支持情况的权威说明 https://caniuse.com/#feat=flexbox


//参考 https://www.cnblogs.com/xdp-gacl/p/3700840.html
//定义一个类

/*
function Cat(name){
    Animal.call(this);
    this.name = name || 'Tom';
  }
*/ 

//参考 https://www.cnblogs.com/humin/p/4556820.html
//构造继承
//也可以换用其他继承方法,我们对类的使用非常浅

function CenterPanel_v2(_name,_parent){
    //Panel.call(this); //构造继承//构造函数的参数一定要对上,否则其中的 _name 带不过去的
    Panel.call(this, _name, _parent); //构造继承
    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    //this.name=_name;
    //Person类的私有属性，类的私有属性的定义方式是：”var 属性名“
    //var age=_age;//私有属性
    //this.parent=_parent;//类的公开属性
    //var salary=_salary;//私有属性

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
        document.write(s);
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        dom._this = this; //似乎传不过去
        dom.get(0)._this = this; //要先取得 jquery 变量对应的原始 dom 变量后才能传

        this.default_click(); //可以给一个默认的点击事件

        //在 vh 两个方向上都垂直居中
        this._center_vh();

    }//

    //定义对外公开访问方法//在 vh 两个方向上都垂直居中
    this._center_vh = function() {

        //各浏览器支持情况的权威说明 https://caniuse.com/#feat=flexbox

        ///*
        $("#" + this.name).css({
            //注意它们顺序
            "display": "-webkit-box",
            "display": "-moz-box",
            "display": "-ms-flexbox",
            "display": "-o-box",
            "display": "box",
            "display": "-webkit-flexbox", //从上面的链接看,对于支持 android 2.1-4.3 来说是必须的
            "display": "flexbox",
            "display": "flex", //目前最新的是这个,一定不能少 //2019.03.29
        });
        //*/

        //$("#" + this.name).css({"display": "flex"});

        //居中的语法
        $("#" + this.name).css({"justify-content":"center", "align-items":"center"});
    }//
 

    /*
    //定义对外公开访问方法//自动宽度
    this.autowidth = function() {
        //有很多种方法,不一定用这种
        $("#" + this.name).css({"overflow": "hidden"});

        $("#" + this.name + "_border2").css({"overflow": "hidden"});
        $("#" + this.name + "_border1").css({"overflow": "hidden"});
        $("#" + this.name + "_border").css({"overflow": "hidden"});
        //没效果,不起作用//大概是因为目前使用 display: table; 实现的缘故
    }//
    */

    //----------------------------------------
    //this.prototype = new Panel();
    //Button.prototype.name = 'cat';

//--------------------------------------------

  
}//
