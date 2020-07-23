
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//自由定位的 Panel


//参考 https://www.cnblogs.com/humin/p/4556820.html
//构造继承
//也可以换用其他继承方法,我们对类的使用非常浅

function FreePanel(_name,_parent){
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
        $(document.body).append(s); //不能用 document.write(s); 那样会清空整个 html 因为文档流已经结束了
        else $("#" + _parent.name).append(s);

        var dom = $("#" + _name);
        dom._this = this; //似乎传不过去
        dom.get(0)._this = this; //要先取得 jquery 变量对应的原始 dom 变量后才能传

        this.default_click(); //可以给一个默认的点击事件

        //在 vh 两个方向上都垂直居中
        //this._center_vh();

        this.free_pos("0px", "0px");

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

    //自由定位//右下
    this.free_pos_rb = function(x, y, base_parent){
        $("#" + this.name).css({"position": "absolute"});
        $("#" + this.name).css({"right": x});
        $("#" + this.name).css({"bottom": y});

        //https://www.w3school.com.cn/cssref/pr_pos_left.asp
        //默认值：auto
        //取消掉 left 和 top 的值
        $("#" + this.name).css({"left": "auto"});
        $("#" + this.name).css({"top": "auto"});

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

    
    //js 级别的居左对齐，注意在父节点变化时会失效，要重算
    this.alignLeft = function(){

        var x = 0;
        var y = 0;

        var h = $("#" + this.parent.name).outerHeight();
        var w = $("#" + this.parent.name).outerHeight();

        this.free_pos(x,y,true);
        $("#" + this.name).height(h);

    }//

    //js 级别的居右对齐，注意在父节点变化时会失效，要重算
    this.alignRight = function(){

        var x = 0;
        var y = 0;

        //var h = $("#" + this.parent.name).height();
        //var w = $("#" + this.parent.name).width();

        var sw = $("#" + this.parent.name).width();

        var h = $("#" + this.parent.name).outerHeight(); //带 outer 的才是整体的大小
        var w = $("#" + this.parent.name).outerWidth();

        var sw = $("#" + this.name).outerWidth();

        x = w - sw;

        this.free_pos(x,y,true);
        $("#" + this.name).height(h);

    }//

    /*
    //定义对外公开访问方法//在 vh 两个方向上都垂直居中
    this._center_vh = function() {

        //各浏览器支持情况的权威说明 https://caniuse.com/#feat=flexbox

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

        //$("#" + this.name).css({"display": "flex"});

        //居中的语法
        $("#" + this.name).css({"justify-content":"center", "align-items":"center"});
    }//
    *///
 


    //----------------------------------------
    //this.prototype = new Panel();
    //Button.prototype.name = 'cat';

//--------------------------------------------

  
}//
