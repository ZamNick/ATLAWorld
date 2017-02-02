'use strict';

function AbstractController(camera) {
	
	this.updateCameraPosition = function() {
		var scale = 1 - (camera.position.z / CONSTANTS.SCALE.MAX);

		camera.position.x = Math.max(camera.position.x, -(CONSTANTS.MAP.SETTINGS.SIZE.X / 2) * scale);
		camera.position.y = Math.max(camera.position.y, -(CONSTANTS.MAP.SETTINGS.SIZE.Y / 2) * scale);

		camera.position.x = Math.min(camera.position.x, (CONSTANTS.MAP.SETTINGS.SIZE.X / 2) * scale);
		camera.position.y = Math.min(camera.position.y, (CONSTANTS.MAP.SETTINGS.SIZE.Y / 2) * scale);
    }

}