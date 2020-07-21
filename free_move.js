

//参考 “拖动2.2.ie6兼容.html”
//主要的问题是 document.onmousemove 应该是不能重入的，如果别的代码用到了就可能会有问题

var VAR_free_move_div_lastClickDomNode = null; //最后一个点击的 dom 节点

function free_move_div(div_id) {

    //<div id="box" class="box"></div>
    //<script>
    //ie6 不支持 getElementsByClassName

    //var box = document.getElementById("box"); //获取元素
    var box = document.getElementById(div_id); //获取元素//2020
    VAR_free_move_div_lastClickDomNode = box;

    //var x, y; //鼠标相对与div左边，上边的偏移
    //var isDrop = false; //移动状态的判断鼠标按下才能移动
    box.x = 0; box.y = 0; //鼠标相对与div左边，上边的偏移
    box.isDrop = false; //移动状态的判断鼠标按下才能移动

    box.onmousedown = function(e) {

        box = this; //2020 如果有多少，似乎有重置一下这个变量
        VAR_free_move_div_lastClickDomNode = box;

        var e = e || window.event; //要用event这个对象来获取鼠标的位置
        x = e.clientX - box.offsetLeft;
        y = e.clientY - box.offsetTop;
        
        box.isDrop = true; //设为true表示可以移动

    }//

    document.onmousemove = function(e) {

        box = VAR_free_move_div_lastClickDomNode;

        //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        if(box.isDrop) {　　　　
            var e = e || window.event;                    　　
            var moveX = e.clientX - x; //得到距离左边移动距离                    　　
            var moveY = e.clientY - y; //得到距离上边移动距离
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

    }

    document.onmouseup = function() {
        box = VAR_free_move_div_lastClickDomNode;

        //isDrop = false; //设置为false不可移动

        box.isDrop = false; //设置为false不可移动
    }

    //----------------------------------------------------------------

}//function