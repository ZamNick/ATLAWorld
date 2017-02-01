'use strict';

var Label = {};

Object.defineProperty(Label, '_instance', { value: 
	(function() {

		var grabbed = false;
		var _x = 0;
		var _y = 0;
		var currentTopPosition = 0;
		var label = $('.location-label-info');

		var attachEvents = function(elem) {

			elem.on('mousedown', function(e) {
				grabbed = true;
				_x = e.pageX;
				_y = e.pageY;
				elem.css('cursor', '-webkit-grabbing');
			});

			elem.on('mouseup', function() {
				grabbed = false;
				elem.css('cursor', '-webkit-grab');
			});

			elem.on('mousemove', function(e) {
				if(grabbed) {

					e.movementX = e.pageX - _x;
					e.movementY = e.pageY - _y;

					_x = e.pageX;
					_y = e.pageY;

					currentTopPosition = parseInt(elem.css('top')) + e.movementY;

					elem.css('top', currentTopPosition);
				}
			});
		}

		return {
			updateLabel: function(data) {

				if(label.is(':visible')) return;

				var template = $('#handlebars-location-label-info').html();
				var templateScript = Handlebars.compile(template);

				var html = templateScript({
					title: data.title,
					text: data.text
				});

				label[0].innerHTML = '';
				label.append(html);

				currentTopPosition = 0;
				grabbed = false;
				_x = 0;
				_y = 0;

				this.show();

				var labelDragArea = $('.location-label-info-drag');

				attachEvents(labelDragArea);
			},

			show: function() {

				label.slideDown(500);

				var labelDragArea = $('.location-label-info-drag');

				setTimeout(function() {
					labelDragArea.fadeIn(500);
				}, 300);
			},

			hide: function() {
				// var labelDragArea = $('.location-label-info-drag');
				// labelDragArea.fadeOut(200);
				// label.slideUp(500);
				label.fadeOut(150);
			}
		};
	})()
})