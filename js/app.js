'use strict';

window.onload = function() {
	Loader._instance.init(CONSTANTS.IMAGES, function() {
		$('.start').fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
		setTimeout(function() {
			var world = new World();
			world.init();
			world.start();
		}, CONSTANTS.COMMON.FADE_OUT_DURATION);
		$('.menu__button-go-to-space').click(function() {

			var mainCanvas = $("body > canvas")[0];

			$(mainCanvas).fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);
			$('.menu').fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);

			setTimeout(function() {

				var template = $('#handlebars-load-module').html();
				var templateScript = Handlebars.compile(template);

				var html = templateScript({
					name: 'Space'
				});

				var loadModuleSection = $('.load-module');
				
				loadModuleSection[0].innerHTML = '';
				loadModuleSection.append(html);

				loadModuleSection.show();

				Loader._instance.loadModule('space', function() {

					loadModuleSection.fadeOut(CONSTANTS.COMMON.FADE_OUT_DURATION);

					setTimeout(function() {
						
						for(var i = 0; i < CONSTANTS.MODULES['SPACE'].length; ++i) {

							var filename = CONSTANTS.MODULES['SPACE'][i].split('/').pop().split('.')[0];
							var extension = CONSTANTS.MODULES['SPACE'][i].split('/').pop().split('.').pop();

							if(extension === 'js') {
								eval(Loader._instance.getTextFile(filename));
							}
						}

					}, CONSTANTS.COMMON.FADE_OUT_DURATION);
				});

			}, CONSTANTS.COMMON.FADE_OUT_DURATION);
		});
	});
}