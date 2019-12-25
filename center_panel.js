
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//修改自 edit.js 原因是目前没有比较好的 div 元素居中的办法,因此做一个

function CreateCenterPanel(name)
{
    //也可以按 https://www.cnblogs.com/lyzg/p/5133250.html
    //改成 mustache.js 模板
    return '' +
    '<div id="' + name + '_border' + '" style="background-color:#333;color: #fff; text-align: center; '  +
    //' vertical-align: middle; '+ //vertical-align: middle; 其实做不了垂直居中
    " " +
    //" display: table; " +
    ' vertical-align: top; ' + //vertical-align: top 很重要
    //' vertical-align: middle; ' + //vertical-align: top 很重要
    ' box-sizing: border-box; ' + 
    
    '">' +
    '<div id="' + name + '_border1' + '" style="display: table;" >'+ //居中1
    '<div id="' + name + '_border2' + '" style="display: table-cell; vertical-align: middle;">' + //居中2//注意这个的高度要和外围的相同
    //'<div id="' + name + '_border3' + '" style="" > '+ //居中3
    '<div id="' + name + '" style="" > '+ //居中3

    //'<input type="text" id="' + name + '" style="border: none; display:table-cell; vertical-align: middle; ' +
    //' box-shadow: none; ' + //应该是清除 chrome 的默认阴影状态//不行
    //' outline:none; ' + //这个才是清除 chrome 的焦点边框
    //' border: 1px solid transparent; ' + 
    //'"></>' +

    '</div>'+ //居中3
    '</div>'+ //居中2
    '</div>'+ //居中1
    '</div>' //edit 的属性很难控制,一般是在外层再加一个 div//为了居中还要再多加几层

    //看了其他的实现基本上也是 display: table + table-cell + vertical-align: middle 来实现的
    //参考 https://adminlte.io/themes/AdminLTE/index2.html
    
    
    ;
}

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

function CenterPanel(_name,_parent){
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

        var s = CreateCenterPanel(_name);
        if (null == _parent)
        document.write(s);
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        dom._this = this; //似乎传不过去
        dom.get(0)._this = this; //要先取得 jquery 变量对应的原始 dom 变量后才能传

        this.default_click(); //可以给一个默认的点击事件

    }//

    //定义对外公开访问方法//设置其宽度
    this.width = function(_width) {
        $("#" + this.name).css({"width": _width});
        $("#" + this.name + "_border").css({"width": _width});
        //设置宽度的同时最好是设置一下 display, 要不然会排到下一行去了
        $("#" + this.name + "_border").css({"display": "inline-block"});
    }//
 
    //定义对外公开访问方法//设置其宽度
    this.height = function(_height, _vcenter) {
        $("#" + this.name + "_border").css({"height": _height});
        //设置宽度的同时最好是设置一下 display, 要不然会排到下一行去了
        //$("#" + this.name).css({"display": "inline-block"});

        $("#" + this.name + "_border2").css({"height": _height}); //目前的实现中这个也要改

        if (_vcenter) $("#" + this.name + "_border").css({"line-height": _height}); //可以让单行的文字垂直居中//暂时,不好

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
