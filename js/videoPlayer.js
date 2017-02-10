'use strict';

var VideoPlayer = {};

Object.defineProperty(VideoPlayer, '_instance', { value: 
	(function() {

		var _videotag = document.createElement('video');

		return {
			play: function(path) {

				var self = this;

				_videotag.src = path;
				_videotag.controls = true;

				_videotag.addEventListener('durationchange', function() {

					$(CONSTANTS.LOCATION.MORE)[0].innerHTML = '';

					$(CONSTANTS.LOCATION.MORE)
								.show()
								.append("<img src='./img/close.png' style='position:absolute;color:white;right:12px;z-index:1;cursor:pointer'>")
								.append(_videotag);

					$(CONSTANTS.LOCATION.MORE)
								.find('img')
								.on('click', function() { self.stop(); });

					_videotag.play();
				});

				_videotag.addEventListener('ended', function() { self.stop(); });
			},

			stop: function() {

				_videotag.pause();

				$(CONSTANTS.LOCATION.MORE).fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);

				setTimeout(function() {

					_videotag.currentTime = 0;

					$(CONSTANTS.LOCATION.CLASS).fadeIn(CONSTANTS.COMMON.FADE_IN_DURATION);

				}, CONSTANTS.COMMON.FADE_OUT_DURATION);
			}
		};
	})()
})