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

	var windowController = new WindowController(this.camera);
	var mouseController = new MouseController(this.camera);

	this.domEvents = new THREEx.DomEvents(this.camera, this.renderer.domElement);
};

World.prototype.start = function() {

	var self = this;

	var texture = new THREE.Texture();

	texture.image = Loader._instance.getImage('map');
	texture.needsUpdate = true;
	
	var geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 32);
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var plane = new THREE.Mesh(geometry, material);
	
	this.scene.add(plane);

	var clouds = [];

	var cloudMovingDirectionX = (Math.random() * 2 - 1) * 0.05;
	var cloudMovingDirectionY = (Math.random() * 2 - 1) * 0.05;

	texture = new THREE.Texture();

	texture.image = Loader._instance.getImage('cloud');
	texture.needsUpdate = true;

	geometry = new THREE.PlaneGeometry(64, 64, 32);

	material = new THREE.MeshBasicMaterial({
		map: texture,
		side: THREE.DoubleSide,
		transparent: true
	});

	for(var i = 0; i < 500; ++i) {
		
		plane = new THREE.Mesh(geometry, material);
		
		plane.position.x = Math.random() * window.innerWidth - (window.innerWidth / 2.0);
		plane.position.y = Math.random() * window.innerHeight - (window.innerHeight / 2.0);
		plane.position.z = Math.random() * 300 + 500;

		clouds.push(plane);
		
		this.scene.add(plane);
	}

	texture = new THREE.Texture();

	texture.image = Loader._instance.getImage('marker_water');
	texture.needsUpdate = true;

	geometry = new THREE.PlaneGeometry(10, 10, 32);

	material = new THREE.MeshBasicMaterial({
		map: texture,
		side: THREE.DoubleSide,
		transparent: true
	});
		
	plane = new THREE.Mesh(geometry, material);
	
	plane.position.x = -53;
	plane.position.y = 67 - window.innerHeight / 2;
	plane.position.z = 10;

	this.domEvents.addEventListener(plane, 'click', function(e) {
		console.log(e);
	});
	
	this.scene.add(plane);

	(function loop() {
		requestAnimationFrame(loop);

		for(var i = 0; i < clouds.length; ++i) {
			clouds[i].position.x += cloudMovingDirectionX;
			clouds[i].position.y += cloudMovingDirectionY;

			if(clouds[i].position.x < (-window.innerWidth / 2)) clouds[i].position.x = window.innerWidth / 2;
			if(clouds[i].position.y < (-window.innerHeight / 2)) clouds[i].position.y = window.innerHeight / 2;

			if(clouds[i].position.x > (window.innerWidth / 2)) clouds[i].position.x = (-window.innerWidth / 2);
			if(clouds[i].position.y > (window.innerHeight / 2)) clouds[i].position.y = (-window.innerHeight / 2);
		}

		self.renderer.render(self.scene, self.camera);
	})();
}