
//和 show_url_window 差不多，不过这个显示的不是窗体，而是模拟一个页面

	//var gUrlForm;
	
	
	function ShowUrl_InPage(url) 
	{

		var gUrlForm; //还是放到函数体里来，因为可能会弹出多层
	
		var form2 = new FreeFrame("id_gUrlForm", null);//return;
		form2.Create();
		form2.width("400px");
		form2.height("500px");
		form2.OnSize();
		form2.set_background_color("#252525", "#353535");

		form2.CanMoveWindow = false;

		gUrlForm = form2;
		
		
		//var l = Div_GetLeft(form1.btnClose.name);
		//var t = Div_GetTop(form1.name);
		
		// l = Div_GetLeft("test1");
		// t = Div_GetTop("test1") + Div_GetHeight("test1");
		
		// form2.free_pos(l, t);

		
		////form2.ShowAtBottom("btnShowHis");

		gUrlForm.ShowHtml_src(url);
		

		
		//美化窗体的 ui 而已
		FormSkin_gUrlForm(gUrlForm);
		
	}//ShowHisMessage

	
	//--------------------------------------------------
	//美化历史窗体的 ui 而已
	function FormSkin_gUrlForm(form)
	{
		//$("#" + gHisForm.title.name).css({"background-color":"#eeeeee","font-size":"200%"}); //ok
		form.title.set_background_color("#f8f8f8", "#f8f8f8");
		$("#" + form.title.name).css('border','1px solid #cccccc'); //边框
		$("#" + form.title.name).css('border-bottom','0px solid #cccccc'); //边框
		$("#" + form.clientPanel.name).css('border','1px solid #cccccc'); //边框
		$("#" + form.clientPanel.name).css('border-top','0px solid #cccccc'); //边框

		form.height("400px");
		form.width("80%");
		form.height("100%");
		form.width("100%");
		//form.OnSize();

		form.CanMoveWindow = false; //不让窗口移动

		form.free_pos("0px", "0px");
		//form.OnSize(); //修改了位置，要再来一次

		resize(); //调整控件位置

		$(window).resize(function () { //这个可以多次执行
			//执行代码块
			
			resize();

		});			

		function resize(){ //调整控件位置

			form.OnSize();

			//调整一下关闭按钮的位置
			form.btnClose.free_pos("0px", "0px");

		}//

		//----
		//重画关闭按钮
        var canvas_id =  form.btnClose.canvas_id;

        //canvas = $("#" + o.name +"_canvas");
        canvas = $("#" + canvas_id)[0]; //注意要转换成 js 原生变量
        if(canvas.getContext){    //  必须判断是否存在该方法，即判断浏览器是否支持canvas

            var ctx = canvas.getContext("2d");

            //https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
            //_alert(ctx.width);//Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。但是，可以使用HTML的高度和宽度属性来自定义Canvas 的尺寸。
            var x = 20;//canvas.width; //ctx.width;
            var y = 20;//canvas.height; //ctx.height;


            ctx.lineWidth = 1; //线宽度
            // ctx.fillStyle = "#FFA500"; //填充色
            //ctx.strokeStyle = "#FFA500"; //线的颜色
            ctx.strokeStyle = "#000000"; //"#444444"; //线的颜色

            var sp_width = 6; //边距

			 //----
			 //用背景色覆盖掉原来的
			 ctx.fillStyle = "#f8f8f8";//"rgb(200,0,0)";
			 ctx.fillRect (0, 0, Div_GetWidth(canvas_id), Div_GetHeight(canvas_id));

			 //----
			 //画向左的空心箭头
			 //https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
			//  ctx.fillStyle = "#000000";//"rgb(200,0,0)";
			//  ctx.beginPath();
			//  ctx.moveTo(75, 50);
			//  ctx.lineTo(100, 75);
			//  ctx.lineTo(100, 25);
			//  ctx.fill();
			
			sp_width = 2;
			var sp_left = (y / 2) - 4; //再整体向左移动一点
			
            ctx.beginPath(); //一定要有这个才画得出线
			ctx.moveTo((x - sp_width) - sp_left, sp_width); //将画笔抬起点到x，y处
			
            //ctx.lineTo(sp_width, y / 2); //将画笔移到x，y处//这个是箭头尖
            ctx.lineTo((x / 2) - sp_left, y / 2); //将画笔移到x，y处//这个是箭头尖

            ctx.lineTo((x - sp_width) - sp_left, y - sp_width); //将画笔移到x，y处
            ctx.stroke(); //一定要有这个才画得出线			
 
		 }//canvas		

	}//skin
