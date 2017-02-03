'use strict';

function WindowController(camera, renderer, world) {

    AbstractController.call(this, camera);

    var _scale = 0;
    var _delta = 0;
    var _self = this;
    var _addOnWheel = function(elem, handler) {
        if (elem.addEventListener) {
            if ('onwheel' in document) {
              elem.addEventListener("wheel", handler);
            } else if ('onmousewheel' in document) {
                elem.addEventListener("mousewheel", handler);
            } else {
                elem.addEventListener("MozMousePixelScroll", handler);
            }
        } else {
            elem.attachEvent("onmousewheel", handler);
        }
    }

    _addOnWheel(document, function(e) {

        _scale = 0;
        _delta = e.deltaY || e.detail || e.wheelDelta;

        if (_delta > 0) _scale += CONSTANTS.SCALE.DELTA;
        else _scale -= CONSTANTS.SCALE.DELTA;

        camera.position.z += _scale;
        camera.position.z = Math.min(camera.position.z, CONSTANTS.SCALE.MAX);
        camera.position.z = Math.max(camera.position.z, CONSTANTS.SCALE.MIN);

        if(camera.labelsType === 1 && camera.position.z <= 1400) {
            camera.labelsType = 2;
            world.printLabels();
        }

        if(camera.labelsType === 2 && camera.position.z > 1400) {
            camera.labelsType = 1;
            world.printLabels();
        }

        _self.updateCameraPosition();
    });

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', function() { onWindowResize(); }, false);
}