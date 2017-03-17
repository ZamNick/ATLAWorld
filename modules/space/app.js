var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

var controls = new THREE.TrackballControls(camera);
controls.minDistance = 700;
controls.maxDistance = 2000;

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
$('body').append('<i class="fa fa-arrow-down" style="position:absolute;top:0;left:0;color:#fff;font-size:4em;margin:20px 0 0 20px;opacity:.3"></i>');

var loader = new THREE.ImageLoader();

var earthMesh, cloudsMesh, moonMesh;

loader.load('/modules/space/moonmap.jpg', function(image) {

    var texture = new THREE.Texture();

    texture.image = image;
    texture.needsUpdate = true;

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.FrontSide });
    moonMesh = new THREE.Mesh(geometry, material);

    moonMesh.position.set(-700, 0, 400);

    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;

    scene.add(moonMesh);
});

loader.load('/modules/space/map.png', function(image) {

    var texture = new THREE.Texture();

    texture.image = image;
    texture.needsUpdate = true;

    var geometry = new THREE.SphereGeometry(250, 32, 32);
    var material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.FrontSide });
    earthMesh = new THREE.Mesh(geometry, material);

    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;

    scene.add(earthMesh);

    loader.load('/modules/space/glow.png', function(image) {
        
        texture = new THREE.Texture();

        texture.image = image;
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            color: 0x00d3ff,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(700, 700);
        earthMesh.add(sprite);

        loader.load('/modules/space/original.png', function(image) {

            texture = new THREE.Texture();

            texture.image = image;
            texture.needsUpdate = true;

            geometry = new THREE.SphereGeometry(251.5, 32, 32);
            material = new THREE.MeshPhongMaterial({ map: texture, transparent: true, side: THREE.FrontSide });
            cloudsMesh = new THREE.Mesh(geometry, material);

            cloudsMesh.receiveShadow = true;

            scene.add(cloudsMesh);
        });
    });

    camera.position.set(0, 0, 1000);
});

loader.load('/modules/space/space.jpg', function(image) {

    var texture = new THREE.Texture();

    texture.image = image;
    texture.needsUpdate = true;

    var geometry = new THREE.SphereGeometry(8000, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    var spaceMesh = new THREE.Mesh(geometry, material);

    scene.add(spaceMesh);
});

loader.load('/modules/space/lensflare0.png', function(flare0) {
    loader.load('/modules/space/lensflare2.png', function(flare2) {
        loader.load('/modules/space/lensflare3.png', function(flare3) {

            var textureFlare0 = new THREE.Texture();
            textureFlare0.image = flare0;
            textureFlare0.needsUpdate = true;

            var textureFlare2 = new THREE.Texture();
            textureFlare2.image = flare2;
            textureFlare2.needsUpdate = true;

            var textureFlare3 = new THREE.Texture();
            textureFlare3.image = flare3;
            textureFlare3.needsUpdate = true;

            var ambientLight = new THREE.AmbientLight(0x0C0C0C);
            scene.add(ambientLight);

            var light = new THREE.SpotLight(0xFFFFFF, 1, 5000, 0.5);
            light.position.set(-1800, 0, 0);
            
            light.castShadow = true;

            scene.add(light);

            var flareColor = new THREE.Color( 0xffffff );

            var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

            lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
            lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
            lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

            lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
            lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
            lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
            lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

            lensFlare.customUpdateCallback = lensFlareUpdateCallback;
            lensFlare.position.set(-5000, 0, 0);

            scene.add( lensFlare );

        });
    });
});

function lensFlareUpdateCallback( object ) {

    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;


    for( f = 0; f < fl; f++ ) {

        flare = object.lensFlares[ f ];

        flare.x = object.positionScreen.x + vecX * flare.distance;
        flare.y = object.positionScreen.y + vecY * flare.distance;

        flare.rotation = 0;

    }

    object.lensFlares[ 2 ].y += 0.025;
    object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

}

(function loop() {
    requestAnimationFrame(loop);
    controls.update();

    earthMesh.rotation.y += 0.0002;
    cloudsMesh.rotation.y -= 0.0003;

    var oldCoordinates = {
        x: moonMesh.position.x,
        z: moonMesh.position.z
    };

    moonMesh.position.set(
        oldCoordinates.x * Math.cos(0.001) - oldCoordinates.z * Math.sin(0.001),
        0,
        oldCoordinates.x * Math.sin(0.001) + oldCoordinates.z * Math.cos(0.001)
    );

    renderer.render(scene, camera);
})();