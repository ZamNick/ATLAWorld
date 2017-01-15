'use strict';

var Loader = {};

Object.defineProperty(Loader, '_instance', { value: 
	(function() {

		var _images = {};
		var _loader = new THREE.ImageLoader();
		var _xhr = new XMLHttpRequest();
		var _spinner = document.getElementById('spinner');

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

		return {

			getImage: function(name) {
				return _images[name];
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

			loadImages: function(images, callback) {
				
				var self = this;
				var _uploadedImages = 0;
				_updateSpinner(_uploadedImages, images.length);

				var chain = self.loadImage(images[0]);
				for(var i = 1; i < images.length; ++i) {
					(function(i) {
						chain = chain.then(function() {
							_updateSpinner(++_uploadedImages, images.length);
							return self.loadImage(images[i]); 
						});
					})(i);
				}

				chain.then(function() { 
					_updateSpinner(++_uploadedImages, images.length);
					callback();
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

			loadLocation: function(location) {

			}
		};
	})()
});