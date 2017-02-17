'use strict';

var AudioPlayer = {};

Object.defineProperty(AudioPlayer, '_instance', { value:
	(function() {

		var _audioListener = new THREE.AudioListener();
		var _sounds = [];
		var _paused = [];

		return {

			playSound: function(settings) {

				var _audio = Loader._instance.getAudio(settings.path.split('/').pop().split('.')[0]);
				var _sound = new THREE.Audio(_audioListener);

				_sound.setBuffer(_audio);

				if(settings && settings.loop) {
					_sound.setLoop(true);
				}

				_sound.settings = settings;

				_sounds.push(_sound);

				this.fadeInSound(_sounds.length - 1, true);
			},

			fadeInSound: function(index, flag) {

				var volume = 0;

				_sounds[index].setVolume(volume);
				
				if(flag) _sounds[index].play();

				var intervalId = setInterval(function() {

					volume = Math.min(volume + 0.005, _sounds[index].settings.volume);

					_sounds[index].setVolume(volume);

					if(volume === _sounds[index].settings.volume) {
						clearInterval(intervalId);
					}

				}, 50);
			},

			fadeOutSound: function(index, flag) {
				
				var volume = _sounds[index].getVolume();

				var intervalId = setInterval(function() {

					volume = Math.max(volume - 0.005, 0);
					
					_sounds[index].setVolume(volume);

					if(!volume) {

						if(flag) _sounds[index].stop();
						
						clearInterval(intervalId);
					}

				}, 50);
			},

			pauseSounds: function() {
				for(var i = 0; i < _sounds.length; ++i) {
					if(_sounds[i].isPlaying) {
						this.fadeOutSound(i, false);
						_paused.push(i);
					}
				}
			},

			stopAllSounds: function() {
				for(var i = 0; i < _sounds.length; ++i) {
					this.fadeOutSound(i, true);
				}
			},

			restorePlaying: function() {
				for(var i = 0; i < _paused.length; ++i) {
					this.fadeInSound(_paused[i], false);
				}
				_paused = [];
			}
		};
	})()
});