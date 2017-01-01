'use strict';

var Loader = {};

Object.defineProperty(Loader, '_instance', { value: 
	(function() {

		var _images = {};
		var _loader = new THREE.ImageLoader();
		var _xhr = new XMLHttpRequest();

		return {

			getImage: function(name) {
				return _images[name];
			},

			loadImages: function(callback) {

				var loadImage = function(path) {
					return new Promise(function(resolve, reject) {
						_loader.load(path, function(image) {
							console.log(path + ' was loaded.');
							_images[path.substr(4, path.length - 8)] = image;
							resolve();
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