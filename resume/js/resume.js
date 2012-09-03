$(document).ready(function() {
	var topJumperContainer = $('.topJumperContainer')[0];
	var topJumper = new TopJumper(sandBox, topJumperContainer);

	var navigationContainer = $('.navigation')[0];
	sandBox.log(navigationContainer);
	var navigator = new Navigator(sandBox, navigationContainer);
});
