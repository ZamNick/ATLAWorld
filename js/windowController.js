function WindowController(camera) {

    AbstractController.call(this, camera);

    this.camera = camera;

    var _self = this;

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
        camera.position.z = Math.min(camera.position.z, 800);
        camera.position.z = Math.max(camera.position.z, 200);

        _self.updateCameraPosition();
    });
}