'use strict';

var Label = {};

Object.defineProperty(Label, '_instance', { value: 
	(function() {

		var _x = 0;
		var _y = 0;
		var grabbed = false;
		var labelDragArea = null;
		var currentTopPosition = 0;
		var label = $(CONSTANTS.LABEL_INFO.CLASS);

		var attachEvents = function(elem) {

			elem.on('mousedown', function(e) {
				
				grabbed = true;
				
				_x = e.pageX;
				_y = e.pageY;
				
				elem.css('cursor', '-webkit-grabbing');
				elem.removeClass(CONSTANTS.LABEL_INFO.DRAG_AREA.TRANSITION_CLASS);
			});

			elem.on('mouseup', function() {
				
				var top = parseInt(elem.css('top'));
				var dist = top - CONSTANTS.LABEL_INFO.DRAG_AREA.MAX_TOP;
				var halfElemHeight = -Math.floor($(elem).height() / 2);

				grabbed = false;
				
				elem.css('cursor', '-webkit-grab');

				if(dist > 0) {
					elem.css('top', CONSTANTS.LABEL_INFO.DRAG_AREA.MAX_TOP);
					elem.addClass(CONSTANTS.LABEL_INFO.DRAG_AREA.TRANSITION_CLASS);
				}

				if(top < halfElemHeight) {
					elem.css('top', halfElemHeight);
					elem.addClass(CONSTANTS.LABEL_INFO.DRAG_AREA.TRANSITION_CLASS);
				}
			});

			elem.on('mousemove', function(e) {
				if(grabbed) {

					var dist = 0;
					var top = parseInt(elem.css('top'));
					var halfElemHeight = -Math.floor($(elem).height() / 2);
					var deltaY = e.pageY - _y;

					_x = e.pageX;
					_y = e.pageY;
					
					if(top > CONSTANTS.LABEL_INFO.DRAG_AREA.MAX_TOP) {
						dist = top - CONSTANTS.LABEL_INFO.DRAG_AREA.MAX_TOP;
						currentTopPosition = top + Math.min(CONSTANTS.LABEL_INFO.DRAG_AREA.COMPRESS_COEFFICIENT * (deltaY / dist), deltaY);
					} else if(top < halfElemHeight) {
						dist = -(top - halfElemHeight);
						currentTopPosition = top + Math.max(CONSTANTS.LABEL_INFO.DRAG_AREA.COMPRESS_COEFFICIENT * (deltaY / dist), deltaY);
					} else {
						currentTopPosition = top + deltaY;
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
				var html = templateScript(data);

				label[0].innerHTML = '';
				label.append(html);

				labelDragArea = $(CONSTANTS.LABEL_INFO.DRAG_AREA.CLASS);
				currentTopPosition = 0;
				grabbed = false;
				_x = 0;
				_y = 0;

				this.show();

				attachEvents(labelDragArea);
			},

			show: function() {

				label.slideDown(CONSTANTS.LABEL_INFO.SLIDE_DOWN_DURATION);

				setTimeout(function() {
					labelDragArea.fadeIn(CONSTANTS.LABEL_INFO.DRAG_AREA.FADE_IN_DURATION);
				}, CONSTANTS.LABEL_INFO.DRAG_AREA.FADE_IN_DELAY);
			},

			hide: function() {				
				label.fadeOut(CONSTANTS.LABEL_INFO.FADE_OUT_DURATION);
			}
		};
	})()
})