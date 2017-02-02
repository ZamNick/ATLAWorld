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
				elem.removeClass('location-label-info-drag-transition');
			});

			elem.on('mouseup', function() {
				grabbed = false;
				elem.css('cursor', '-webkit-grab');

				var top = parseInt(elem.css('top'));
				var dist = top - 85;
				
				var halfElemHeight = -Math.floor($(elem).height() / 2);

				if(dist > 0) {
					elem.css('top', 85);
					elem.addClass('location-label-info-drag-transition');
				}

				if(top < halfElemHeight) {
					elem.css('top', halfElemHeight);
					elem.addClass('location-label-info-drag-transition');	
				}
			});

			elem.on('mousemove', function(e) {
				if(grabbed) {

					e.movementX = e.pageX - _x;
					e.movementY = e.pageY - _y;

					_x = e.pageX;
					_y = e.pageY;

					var dist;
					var top = parseInt(elem.css('top'));
					var halfElemHeight = -Math.floor($(elem).height() / 2);
					
					if(top > 85) {
						dist = top - 85;
						currentTopPosition = top + Math.min(10 * (e.movementY / dist), e.movementY);
					} else if(top < halfElemHeight) {
						dist = -(top - halfElemHeight);
						console.log(e.movementY, 10 * (e.movementY / dist));
						currentTopPosition = top + Math.max(10 * (e.movementY / dist), e.movementY);
					} else {
						currentTopPosition = top + e.movementY;
					}

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
				label.fadeOut(250);
			}
		};
	})()
})