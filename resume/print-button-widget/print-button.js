sandBox.PrintWidget = function (sb, rootDom) {
	var jPrint = $('#PrintButtonTmpl').tmpl().appendTo(rootDom);

	jPrint.click(function(){
		if(typeof window.print === 'function')
		{
			window.print();
		}
	});
}



