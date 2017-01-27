'use strict';

var Loader = {};

Object.defineProperty(Loader, '_instance', { value: 
	(function() {

		var _images = {};
		var _audio = {};

		var _audioLoader = new THREE.AudioLoader();
		var _loader = new THREE.ImageLoader();
		var _xhr = new XMLHttpRequest();

		var _updateSpinner = function(loaded, unloaded, _spinner) {

			var context = _spinner.getContext('2d');
			var centerX = _spinner.width / 2;
			var centerY = _spinner.height / 2;
			var radius = 50;
			var endArc = 2 * Math.PI * (loaded / unloaded);

			context.clearRect(0, 0, _spinner.width, _spinner.height);

			context.translate(centerX, centerY);
			context.rotate(-Math.PI / 2);
			context.translate(-centerX, -centerY);

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, endArc, false);
			context.lineWidth = 5;
			context.strokeStyle = 'lightblue';
			context.shadowColor = 'white';
			context.shadowBlur = 20;
			context.stroke();
			context.beginPath();
			context.arc(centerX, centerY, radius, endArc, 2 * Math.PI, false);
			context.lineWidth = 1;
			context.strokeStyle = 'white';
			context.stroke();

			context.translate(centerX, centerY);
			context.rotate(Math.PI / 2);
			context.translate(-centerX, -centerY);
		}

		return {

			getImage: function(name) {
				return _images[name];
			},

			getAudio: function(name) {
				return _audio[name];
			},

			loadImage: function(path) {

				var flag = (path.split('/')[0] === 'img');
				var imageName = path.split('/').pop().split('.')[0];
				
				return new Promise(function(resolve, reject) {
					if(flag) {
						_loader.load(path, function(image) {
							_images[imageName] = image;
							resolve();
						},
						function(xhr) {
							console.log('[' + Math.round(xhr.loaded / xhr.total * 100) + '%] ' + path );
						},
						function(xhr) {
							console.err('Something going wrong. Error occured while loading image: ' + path);
						});
					} else {
						var image = new Image();
						image.onload = function() {
							_images[imageName] = image;
							resolve();
						}
						image.src = path;
					}
				});
			},

			loadImages: function(images, _spinner, loaded, needLoad) {
				
				var self = this;
				_updateSpinner(loaded, needLoad, _spinner);

				var chain = self.loadImage(images[0]);
				for(var i = 1; i < images.length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_updateSpinner(++loaded, needLoad, _spinner);
							return self.loadImage(images[i]); 
						});
					})(i);
				}

				return chain.then(function() { 
					_updateSpinner(++loaded, needLoad, _spinner);
				});
			},

			loadJSON: function(path) {
				return new Promise(function(resolve, reject) {
					_xhr.open('GET', path, true);
					_xhr.send();
					_xhr.onreadystatechange = function() {
						if(_xhr.readyState == 4 && _xhr.status == 200) {
							resolve(JSON.parse(_xhr.responseText));
						}
					}
				});
			},

			loadLocation: function(location, callback) {
				var _spinner = document.getElementsByClassName('load-location-spinner')[0];
				var self = this;
				self.loadImages(location.urls, _spinner, 0, location.urls.length + location.audio.length)
					.then(function() {
						return self.loadAudio(location.audio, _spinner, location.urls.length, location.urls.length + location.audio.length);	
					}).then(function() {
						callback();
					});
			},

			init: function(images, callback) {	
				var _spinner = document.getElementsByClassName('start-spinner')[0];
				this.loadImages(images, _spinner, 0, images.length).then(function() { callback(); });
			},

			loadSound: function(path) {

				var soundName = path.split('/').pop().split('.')[0];

				return new Promise(function(resolve, reject) {
					_audioLoader.load(path, function(sound) {
						_audio[soundName] = sound;
						resolve();
					});
				});
			},

			loadAudio: function(audio, _spinner, loaded, needLoad) {

				var self = this;
				_updateSpinner(loaded, needLoad, _spinner);

				var chain = self.loadSound(audio[0]);
				for(var i = 1; i < audio.length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_updateSpinner(++loaded, needLoad, _spinner);
							return self.loadSound(audio[i]);
						});
					})(i);
				}

				return chain.then(function() {
					_updateSpinner(++loaded, needLoad, _spinner);
				});
			}
		};
	})()
});