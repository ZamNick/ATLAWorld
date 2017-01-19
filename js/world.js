function World() { }

World.prototype.init = function() {

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(
		CONSTANTS.CAMERA.FRUSTUM, 
		CONSTANTS.CAMERA.ASPECT_RATIO, 
		CONSTANTS.CAMERA.NEAR, 
		CONSTANTS.CAMERA.FAR
	);

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	this.camera.labelsType = 1;

	var windowController = new WindowController(this.camera, this.renderer, this);
	var mouseController = new MouseController(this.camera);

	this.domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);

	$(CONSTANTS.SLICK.CONTAINER).slick(CONSTANTS.SLICK.SETTINGS);
};

World.prototype.start = function() {

	var self = this;

	var texture = new THREE.Texture();

	texture.image = Loader._instance.getImage(CONSTANTS.MAP.SETTINGS.NAME);
	texture.needsUpdate = true;
	
	var geometry = new THREE.PlaneGeometry(
		texture.image.naturalWidth, 
		texture.image.naturalHeight, 
		CONSTANTS.MAP.SETTINGS.SEGMENTS
	);

	var material = new THREE.MeshBasicMaterial({
		map: texture, 
		side: THREE.DoubleSide
	});

	var plane = new THREE.Mesh(geometry, material);

	this.domEvents.addEventListener(plane, 'click', function(e) {
		
		var preview = $('.preview');

		if(preview.hasClass('preview-show')) {
			preview.removeClass('preview-show');
		}
	});
	
	this.scene.add(plane);

	var clouds = [];

	var cloudMovingDirectionX = (Math.random() * 2 - 1) * 0.05;
	var cloudMovingDirectionY = (Math.random() * 2 - 1) * 0.05;

	for(var i = 0; i < CONSTANTS.CLOUDS.length; ++i) {
		
		texture = new THREE.Texture();

		texture.image = Loader._instance.getImage(CONSTANTS.CLOUDS[i].NAME);
		texture.needsUpdate = true;

		var imageWidth = texture.image.naturalWidth;
		var imageHeight = texture.image.naturalHeight;

		geometry = new THREE.PlaneGeometry(imageWidth / 2, imageHeight / 2, CONSTANTS.CLOUDS[i].SEGMENTS);

		material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true
		});

		for(var j = 0; j < CONSTANTS.CLOUDS[i].COUNT; ++j) {
			
			plane = new THREE.Mesh(geometry, material);
			
			plane.position.x = Math.random() * CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.X - CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_X;
			plane.position.y = Math.random() * CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.Y - CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_Y;
			plane.position.z = Math.random() * CONSTANTS.CLOUDS[i].Z_COEFFICIENT + CONSTANTS.CLOUDS[i].Z_INDEX;

			clouds.push(plane);
			
			this.scene.add(plane);
		}
	}

	var lastTab = null;

	for(var i = 0; i < CONSTANTS.MAP.ARRAY.length; ++i) {

		texture = new THREE.Texture();

		texture.image = Loader._instance.getImage(CONSTANTS.MAP.ARRAY[i].MARKER);
		texture.needsUpdate = true;

		geometry = new THREE.PlaneGeometry(
			CONSTANTS.MARKER.WIDTH, 
			CONSTANTS.MARKER.HEIGHT, 
			CONSTANTS.MARKER.SEGMENTS
		);

		material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true
		});

		plane = new THREE.Mesh(geometry, material);
		plane.position.set(CONSTANTS.MAP.ARRAY[i].X, CONSTANTS.MAP.ARRAY[i].Y, CONSTANTS.MAP.ARRAY[i].Z);
		plane.name = CONSTANTS.MAP.ARRAY[i].NAME;

		this.domEvents.addEventListener(plane, 'click', function(e) {

			var preview = $('.preview');

			if(preview.length && lastTab != e.target.name) {
				if(!preview.hasClass('preview-show')) {
					preview[0].innerHTML = '';
					preview.toggleClass('preview-show');
					Loader._instance.loadJSON('/materials/' + e.target.name + '/data.json')
									.then(function(data) { updatePreview(data); });
				} else {
					preview.toggleClass('preview-show');
					setTimeout(function() {
						Loader._instance.loadJSON('/materials/' + e.target.name + '/data.json')
										.then(function(data) { updatePreview(data); });
					}, 500);
				}
			} else if(!preview.length) {
				Loader._instance.loadJSON('/materials/' + e.target.name + '/data.json')
								.then(function(data) { updatePreview(data); });
			} else {
				preview.toggleClass('preview-show');
			}
	
			lastTab = e.target.name;
			e.stopPropagation();
		});
		
		this.scene.add(plane);
	}

	this.camera.position.z = 500;
	this.firstAnimation = true;

	this.printLabels();

	(function loop() {
		requestAnimationFrame(loop);

		for(var i = 0; i < clouds.length; ++i) {
			clouds[i].position.x += cloudMovingDirectionX;
			clouds[i].position.y += cloudMovingDirectionY;

			if(clouds[i].position.x < -CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_X) clouds[i].position.x = CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_X;
			if(clouds[i].position.y < -CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_Y) clouds[i].position.y = CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_Y;

			if(clouds[i].position.x > CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_X) clouds[i].position.x = -CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_X;
			if(clouds[i].position.y > CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_Y) clouds[i].position.y = -CONSTANTS.MAP.SETTINGS.BOUNDING_BOX.HALF_Y;
		}

		if(self.firstAnimation) {
			
			var addHeight = Math.max(70 * (1 - (self.camera.position.z / CONSTANTS.CAMERA.START_Z_POSITION)), 2);

			self.camera.position.z += addHeight;
			
			if(self.camera.position.z >= CONSTANTS.CAMERA.START_Z_POSITION) {
				self.camera.position.z = CONSTANTS.CAMERA.START_Z_POSITION;
				self.firstAnimation = false;
			}
		}

		self.renderer.render(self.scene, self.camera);
	})();
}

World.prototype.printLabels = function() {

	var self = this;
	var mustRemoved = [];

	for(var i = 0; i < self.scene.children.length; ++i) {
		if(self.scene.children[i].geometry.type === "TextGeometry") {
			mustRemoved.push(self.scene.children[i]);
		}
	}

	for(var i = 0; i < mustRemoved.length; ++i) {
		self.scene.remove(mustRemoved[i]);
	}
	
	var _printLetter = function(FONT, LABEL, INDEX) {
		if(INDEX === LABEL.TEXT.length) return;
		setTimeout(function() {

			var  textGeo = new THREE.TextGeometry(LABEL.TEXT[INDEX], {
		            font: FONT,
		            size: LABEL.SIZE,
		            height: CONSTANTS.LABELS.SETTINGS.HEIGHT,
		            curveSegments: CONSTANTS.LABELS.SETTINGS.CURVE_SEGMENTS
		    	});

	    	var material = new THREE.MeshBasicMaterial({ color: LABEL.COLOR });
			var mesh = new THREE.Mesh(textGeo, material);
			
			mesh.position.set(LABEL.X + LABEL.LETTER_SPACE * INDEX, LABEL.Y, LABEL.Z);

			self.scene.add(mesh);

			_printLetter(FONT, LABEL, INDEX + 1);

		}, 50);
	}

	setTimeout(function() {
		var fontLoader = new THREE.FontLoader();
		fontLoader.load(CONSTANTS.LABELS.SETTINGS.FONT, function(FONT) {
			for(var i = 0; i < CONSTANTS.LABELS.ARRAY.length; ++i) {
				if(CONSTANTS.LABELS.ARRAY[i].TYPE === self.camera.labelsType) {
					_printLetter(FONT, CONSTANTS.LABELS.ARRAY[i], 0);
				}
			}
		});
	}, 500);
}

function updatePreview(data) {
	
	var template = $('#handlebars-preview').html();

	var templateScript = Handlebars.compile(template);

	var imgName = data.urls[0].split('/').pop().split('.')[0];
	
	var html = templateScript({
		name: data.name,
		image: $(Loader._instance.getImage(imgName))[0].outerHTML,
		nationality: data.nationality,
		location: data.location,
		position: data.position,
		gaverment: data.gaverment,
		lookLocation: data.lookLocation
	});

	var preview = $('.preview');
	preview[0].innerHTML = '';
	preview.append(html).addClass('preview-show');

	$('.preview-search').on('click', function() {
		
		preview.removeClass('preview-show');
		
		var mainCanvas = $("body > canvas")[0];
		$(mainCanvas).fadeOut(2000);

		setTimeout(function() {

			template = $('#handlebars-load-location').html();
			templateScript = Handlebars.compile(template);
			
			html = templateScript({
				name: data.name,
				image: $(Loader._instance.getImage(imgName))[0].outerHTML
			});

			var loadLocationSection = $('.load-location');
			//loadLocationSection[0].style.background = 'url(' + data.urls[0] + ')';
			
			loadLocationSection[0].innerHTML = '';
			loadLocationSection.append(html);

			loadLocationSection.show();

			Loader._instance.loadLocation(data, function() {

				loadLocationSection.fadeOut(2000);

				var images = [];
				var commonWidth = 0;

				for(var i = 0; i < data.urls.length; ++i) {
					imgName = data.urls[i].split('/').pop().split('.')[0];
					commonWidth += Loader._instance.getImage(imgName).naturalWidth;
					images.push($(Loader._instance.getImage(imgName))[0].outerHTML);
				}

				template = $('#handlebars-location').html();
				templateScript = Handlebars.compile(template);

				html = templateScript({
					images: images
				});

				var location = $('.location');
				location[0].innerHTML = '';
				location.append(html);

				location[0].style.width = commonWidth + 'px';

				var grabbed = false;
				var _x = 0;
				var _y = 0;

				location.on('mousedown', function(e) {
					grabbed = true;
					_x = e.pageX;
					_y = e.pageY;
				});

				location.on('mouseup', function(e) {
					grabbed = false;
				});

				location.on('mousemove', function(e) {
					if(grabbed) {
						
						e.movementX = e.pageX - _x;
						e.movementY = e.pageY - _y;
						
						_x = e.pageX;
						_y = e.pageY;

						$('.location').css('left', parseInt($('.location').css('left')) + e.movementX);
					}
				});

				setTimeout(function() {
					location.show();
				}, 2000);
			});
		}, 2000);
	});
}

Handlebars.registerHelper('if', function(a, opts) {
    if (a) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});