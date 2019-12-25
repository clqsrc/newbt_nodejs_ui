
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

function CreateButton(name, title)
{
    //也可以按 https://www.cnblogs.com/lyzg/p/5133250.html
    //改成 mustache.js 模板
    return '' +
    '<div id="' + name + '" style="background-color:#333;color: #fff; text-align: center; '  +
    //' vertical-align: middle; '+ //vertical-align: middle; 其实做不了垂直居中
    ' display: table-cell; ' +
    ' cursor:default; ' + //pointer; ' + // 或 cursor:hand; //手型鼠标
    '">' +
    //vertical-align: middle; 其实做不了垂直居中

    title +
    '</div>'
    
    
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

function Button(_name,_parent,_title){
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

        var s = CreateButton(_name, _title);
        if (null == _parent)
        document.write(s);
        else $("#" + _parent.name).append(s);

    }//

    //----------------------------------------
    //this.prototype = new Panel();
    //Button.prototype.name = 'cat';

//--------------------------------------------

  
}//
