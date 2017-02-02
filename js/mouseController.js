'use strict';

function MouseController(camera) {

	AbstractController.call(this, camera);

	var _moveable = false;
	var _self = this;
    var _x = null;
    var _y = null;

    document.addEventListener('mousedown', function(e) {
    	_moveable = true;
        _x = e.x;
        _y = e.y;
    });

    document.addEventListener('mouseup', function(e) {
    	_moveable = false;
    });

    document.addEventListener('mousemove', function(e) {
    	if(_moveable) {

            e.movementX = e.movementX || (e.x - _x);
            e.movementY = e.movementY || (e.y - _y);

    		camera.position.x -= e.movementX * 0.1;
    		camera.position.y += e.movementY * 0.1;

            _x = e.x;
            _y = e.y;

    		_self.updateCameraPosition();
    	}
    });
}