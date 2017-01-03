Object.values = function(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
}

window.onload = function() {
	Loader._instance.loadImages(function() {
		var world = new World();
		world.init();
		world.start();
	});
}