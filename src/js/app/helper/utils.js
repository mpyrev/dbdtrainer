define(['pixi'], function (PIXI) {
    function setAnchorCenter(obj) {
        obj.anchor.x = 0.5;
        obj.anchor.y = 0.5;
    }

    function normalizeAngle(angle) {
        return Math.atan2(Math.sin(angle), Math.cos(angle));
    }


    function getHitAngle(rad) {
        var angle = normalizeAngle(rad + Math.PI) * PIXI.RAD_TO_DEG;
        return angle >= 0 ? angle : 360 + angle;
    }

    function keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function(event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }

    function centerizeRenderer(renderer) {
        function onResize() {
            renderer.view.style.position = 'absolute';
            renderer.view.style.left = ((window.innerWidth - renderer.width) >> 1) + 'px';
            renderer.view.style.top = ((window.innerHeight - renderer.height) >> 1) + 'px';
        }
        onResize();
        window.addEventListener('resize', onResize);
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        setAnchorCenter: setAnchorCenter,
        normalizeAngle: normalizeAngle,
        getHitAngle: getHitAngle,
        keyboard: keyboard,
        centerizeRenderer: centerizeRenderer,
        getRandomInt: getRandomInt
    };
});