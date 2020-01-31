
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//标准化的 a 标签
function FreeUrl(_url, _title,  _name,_parent){
    //Panel.call(this); //构造继承//构造函数的参数一定要对上,否则其中的 _name 带不过去的
    ////Panel.call(this, _name, _parent); //构造继承

    //Person类的公开属性，类的公开属性的定义方式是：”this.属性名“
    this.name=_name;
    this.parent=_parent;//类的公开属性

    //--------------------------------------------
    //定义Person类的公开方法(特权方法)，类的公开方法的定义方式是：”this.functionName=function(){.....}“
    this.Create = function(){

        

        //document.writeln("在公开方法里面访问类的私有属性是允许的，age="+age+"\t"+"salary="+salary);//在公开方法里面访问类的私有属性是允许的
        //$("#"+_name).
        //$("#a").t
        
        var _this = this; //可以用微信小程序的方法取得 this
        //不能放这里，要放到生成后//var thisjq = $("#" + _this.name);

        var s = "<a href='"+ _url +"' id='" + _name + "' >"+ _title +"</a>";

        if (null == _parent)
        $(document).append(s);
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        dom._this = this; //似乎传不过去
        dom.get(0)._this = this; //要先取得 jquery 变量对应的原始 dom 变量后才能传

        ////this.free_pos("0px", "0px");

        //panel 这些 ui 库默认点击事件是不传递的，所以要让 a 标签起作用的话要打开它
        UI_EnableUrlClick(_parent); 

    }//


    //自由定位//左上
    this.free_pos = function(x, y, base_parent){
        $("#" + this.name).css({"position": "absolute"});
        $("#" + this.name).css({"left": x});
        $("#" + this.name).css({"top": y});

        //一般还要设置父节点
        if (base_parent == true){
            //$("#" + this.parent.name).css({"position": "absolute"});
            $("#" + this.parent.name).css({"position": "relative"}); //父节点为 absolute 的时候效果还不一样，那样的话就是基于自己的正常位置偏移了，比较古怪
        }

        //当 父元素 的 position 设为 relative 时，
        //其子元素的 absolute position 是按照父元素的相对位置来的 
        //否则就是相对于整个文档的位置，官方说法是 //absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位

        //其中 static 是 position 的默认值。没有定位，元素出现在正常的流中

    }//

    

    //----------------------------------------
    //this.prototype = new Panel();
    //Button.prototype.name = 'cat';

//--------------------------------------------

  
}//
