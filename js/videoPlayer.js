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

					var playingTime = videotag.duration * 1000;

					$(CONSTANTS.LOCATION.MORE)[0].innerHTML = '';
					$(CONSTANTS.LOCATION.MORE).show().append(videotag);

					videotag.play();

					setTimeout(function() {
						
						$(CONSTANTS.LOCATION.MORE).fadeOut(2000);
						
						setTimeout(function() {
							$(CONSTANTS.LOCATION.CLASS).fadeIn(2000);
						}, 2000);

					}, playingTime);
				});
			}
		};
	})()
})