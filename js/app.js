window.onload = function() {
	Loader._instance.init(CONSTANTS.IMAGES, function() {
		$('.start').fadeOut(2000);
		setTimeout(function() {
			var world = new World();
			world.init();
			world.start();
		}, 2000);
	});
}