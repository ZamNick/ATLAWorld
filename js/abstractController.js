'use strict';

function AbstractController(camera) {
	
	this.updateCameraPosition = function() {

		var _scale = 1 - (camera.position.z / CONSTANTS.SCALE.MAX);
		
		var _pixelCoeff = CONSTANTS.MAP.SETTINGS.SIZE.Y / window.innerHeight;
		var _currentImageWidthByX = _pixelCoeff * window.innerWidth;
		var _allowByX = ((CONSTANTS.MAP.SETTINGS.SIZE.X - _currentImageWidthByX) / 2) * (1 - _scale);

		camera.position.x = Math.max(camera.position.x, -(CONSTANTS.MAP.SETTINGS.SIZE.X / 2) * _scale - _allowByX);
		camera.position.y = Math.max(camera.position.y, -(CONSTANTS.MAP.SETTINGS.SIZE.Y / 2) * _scale);

		camera.position.x = Math.min(camera.position.x, (CONSTANTS.MAP.SETTINGS.SIZE.X / 2) * _scale + _allowByX);
		camera.position.y = Math.min(camera.position.y, (CONSTANTS.MAP.SETTINGS.SIZE.Y / 2) * _scale);
    }

}