/**
 * Создает и размещает виджет быстрой прокрутки страницы вверх
 * @param {SandBox} sb
 * @param {HTMLElement} rootDom
 * @constructor
 */
function TopJumper (sb, rootDom) {
	var that = this;
	var jWindow = $(window);
	var jTopJumper = $('#TopJumperTmpl').tmpl().appendTo(rootDom);

	/**
	 * @private
	 */
	this._getScrollTop = function() {
		return jWindow.scrollTop();
	};

	/**
	 * @public
	 */
	this.show = function () {
		jTopJumper.show();
	};

	/**
	 * @public
	 */
	this.hide = function() {
		jTopJumper.hide();
	};

	/**
	 * @public
	 */
	this.updateView = function() {
		var scrollTop = this._getScrollTop();
		scrollTop >= 200 ? this.show() : this.hide();
	};

	$(document).scroll(function(eventObject) {
		that.updateView();
	});

	jTopJumper.click(function() {
		$("html, body").animate({scrollTop: 0}, 500);
	});

	this.updateView();
}
