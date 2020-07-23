
/// <reference path="jquery-1.11.3.min.js" />
/// <reference path="panel.js" />
/// <reference path="free_panel.js" />
/// <reference path="functions.js" />

//https://www.cnblogs.com/kismet82/p/5479390.html
//js 中显示 jquery 提示的方法

//需要手工生成 iframe 时用，参考 free_frame.js

//在客户区显示一个内嵌网页
function iframe_src(url, id){
    //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='http://163.com/test2.htm' />");
    //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='' />"); //ok 不过默认样式不好看
    //form2.clientPanel.add_html("<iframe id='his_window' name='his_window' src='' frameborder='0' width='100%' height='100%' />");


    //var html_ = "<iframe id='" + id + "_src_id' name='his_window' src='" + url + "' frameborder='0' width='100%' height='100%' />";
    var html_ = "<iframe id='" + id + "' name='" + id + "' src='" + url + "' frameborder='0' width='100%' height='100%' />";

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
    /////$("#" + _this_control.clientPanel.name).css("-webkit-overflow-scrolling", "touch");
    //$("#" + _this_control.clientPanel.name).css("overflow-y", "scroll");
    ////$("#" + _this_control.clientPanel.name).css("overflow-y", "auto");

    //-------------------------------------------------------
    //重要！ 在页面是 <!DOCTYPE html> 的情况下，iframe 的高度会多出 4px, 这时要将它的 display:block; 
    //参考 http://newbt.net/ms/vdisk/show_bbs.php?id=67B5EEA2BF98395B06E8ABDE110039A8&pid=160

    return html_;
}//


//最好是给这个 css 以下的标准 css，原因见上
function iframe_css(id, parent_id) {

    //改用 overflow-y: auto; 可以解决，但估计这种方式以后肯定是要改的//自己做滑动控件？ 参考 https://blog.csdn.net/zfzhuman123/article/details/90520355
    $("#" + parent_id).css("-webkit-overflow-scrolling", "touch");
    //$("#" + _this_control.clientPanel.name).css("overflow-y", "scroll");
    $("#" + parent_id).css("overflow-y", "auto");

    //----------------
    $("#" + id).css("display", "block");
    $("#" + id).css("box-sizing", "border-box");

}//

