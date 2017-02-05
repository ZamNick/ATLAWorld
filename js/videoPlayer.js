'use strict';

var VideoPlayer = {};

Object.defineProperty(VideoPlayer, '_instance', { value: 
	(function() {
		return {
			play: function(path) {

				var videotag = document.createElement('video');

				videotag.src = path;
				videotag.controls = true;

				videotag.addEventListener('durationchange', function() {

					var playingTime = videotag.duration * CONSTANTS.COMMON.MILLISECONDS;

					$(CONSTANTS.LOCATION.MORE)[0].innerHTML = '';
					$(CONSTANTS.LOCATION.MORE).show().append(videotag);

					videotag.play();

					setTimeout(function() {
						
						$(CONSTANTS.LOCATION.MORE).fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
						
						setTimeout(function() {
							$(CONSTANTS.LOCATION.CLASS).fadeIn(CONSTANTS.COMMON.FADE_IN_DURATION);
						}, CONSTANTS.COMMON.FADE_OUT_DURATION);

					}, playingTime);
				});
			}
		};
	})()
})