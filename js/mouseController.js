function MouseController(camera) {

	AbstractController.call(this, camera);

	var _moveable = false;
	var _self = this;

    document.addEventListener('mousedown', function(e) {
    	_moveable = true;
    });

    document.addEventListener('mouseup', function(e) {
    	_moveable = false;
    });

    document.addEventListener('mousemove', function(e) {
    	if(_moveable) {

    		camera.position.x -= e.movementX * 0.1;
    		camera.position.y += e.movementY * 0.1;

    		_self.updateCameraPosition();
    	}
    });
}