function AbstractController(camera) {
	
	this.updateCameraPosition = function() {
		var scale = 1 - (camera.position.z / 2200);

		camera.position.x = Math.max(camera.position.x, -1800 * scale);
		camera.position.y = Math.max(camera.position.y, -922 * scale);

		camera.position.x = Math.min(camera.position.x, 1800 * scale);
		camera.position.y = Math.min(camera.position.y, 922 * scale);
    }

}