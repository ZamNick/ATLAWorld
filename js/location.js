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
		var _y = 0;
		var location = $('.location');

		var updateLocationText = function() {
			
			var _w = $('.location > div img').width();
			var _h = $('.location > div img').height();

			var _ww = $('.location > h1').width();
			var _hh = $('.location > h1').height();

			$('.location > h1').css('top', (_h / 2) - _hh + 'px');
			$('.location > h1').css('left', (_w - _ww) / 2 + 'px');

			for(var i = 0; i < images.length; ++i) {
				if(settings[i] && settings[i].video) {
					$('.location-video').css('left', $('.location > div img').width() * (i + 1) - settings[i].video.leftOffset);
				}
				if(settings[i] && settings[i].label) {
					$('.location-label').css('left', $('.location > div img').width() * i + settings[i].label.leftOffset)
				}
			}
		};

		(function() {
				
			location.on('mousedown', function(e) {
				grabbed = true;
				_x = e.pageX;
				_y = e.pageY;
				location.css('cursor', '-webkit-grabbing');
				
				Label._instance.hide();
			});

			location.on('mouseup', function() {
				grabbed = false;
				location.css('cursor', '-webkit-grab');
			});

			location.on('mousemove', function(e) {
				if(grabbed) {
					
					e.movementX = e.pageX - _x;
					e.movementY = e.pageY - _y;
					
					_x = e.pageX;
					_y = e.pageY;

					var slideWidth = $('.location > div img').width();
					var POINT = slideWidth * 0.4;
					var leftPositionBorder = -($('.location').width() - $(window).width());

					currentLeftPosition = parseInt(location.css('left')) + e.movementX;
					currentLeftPosition = Math.max(currentLeftPosition, leftPositionBorder);

					if(currentLeftPosition > leftPositionBorder) {
						currentTranslate -= e.movementX * 0.3;
					}

					$($('.location > div img').get(currentImage)).removeClass('active');
					
					if(Math.abs(currentLeftPosition) > currentImage * slideWidth + POINT) {
						++currentImage;

						if(settings[currentImage] && settings[currentImage].audio) {
							AudioPlayer._instance.playSound(settings[currentImage].audio);
						}
					}

					if(Math.abs(currentLeftPosition) < (currentImage - 1) * slideWidth + POINT) {
						--currentImage;
					}

					$($('.location > div img').get(currentImage)).addClass('active');

					currentLeftPosition = Math.min(currentLeftPosition, 0);
					location.css('left', currentLeftPosition);

					if(currentLeftPosition < 0) {
						$('.location-map-icon').fadeOut(500);
						$('.location-identificator').fadeOut(500);
					} else {
						$('.location-map-icon').fadeIn(500);
						$('.location-identificator').fadeIn(500);
					}

					if(currentLeftPosition <= leftPositionBorder) {
						$('.location-explore-more').fadeIn(500);
					} else {
						$('.location-explore-more').fadeOut(500);
					}

					currentTranslate = Math.max(currentTranslate, 0);
					$('.location > div img').first().css('transform', 'translate(' + currentTranslate + 'px, 0)');

					for(var i = 1; i < images.length; ++i) {
						if(settings[i] && settings[i].parallax) {
							$($('.location > div img').get(i)).css('transform', 'translate(' + Math.min(-(POINT * settings[i].offset) + currentTranslate, 0) * settings[i].direction + 'px, 0)');
						}
					}
				}
			});
		})();

		$(window).resize(function() { updateLocationText(); });

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

				currentTranslate = 0;
				currentLeftPosition = 0;
				currentImage = 0;
				grabbed = false;
				_x = 0;
				_y = 0;

				updateLocationText();

				$($('.location > div img').get(0)).addClass('active');

				var currentOffset = 0;

				for(var i = 0; i < data.urls.length; ++i) {
					if(settings[i]) {
						if(settings[i].parallax) {
							$($('.location > div img').get(i)).css('transform', 'translate(-' + $('.location > div img').width() * currentOffset + 'px, 0)');
							currentOffset += 0.15
						}
						if(settings[i].video) {
							(function(i) {
								$('.location-video')
									.show()
									.css('left', $('.location > div img').width() * (i + 1) - settings[i].video.leftOffset)
									.css('top', settings[i].video.top)
									.on('click', function() {
										$('.location').fadeOut(2000);
										setTimeout(function() {
											$('.location-more').show().append('<iframe style="position:absolute;height:100%;width:100%;" src="' + settings[i].video.path + '" frameborder="0" allowfullscreen autoplay></iframe>');
										}, 2000);
									});
							})(i);
						}
						if(settings[i].label) {
							$('.location-label')
								.show()
								.css('left', $('.location > div img').width() * i + settings[i].label.leftOffset)
								.css('top', settings[i].label.top)
								.on('mousedown', function(e) {
									Label._instance.updateLabel({
										title: "Avatar Kyoshi",
										text: "Kyoshi was the Earth Kingdom-born Avatar immediately succeeding Avatar Kuruk of the Northern Water Tribe, and preceding Avatar Roku of the Fire Nation. She died at the age of 230, making her the oldest known human. Kyoshi was a tall woman, towering over most people, and also possessed the largest feet of any Avatar. Her traditional weapons were golden metal fans which, in addition to her manner of dress and style of fighting, were adopted by the Kyoshi Warriors of Kyoshi Island, her homeland."
									});
									e.stopPropagation();
								});
							$('.location-label-text').html(settings[i].label.text);
						}
					}
				}
			}
		};
	})()
});