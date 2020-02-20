
/// <reference path="jquery-1.11.3.min.js" />

//表格，这个其实不是组件，只是用 panel 组成的合成组件，应该看作方便性的函数集


//定义一个类//这里只当做结构体用
function Grid(_name,_parent){
    //类的公开属性，类的公开属性的定义方式是：”this.属性名“
    this.name=_name;
    this.parent=_parent;//类的公开属性


    //--------------------------------------------

    this.active = false; //算了,还是 bool 类型方便

    this.background_color = "red";
    this.active_background_color = "transparent";

    this.row_count = 0; //当前总共有多少行,动态的
    this.col_count = 0; //多少列，和行不同，一般是固定的

    //--------------------------------------------


    

}//

//col_count -- 多少列
function CreateGrid(col_count){

    var grid = new Grid();


    return grid;
}//