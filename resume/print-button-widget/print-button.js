sandBox.PrintWidget = function (sb, rootDom) {
	var jPrint = $('#PrintButtonTmpl').tmpl().appendTo(rootDom);

	jPrint.click(function(){
		// Надо проверять именно на неравенство undefined, а не на typeof window.print === 'function',
		// т.к. в IE typeof window.print === 'object', но window.print() работает нормально
		if(window.print !== undefined)
		{
			window.print();
		}
	});
}



