$(document).ready(function() {
	// Объявляем зависимости
	var createPictureSlider = sandBox.ui.createPictureSlider;
	var PrintWidget = sandBox.PrintWidget;

	var topJumperContainer = $('.topJumperContainer')[0];
	var topJumper = new TopJumper(sandBox, topJumperContainer);

	var navigationContainer = $('.navigation')[0];
	var navigator = new Navigator(sandBox, navigationContainer);

	var pictureSliderContainer = $('.pictureSliderContainer')[0];
	var pictureSliderProxy = createPictureSlider(sandBox, pictureSliderContainer);

	var images = $('.rawImages img').get();
	$('.rawImages').empty();

	for(var i = 0, len = images.length; i < len; i += 1)
	{
		pictureSliderProxy.addImage(images[i]);
	}

	var printWidgetContainer = $('.printButtonContainer')[0];
	var printWidget = new PrintWidget(sandBox, printWidgetContainer);
});
