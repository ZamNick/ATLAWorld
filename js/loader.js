'use strict';

var Loader = {};

Object.defineProperty(Loader, '_instance', { value: 
	(function() {

		var _images = {};
		var _audio = {};
		var _video = {};
		var _files = {};

		var _audioLoader = new THREE.AudioLoader();
		var _loader = new THREE.ImageLoader();
		var _xhr = new XMLHttpRequest();

		var _updateSpinner = function(loaded, unloaded, _spinner) {

			var context = _spinner.getContext(CONSTANTS.LOADER.SPINNER.CONTEXT);
			var centerX = _spinner.width / 2;
			var centerY = _spinner.height / 2;
			var radius = CONSTANTS.LOADER.SPINNER.RADIUS;
			var endArc = 2 * Math.PI * (loaded / unloaded);

			context.clearRect(0, 0, _spinner.width, _spinner.height);

			context.translate(centerX, centerY);
			context.rotate(-Math.PI / 2);
			context.translate(-centerX, -centerY);

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, endArc, false);
			context.lineWidth = CONSTANTS.LOADER.SPINNER.LOADED.LINE_WIDTH;
			context.strokeStyle = CONSTANTS.LOADER.SPINNER.LOADED.STROKE_STYLE;
			context.shadowColor = CONSTANTS.LOADER.SPINNER.LOADED.SHADOW_COLOR;
			context.shadowBlur = CONSTANTS.LOADER.SPINNER.LOADED.SHADOW_BLUR;
			context.stroke();
			context.beginPath();
			context.arc(centerX, centerY, radius, endArc, 2 * Math.PI, false);
			context.lineWidth = CONSTANTS.LOADER.SPINNER.UNLOADED.LINE_WIDTH;
			context.strokeStyle = CONSTANTS.LOADER.SPINNER.UNLOADED.STROKE_STYLE;
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

			getVideo: function(name) {
				return _video[name];
			},

			getTextFile: function(name) {
				return _files[name];
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
					_xhr.responseType = 'text';
					_xhr.send();
					_xhr.onreadystatechange = function() {
						if(_xhr.readyState == 4 && _xhr.status == 200) {
							resolve(JSON.parse(_xhr.responseText));
						}
					}
				});
			},

			loadLocation: function(location, callback) {

				var self = this;

				var _spinner = $(CONSTANTS.LOADER.SPINNER.LOCATION)[0];

				var _loaded = 0;
				var _needLoad = location.urls.length + location.audio.length;
				
				var chain = self.loadImage(location.urls[0]);
				_updateSpinner(_loaded, _needLoad, _spinner);
				
				for(var i = 1; i < location.urls.length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_loaded++;
							_updateSpinner(_loaded, _needLoad, _spinner);
							var extension = location.urls[i].split('/').pop().split('.').pop();
							if(extension === 'jpg') {
								return self.loadImage(location.urls[i]);
							} else {
								return self.loadVideo(location.urls[i]);
							}
						});
					})(i); 
				}

				for(var i = 0; i < location.audio.length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_loaded++;
							_updateSpinner(_loaded, _needLoad, _spinner);
							return self.loadSound(location.audio[i]);
						});
					})(i);
				}

				return chain.then(function() {
					_updateSpinner(++_loaded, _needLoad, _spinner);
					callback();
				});
			},

			init: function(images, callback) {	
				var _spinner = $(CONSTANTS.LOADER.SPINNER.START)[0];
				this.loadImages(images, _spinner, 0, images.length).then(function() { callback(); });
			},

			loadSound: function(path) {

				var soundName = path.split('/').pop().split('.')[0];

				return new Promise(function(resolve, reject) {
					_audioLoader.load(path, function(sound) {
						_audio[soundName] = sound;
						resolve();
					},
					function(xhr) {
						console.log('[' + Math.round(xhr.loaded / xhr.total * 100) + '%] ' + path );
					},
					function(xhr) {
						console.err('Something going wrong. Error occured while loading sound: ' + path);
					});
				});
			},

			loadVideo: function(path) {

				var videoName = path.split('/').pop().split('.')[0];

				return new Promise(function(resolve, reject) {
					_xhr.open('GET', path, true);
					_xhr.responseType = 'blob';
					_xhr.send();
					_xhr.onreadystatechange = function() {
						if(_xhr.readyState == 4 && _xhr.status == 200) {

							var div = document.createElement('div');
							div.className = 'location-video-slide';

							var video = document.createElement('video');
							video.src = URL.createObjectURL(_xhr.response);

							div.append(video);

							_video[videoName] = div;

							resolve();
						}
					}
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
			},

			loadTextFile: function(path) {
				
				var filename = path.split('/').pop().split('.')[0];

				return new Promise(function(resolve, reject) {

					_xhr.open('GET', path, true);
					_xhr.responseType = 'text';
					_xhr.send();

					_xhr.onreadystatechange = function() {
						if(_xhr.readyState == 4 && _xhr.status == 200) {

							_files[filename] = _xhr.response;

							resolve();

						}
					}
				});
			},

			loadModule: function(name, callback) {
				
				var self = this;
				var _spinner = $('.load-module-spinner')[0];

				name = name.toUpperCase();
				
				var _loaded = 0;
				var _needLoad = CONSTANTS.MODULES[name].length;
				
				var chain = this.loadTextFile(CONSTANTS.MODULES[name][0]);
				_updateSpinner(_loaded, _needLoad, _spinner);
				
				for(var i = 1; i < CONSTANTS.MODULES[name].length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_updateSpinner(++_loaded, _needLoad, _spinner);
							var extension = CONSTANTS.MODULES[name][i].split('/').pop().split('.').pop();
							if(extension === 'js') {
								return self.loadTextFile(CONSTANTS.MODULES[name][i]);
							} else {
								return self.loadImage(CONSTANTS.MODULES[name][i]);
							}
						});
					})(i);
				}

				return chain.then(function() {
					_updateSpinner(++_loaded, _needLoad, _spinner);
					callback();
				});
			}
		};
	})()
});