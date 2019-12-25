


//<script language="javascript" type="text/javascript">

//静态 html 的参数解析器
//直接参考 showbbs.html

function loadXMLDoc(url) {
    var xmlhttp;
    var last = null;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        //alert("aaa");
        //alert(xmlhttp.getResponseHeader('Last-Modified'));
        //if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
        if (xmlhttp.readyState == 4 && xmlhttp.status != 404) //判断 404 就可以了,因为没变化的话是 304
        {
            //document.getElementById('p1').innerHTML = "Last modified: " + xmlhttp.getResponseHeader('Last-Modified');
            //var last = xmlhttp.getResponseHeader('Last-Modified');

        }
    }
    //xmlhttp.open("GET", url, true);
    //xmlhttp.open("HEAD", url, true); //默认异步方式
    xmlhttp.open("HEAD", url, false); //默认异步方式//我们要同步方式
    xmlhttp.send();

    //--------------------------------------------------
    //document.getElementById('p1').innerHTML = "Last modified: " + xmlhttp.getResponseHeader('Last-Modified'); //同步的情况下不用判断 readyState,直接 send 后取就行了

    return xmlhttp.getResponseHeader('Last-Modified'); //oss 里有这个标志

} //

//这个要用 get 请求完整的
function loadXMLDoc2(url) {
    var xmlhttp;
    var last = null;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        //alert("aaa");
        //alert(xmlhttp.getResponseHeader('Last-Modified'));
        //if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
        if (xmlhttp.readyState == 4 && xmlhttp.status != 404) //判断 404 就可以了,因为没变化的话是 304
        {
            //document.getElementById('p1').innerHTML = "Last modified: " + xmlhttp.getResponseHeader('Last-Modified');
            //var last = xmlhttp.getResponseHeader('Last-Modified');

        }
    }
    //xmlhttp.open("GET", url, true);
    //xmlhttp.open("HEAD", url, true); //默认异步方式
    ////xmlhttp.open("HEAD", url, false); //默认异步方式//我们要同步方式
    xmlhttp.open("GET", url, false); //默认异步方式//我们要同步方式
    xmlhttp.send();

    //--------------------------------------------------
    //document.getElementById('p1').innerHTML = "Last modified: " + xmlhttp.getResponseHeader('Last-Modified'); //同步的情况下不用判断 readyState,直接 send 后取就行了

    //return xmlhttp.getResponseHeader('Last-Modified'); //oss 里有这个标志

} //

//--------------------------------------------------

UrlParm = function () { // url参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [p[1]];
                    } else if (typeof (index[p[0]]) == 'undefined') { // c=aaa
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        parm: function (o) { // o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues: function (o) { // o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) { }
        },
        //是否含有parmName参数
        hasParm: function (parmName) {
            return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap: function () {
            var map = {};
            try {
                for (var p in index) { map[p] = data[index[p]]; }
            } catch (e) { }
            return map;
        }
    }
} ();

//--------------------------------------------------
/*
var name = UrlParm.parm("name");
var id = UrlParm.parm("id");
var pid = UrlParm.parm("pid");
var page = UrlParm.parm("page");
//alert(name);

if (page == null) page = "0";

//--------------------------------------------------

// 以下方式直接跳转
//window.location.href = 'hello.html';
//window.location.href = 'http://www.163.net';
window.location.href = url1;
// 以下方式定时跳转
//setTimeout("javascript:location.href='hello.html'", 5000); 
//</script>
*/
//--------------------------------------------------