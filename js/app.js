'use strict';

window.onload = function() {
	Loader._instance.init(CONSTANTS.IMAGES, function() {
		$('.start').fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
		setTimeout(function() {
			var world = new World();
			world.init();
			world.start();
		}, CONSTANTS.COMMON.FADE_OUT_DURATION);
	});
}