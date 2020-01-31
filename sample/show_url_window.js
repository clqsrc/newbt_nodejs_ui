

	var gUrlForm;
	
	
	function ShowUrl_InPop(url) 
	{
	
		var form2 = new FreeFrame("id_gUrlForm", null);//return;
		form2.Create();
		form2.width("400px");
		form2.height("500px");
		form2.OnSize();
		form2.set_background_color("#252525", "#353535");

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


	//ShowHisMessage();
	//set_his_url("http://baidu.com");
	
    $("#btnShowHis").click(

        function(){

			ShowHisMessage();
			gHisForm.ShowHtml_src(gHisUrl);
			
            return false; // 阻止事件冒泡和默认操作
      
        }//func

	); //click   

	
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
		form.OnSize();

		form.free_pos("0px", "0px");
		form.OnSize(); //修改了位置，要再来一次

		$(window).resize(function () { //这个可以多次执行
			//执行代码块
			
			form.OnSize();
		});			

	}//
