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

	this.camera.position.z = CONSTANTS.CAMERA.START_Z_POSITION;

	var windowController = new WindowController(this.camera, this.renderer);
	var mouseController = new MouseController(this.camera);

	this.domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
};

World.prototype.start = function() {

	var self = this;

	var texture = new THREE.Texture();

	texture.image = Loader._instance.getImage('map');
	texture.needsUpdate = true;
	
	var geometry = new THREE.PlaneGeometry(texture.image.naturalWidth, texture.image.naturalHeight, 32);
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var plane = new THREE.Mesh(geometry, material);
	
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
			
			plane.position.x = Math.random() * 4000 - 2000;
			plane.position.y = Math.random() * 2000 - 1000;
			plane.position.z = Math.random() * 200 + CONSTANTS.CLOUDS[i].Z_INDEX;

			clouds.push(plane);
			
			this.scene.add(plane);
		}
	}

	for(var i = 0; i < CONSTANTS.MAP.length; ++i) {

		texture = new THREE.Texture();

		texture.image = Loader._instance.getImage(CONSTANTS.MAP[i].markerType);
		texture.needsUpdate = true;

		geometry = new THREE.PlaneGeometry(CONSTANTS.MARKER.WIDTH, CONSTANTS.MARKER.HEIGHT, CONSTANTS.MARKER.SEGMENTS);

		material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true
		});

		plane = new THREE.Mesh(geometry, material);
		plane.position.set(CONSTANTS.MAP[i].x, CONSTANTS.MAP[i].y, CONSTANTS.MAP[i].z);
		plane.name = CONSTANTS.MAP[i].name;

		this.domEvents.addEventListener(plane, 'click', function(e) {

			Loader._instance.loadJSON('/materials/' + e.target.name + '/data.json')
							.then(function(data) { updatePreview(data); });

			var preview = document.getElementById('preview');

			if(!preview.classList.contains('preview-show')) {
				preview.classList.add('preview-show');
			} else {
				preview.classList.remove('preview-show');
			}
		});
		
		this.scene.add(plane);
	}

	var fontLoader = new THREE.FontLoader();
	fontLoader.load(CONSTANTS.LABELS.SETTINGS.FONT, function(font) {
		for(var i = 0; i < CONSTANTS.LABELS.ARRAY.length; ++i) {

			var  textGeo = new THREE.TextGeometry(CONSTANTS.LABELS.ARRAY[i].TEXT, {
	            font: font,
	            size: CONSTANTS.LABELS.SETTINGS.SIZE,
	            height: CONSTANTS.LABELS.SETTINGS.HEIGHT,
	            curveSegments: CONSTANTS.LABELS.SETTINGS.CURVE_SEGMENTS
	    	});

	    	var material = new THREE.MeshBasicMaterial({ color: CONSTANTS.LABELS.SETTINGS.COLOR });
			var mesh = new THREE.Mesh(textGeo, material);
			mesh.position.set(CONSTANTS.LABELS.ARRAY[i].X, CONSTANTS.LABELS.ARRAY[i].Y, CONSTANTS.LABELS.ARRAY[i].Z);

			self.scene.add(mesh);
		}
	});

	(function loop() {
		requestAnimationFrame(loop);

		for(var i = 0; i < clouds.length; ++i) {
			clouds[i].position.x += cloudMovingDirectionX;
			clouds[i].position.y += cloudMovingDirectionY;

			if(clouds[i].position.x < -2000) clouds[i].position.x = 2000;
			if(clouds[i].position.y < -1000) clouds[i].position.y = 1000;

			if(clouds[i].position.x > 2000) clouds[i].position.x = -2000;
			if(clouds[i].position.y > 1000) clouds[i].position.y = -1000;
		}

		self.renderer.render(self.scene, self.camera);
	})();
}

function updatePreview(data) {
	var quote = data.quotes[Math.round(Math.random() * (data.quotes.length - 1))];
	var html = "<img src='" + data.url + "' alt='" + data.name + "'>" +
		"<blockquote>";
	for(var i = 0; i < Object.keys(quote).length; ++i) {
		html += "<div><span class='name'>" + Object.keys(quote)[i] + ": </span><span>" + Object.values(quote)[i] + "</span></div>";
	}
	html += "</blockquote>";
	document.getElementById('preview').innerHTML = html;
}