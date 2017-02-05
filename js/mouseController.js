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

    document.addEventListener('touchstart', function(e) {
        _moveable = true;

        _x = e.targetTouches[0].pageX;
        _y = e.targetTouches[0].pageY;
    });

    document.addEventListener('mouseup', function() {
    	_moveable = false;
    });

    document.addEventListener('touchend', function() {
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

    document.addEventListener('touchmove', function(e) {
        if(_moveable) {

            _deltaX = e.targetTouches[0].pageX - _x;
            _deltaY = e.targetTouches[0].pageY - _y;

            camera.position.x -= _deltaX * 0.7;
            camera.position.y += _deltaY * 0.7;

            _x = e.targetTouches[0].pageX;
            _y = e.targetTouches[0].pageY;

            _self.updateCameraPosition();
        } 
    });
}