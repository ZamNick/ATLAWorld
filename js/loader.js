'use strict';

var Loader = {};

Object.defineProperty(Loader, '_instance', { value: 
	(function() {

		var _images = {};
		var _loader = new THREE.ImageLoader();
		var _xhr = new XMLHttpRequest();
		var _spinner = document.getElementById('spinner');
		var _uploadedImages = 0;

		var _updateSpinner = function(loaded, unloaded) {

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

		_updateSpinner(_uploadedImages, Object.keys(CONSTANTS.IMAGES).length);

		return {

			getImage: function(name) {
				return _images[name];
			},

			loadImages: function(callback) {

				var loadImage = function(path) {
					return new Promise(function(resolve, reject) {
						_loader.load(path, function(image) {
							console.log(path + ' was loaded.');
							_uploadedImages++;
							_updateSpinner(_uploadedImages, Object.keys(CONSTANTS.IMAGES).length);
							_images[path.substr(4, path.length - 8)] = image;
							resolve();
						},
						function(xhr) {
							console.log('[' + Math.round(xhr.loaded / xhr.total * 100) + '%] ' + path );
						},
						function(xhr) {
							console.err('Something going wrong. Error occured into load image: ' + path);
						});
					});
				}

				loadImage(CONSTANTS.IMAGES.MAP)
				.then(function() { return loadImage(CONSTANTS.IMAGES.CLOUD); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.CLOUD_2); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.CLOUD_3); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.CLOUD_4); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.MARKER_WATER); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.MARKER_AIR); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.MARKER_EARTH); })
				.then(function() { return loadImage(CONSTANTS.IMAGES.MARKER_FIRE); })
				.then(function() { callback(); });
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
			}
		};
	})()
});