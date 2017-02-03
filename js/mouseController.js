'use strict';

function MouseController(camera) {

	AbstractController.call(this, camera);

	var _moveable = false;
	var _self = this;
    var _x = null;
    var _y = null;
    var _deltaX = 0;
    var _deltaY = 0;

    document.addEventListener('mousedown', function(e) {
    	_moveable = true;
        _x = e.x;
        _y = e.y;
    });

    document.addEventListener('mouseup', function() {
    	_moveable = false;
    });

    document.addEventListener('mousemove', function(e) {
    	if(_moveable) {

            _deltaX = e.movementX || (e.x - _x);
            _deltaY = e.movementY || (e.y - _y);

    		camera.position.x -= _deltaX * 0.1;
    		camera.position.y += _deltaY * 0.1;

            _x = e.x;
            _y = e.y;

    		_self.updateCameraPosition();
    	}
    });
}