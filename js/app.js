window.onload = function() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 800;

	var loader = new THREE.ImageLoader();

	loader.load(
		'img/map.png',
		function(image) {

			var texture = new THREE.Texture();

			texture.image = image;
			texture.needsUpdate = true;
			
			var geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 32);
			var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
			var plane = new THREE.Mesh(geometry, material);
			
			scene.add(plane);
		}
	);

	/*
	var particleCount = 100000;
	var particles = new THREE.Geometry();

	for(var i = 0; i < particleCount; ++i) {

		var x = Math.random() * window.innerWidth - (window.innerWidth / 2.0);
		var y = Math.random() * window.innerHeight - (window.innerHeight / 2.0);
		var z = Math.random() * 400 + 400;

		var particle = new THREE.Vector3(x, y, z);

		particles.vertices.push(particle);
	}

	var material = new THREE.PointsMaterial({
		color: 'white',
		transparent: true,
		size: 0.1
	});

	var particleSystem = new THREE.PointCloud(particles, material);
	scene.add(particleSystem);
	*/

	loader.load(
		'img/cloud.png',
		function(image) {

			var texture = new THREE.Texture();

			texture.image = image;
			texture.needsUpdate = true;

			var geometry = new THREE.PlaneGeometry(64, 64, 32);

			var material = new THREE.MeshBasicMaterial({
				map: texture,
				side: THREE.DoubleSide,
				transparent: true
			});

			for(var i = 0; i < 500; ++i) {
				
				var plane = new THREE.Mesh(geometry, material);
				
				plane.position.x = Math.random() * window.innerWidth - (window.innerWidth / 2.0);
				plane.position.y = Math.random() * window.innerHeight - (window.innerHeight / 2.0);
				plane.position.z = Math.random() * 300 + 500;
				
				scene.add(plane);
			}
		}
	);

	var render = function () {
		requestAnimationFrame( render );
		renderer.render(scene, camera);
	};

	render();

    function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document) {
          // IE9+, FF17+
          elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
          // устаревший вариант события
          elem.addEventListener("mousewheel", handler);
        } else {
          // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
          elem.addEventListener("MozMousePixelScroll", handler);
        }
      } else { // IE8-
        text.attachEvent("onmousewheel", handler);
      }
    }

    addOnWheel(document, function(e) {

    	var scale = 0;
    	var delta = e.deltaY || e.detail || e.wheelDelta;

	    if (delta > 0) scale += 10;
	    else scale -= 10;

	    camera.position.z += scale;
	    camera.position.z = Math.min(camera.position.z, 800);
	    camera.position.z = Math.max(camera.position.z, 200);

	    updateCameraPosition();

    });

    var moveable = false;

    document.addEventListener('mousedown', function(e) {
    	moveable = true;
    });

    document.addEventListener('mouseup', function(e) {
    	moveable = false;
    });

    document.addEventListener('mousemove', function(e) {
    	if(moveable) {

    		camera.position.x -= e.movementX * 0.1;
    		camera.position.y += e.movementY * 0.1;

    		updateCameraPosition();
    	}
    });

    function updateCameraPosition() {
		var scale = 1 - (camera.position.z / 800);

		camera.position.x = Math.max(camera.position.x, (-window.innerWidth / 2) * scale);
		camera.position.y = Math.max(camera.position.y, (-window.innerHeight / 2) * scale);

		camera.position.x = Math.min(camera.position.x, (window.innerWidth / 2) * scale);
		camera.position.y = Math.min(camera.position.y, (window.innerHeight / 2) * scale);
    }
}