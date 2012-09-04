sandBox.ui = sandBox.ui || {};
sandBox.ui.createPictureSlider = (function(sb){

	//MVC: Model
	/**
	 * @param {SandBox} sb
	 * @constructor
	 */
	function PictureSliderModel(sb) {
		/**
		 * @type {Number}
		 */
		var _count = 0;
		/**
		 * @type {Number}
		 */
		var _position = 0;
		/**
		 * @type {Boolean}
		 */
		var _isCyclic = false;

		/**
		 * @type {Array}
		 */
		var _images = [];

		/**
		 * @param state
		 * @public
		 * @return {undefined}
		 */
		this.initializeState = function(state)
		{
			_count = state.count;
			_position = state.position;

			sb.notify('PictureSliderModel-StateChanged', state);
		};

		/**
		 * @param imageDom
		 * @public
		 * @return {undefined}
		 */
		this.addImage = function(imageDom)
		{
			_images.push(imageDom);
			_count += 1;

			sb.notify('PictureSliderModel-NewImageAdded', undefined);
		};

		/**
		 * @public
		 * @return {Number}
		 */
		this.getPosition = function()
		{
			return _position;
		};

		/**
		 * @public
		 * @return {Number}
		 */
		this.getCount = function()
		{
			return _count;
		};

		/**
		 * @return {Number}
		 */
		var getNextPosition = function() {
			if(_count === 0)
			{
				return 0;
			}

			var newPosition = 0;

			if(_isCyclic)
			{
				newPosition = (_position + 1) % _count;
			}
			else
			{
				newPosition = _position < _count - 1 ? _position + 1 : _position;
			}

			return newPosition;
		};

		/**
		 * @return {Number}
		 */
		var getPreviousPosition = function() {
			if(_count === 0)
			{
				return 0;
			}

			var newPosition = 0;

			if(_isCyclic)
			{
				newPosition = (_position - 1 + _count) % _count;
			}
			else
			{
				newPosition = _position > 0 ? _position - 1 : _position;
			}

			return newPosition;
		};

		/**
		 * @param {Number} newPosition
		 * @return {undefined}
		 */
		var notifyIfDifferent = function(newPosition) {
			if(newPosition === _position)
			{
				return undefined;
			}

			_position = newPosition;
			sb.notify('PictureSliderModel-StateChanged', {
				position: _position,
				count: _count
			});
		};

		/**
		 * @public
		 * @return {Number}
		 */
		this.next = function()
		{
			var newPosition = getNextPosition();
			notifyIfDifferent(newPosition);

			return _position;
		};

		/**
		 * @public
		 * @return {Number}
		 */
		this.previous = function()
		{
			var newPosition = getPreviousPosition();
			notifyIfDifferent(newPosition);

			return _position;
		};

		this.getImage = function()
		{
			return _images[_position];
		};

		/**
		 * @public
		 * @return {Boolean}
		 */
		this.isLast = function()
		{
			return _position === _count - 1 || _count === 0;
		};

		/**
		 * @public
		 * @return {Boolean}
		 */
		this.isFirst = function()
		{
			return _position === 0;
		};
	};

	//MVC: View
	/**
	 * @param {SandBox} sb
	 * @param {PictureSliderModel} model
	 * @param {HTMLElement} rootDom
	 */
	function PictureSliderView(sb, model, rootDom) {
		var that = this;

		var jPictureSliderView = $('#pictureSliderTmpl').tmpl().appendTo(rootDom);
		var imageDisplay = jPictureSliderView.find('.pictureSlider_imageDisplay');

		var jPrevBtn = $('.pictureSlider_arrow.pictureSlider_left', jPictureSliderView);
		var jNextBtn = $('.pictureSlider_arrow.pictureSlider_right', jPictureSliderView);

		imageDisplay.click(function()
		{
			model.next();
		});
		jNextBtn.click(function()
		{
			model.next();
		});
		jPrevBtn.click(function()
		{
			model.previous();
		});

		/**
		 * @return {undefined}
		 */
		var updateCursors = function() {
			imageDisplay.css('cursor', model.isLast() ? 'auto' : 'pointer');

			model.isFirst() ? jPrevBtn.hide() : jPrevBtn.show();
			model.isLast() ? jNextBtn.hide() : jNextBtn.show();
		};

		var updateDisplayedImg = function()
		{
			// удаляем старое изображение
			imageDisplay.children().remove();

			var newImg = model.getImage();
			if(newImg !== undefined)
			{
				$(newImg).addClass('pictureSlider_image').appendTo(imageDisplay);
			}
		};

		/**
		 * @return {undefined}
		 */
		var updateView = function() {
			updateDisplayedImg();
			updateCursors();
		};

		sb.addEventListener('PictureSliderModel-StateChanged', updateView);
		sb.addEventListener('PictureSliderModel-NewImageAdded', updateView);
	};

	/**
	 * @param {SandBox} sb
	 * @param {HTMLElement} rootDom
	 * @return {Object}
	 */
	return function(sb, rootDom) {
		var model = new PictureSliderModel(sb);
		var view = new PictureSliderView(sb, model, rootDom);

		return {
			addImage: model.addImage
		};
	};
})(sandBox);
