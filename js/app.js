window.onload = function() {
	Loader._instance.loadImages(function() {
		var world = new World();
		world.init();
		world.start();
	});
}