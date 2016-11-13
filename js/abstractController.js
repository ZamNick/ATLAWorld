function AbstractController(camera) {
	this.updateCameraPosition = function() {
		var scale = 1 - (camera.position.z / 800);

		camera.position.x = Math.max(camera.position.x, (-window.innerWidth / 2) * scale);
		camera.position.y = Math.max(camera.position.y, (-window.innerHeight / 2) * scale);

		camera.position.x = Math.min(camera.position.x, (window.innerWidth / 2) * scale);
		camera.position.y = Math.min(camera.position.y, (window.innerHeight / 2) * scale);
    }
}