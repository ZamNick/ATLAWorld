function WindowController(camera, renderer, world) {

    AbstractController.call(this, camera);

    var _self = this;

    function onWindowResize(e) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', function(e) { onWindowResize(e); }, false);

    var _addOnWheel = function(elem, handler) {
        if (elem.addEventListener) {
            if ('onwheel' in document) {
              elem.addEventListener("wheel", handler); // IE9+, FF17+
            } else if ('onmousewheel' in document) {
                elem.addEventListener("mousewheel", handler); // устаревший вариант события
            } else {
                elem.addEventListener("MozMousePixelScroll", handler); // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
            }
        } else {
            text.attachEvent("onmousewheel", handler); // IE8-
        }
    }

    _addOnWheel(document, function(e) {

        var scale = 0;
        var delta = e.deltaY || e.detail || e.wheelDelta;

        if (delta > 0) scale += 10;
        else scale -= 10;

        camera.position.z += scale;
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
}