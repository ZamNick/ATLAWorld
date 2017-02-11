'use strict';

var Location = {};

Object.defineProperty(Location, '_instance', { value: 
	(function() {

		var images = [];
		var settings = [];

		var currentTranslate = 0;
		var currentLeftPosition = 0;
		var currentImage = 0;

		var grabbed = false;
		
		var _x = 0;
		
		var location = $(CONSTANTS.LOCATION.CLASS);

		var locationImages = null;
		var locationTitle = null;
		var locationVideo = null;
		var locationLabel = null;
		var locationMapIcon = null;
		var locationIdentificator = null;
		var locationExploreMore = null;

		var updateLocationElements = function() {

			if(!locationImages) return;
			
			var _w = locationImages.width();
			var _h = locationImages.height();

			var _ww = locationTitle.width();
			var _hh = locationTitle.height();

			locationTitle.css('top', (_h / 2) - _hh);
			locationTitle.css('left', (_w - _ww) / 2);

			for(var i = 0; i < images.length && settings[i]; ++i) {
				if(settings[i].video) {
					locationVideo.css('left', _w * (i + 1) - settings[i].video.leftOffset);
				}
				if(settings[i].label) {
					locationLabel.css('left', _w * i + settings[i].label.leftOffset)
				}
			}
		};

		(function() {
				
			location.on('mousedown', function(e) {
				
				grabbed = true;
				
				_x = e.pageX;
				
				location.css('cursor', '-webkit-grabbing');
				
				Label._instance.hide();
			});

			location.on('mouseup', function() {
				
				grabbed = false;
				
				location.css('cursor', '-webkit-grab');
			});

			location.on('mouseleave', function() {

				grabbed = false;

				location.css('cursor', '-webkit-grab');
			});

			location.on('mousemove', function(e) {
				if(grabbed) {
					
					var deltaX = e.pageX - _x;
					var slideWidth = locationImages.width();
					var POINT = slideWidth * 0.4;
					var leftPositionBorder = -($(CONSTANTS.LOCATION.CLASS).width() - $(window).width());

					_x = e.pageX;

					currentLeftPosition = parseInt(location.css('left')) + deltaX;
					currentLeftPosition = Math.max(currentLeftPosition, leftPositionBorder);

					if(currentLeftPosition >= leftPositionBorder) {
						currentTranslate = -currentLeftPosition * 0.3;
					}

					$(locationImages.get(currentImage)).removeClass('active');
					
					if(Math.abs(currentLeftPosition) > currentImage * slideWidth + POINT) {
						++currentImage;

						if(settings[currentImage] && settings[currentImage].audio) {
							AudioPlayer._instance.playSound(settings[currentImage].audio);
						}
					}

					if(Math.abs(currentLeftPosition) < (currentImage - 1) * slideWidth + POINT) {
						--currentImage;
					}

					$(locationImages.get(currentImage)).addClass('active');

					currentLeftPosition = Math.min(currentLeftPosition, 0);
					location.css('left', currentLeftPosition);

					if(currentLeftPosition < 0) {
						locationMapIcon.fadeOut(CONSTANTS.LOCATION.FADE_OUT_DURATION);
						locationIdentificator.fadeOut(CONSTANTS.LOCATION.FADE_OUT_DURATION);
					} else {
						locationMapIcon.fadeIn(CONSTANTS.LOCATION.FADE_IN_DURATION);
						locationIdentificator.fadeIn(CONSTANTS.LOCATION.FADE_IN_DURATION);
					}

					if(currentLeftPosition <= leftPositionBorder) {
						locationExploreMore.fadeIn(CONSTANTS.LOCATION.FADE_IN_DURATION);
					} else {
						locationExploreMore.fadeOut(CONSTANTS.LOCATION.FADE_OUT_DURATION);
					}

					currentTranslate = Math.max(currentTranslate, 0);

					locationImages.first().css('transform', 'translate(' + currentTranslate + 'px, 0)');

					for(var i = 1; i < images.length; ++i) {
						if(settings[i] && settings[i].parallax) {
							$(locationImages.get(i)).css('transform', 'translate(' + Math.min(-(POINT * settings[i].offset) + currentTranslate, 0) * settings[i].direction + 'px, 0)');
						}
					}
				}
			});
		})();

		$(window).resize(function() { updateLocationElements(); });

		return {
			updateLocation: function(data) {

				images = [];
				settings = data.settings;

				for(var i = 0; i < data.urls.length; ++i) {
					var imgName = data.urls[i].split('/').pop().split('.')[0];
					images.push($(Loader._instance.getImage(imgName))[0].outerHTML);
				}

				var template = $('#handlebars-location').html();
				var templateScript = Handlebars.compile(template);

				var html = templateScript({
					name: data.name,
					nationality: data.nationality,
					images: images,
					exploreMore: data.exploreMore
				});

				location[0].innerHTML = '';
				location.append(html);
				location.show();

				currentTranslate = 0;
				currentLeftPosition = 0;
				currentImage = 0;
				
				grabbed = false;

				_x = 0;

				locationTitle = $(CONSTANTS.LOCATION.TITLE);
				locationVideo = $(CONSTANTS.LOCATION.VIDEO);
				locationImages = $(CONSTANTS.LOCATION.IMAGES);
				locationMapIcon = $(CONSTANTS.LOCATION.MAP_ICON);
				locationLabel = $(CONSTANTS.LOCATION.LABEL.CLASS);
				locationExploreMore = $(CONSTANTS.LOCATION.EXPLORE_MORE);
				locationIdentificator = $(CONSTANTS.LOCATION.IDENTIFICATOR);

				location.on('dragstart', function() { return false; });
				location.attr('draggable', false);

				locationMapIcon.on('click', function() {
					location.fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
					setTimeout(function() {
						$('body > canvas').fadeIn(CONSTANTS.COMMON.FADE_IN_DURATION);
					}, CONSTANTS.COMMON.FADE_OUT_DURATION);
				});

				updateLocationElements();

				locationImages.first().addClass('active');

				var currentOffset = 0;

				for(var i = 0; i < data.urls.length && settings[i]; ++i) {
					if(settings[i].parallax) {
						$(locationImages.get(i)).css('transform', 'translate(-' + locationImages.width() * currentOffset + 'px, 0)');
						currentOffset += 0.15;
					}
					if(settings[i].video) {
						(function(i) {
							locationVideo
								.show()
								.css('left', locationImages.width() * (i + 1) - settings[i].video.leftOffset)
								.css('top', settings[i].video.top)
								.on('click', function() {
									$(CONSTANTS.LOCATION.CLASS).fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
									setTimeout(function() {
										VideoPlayer._instance.play(settings[i].video.path);
									}, CONSTANTS.COMMON.FADE_OUT_DURATION);
								});
						})(i);
					}
					if(settings[i].label) {
						(function(i) {
							locationLabel
								.show()
								.css('left', locationImages.width() * i + settings[i].label.leftOffset)
								.css('top', settings[i].label.top)
								.on('mousedown', function(e) {
									Label._instance.updateLabel(settings[i].label.description);
									e.stopPropagation();
								});
							$(CONSTANTS.LOCATION.LABEL.TEXT).html(settings[i].label.text);	
						})(i);
					}
				}
			}
		};
	})()
});