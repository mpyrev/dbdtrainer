require(['pixi', 'helper/utils', 'app/game'], function (PIXI, Utils, Game) {
    // Load PIXI
    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(256, 256);

    Utils.centerizeRenderer(renderer);

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    var game = new Game(renderer);
    game.run();
});
