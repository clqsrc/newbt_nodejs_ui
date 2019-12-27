# newbt_nodejs_ui
原开发用于 nodejs 环境的 ui 库，实际也直接用于普通网页的 ui 环境
# 开发初衷
以前一直用 layui 等于老牌 js 库，但手机端的突然崛起，让它们中的大多数成为了过去式（至少 newbt_nodejs_ui 开发时 layui 还不能支持好手机端）。
只好又找了 Element UI 等等这些新兴的 js 库，但 vue 这样的框架明显太过庞大，要想自由裁剪实在不容易。最后无奈之下，仗着也学了好几年 css/js 了尝试
在业余时间弄了一个自己的库，dom 操作基本交由 jquery ，最后实现其实还是比较简单的，大部分时间还是用到了 css 上。其实我感觉既然都是 js 库了，直接用 js 
替换掉那些二义性的 css 兼容性会更高，不过现在这样我也能用了。其实本质上就是实现了一个扩展的 div， 我用 delphi 很久，所以用 Panel 给这个类命名，在这个
基础上扩展其他控件其实就是代码量的问题，丝毫不难，兼容性调整也很简单。每种控件我都写成一个单独的文件，这样取舍、裁剪起来也是异常的简单。要研究，或者是要
改进，看那两个 Panel 类就可以了。两个 Panel 的不同之处在于一个是主要利用 CSS 布局的，一个纯 js 操作界面的。这个库主要偏向富客户端，所以以后应该会以纯 js
的为主，不过目前的却还是 CSS 布局的多，这样也有好处：那就是方便搜索引擎和浏览器调试。不管怎样它们以后会共存吧。简单的 CSS 方便好调试，复杂的 UI 用纯 js 
的才能精确定位。
# 各个类的说明
待完善
