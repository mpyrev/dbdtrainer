define(
    ['pixi', 'helper/utils', 'states/idle', 'states/repair', 'states/skillcheck', 'states/boom'],
    function(PIXI, Utils, IdleState, RepairState, SkillCheckState, BoomState) {

    var Game = function(renderer) {
        this.center = {x: renderer.width/2, y: renderer.height/2};
        this.state = null;
        this.marker = null;
        this.renderer = renderer;
        var stage = new PIXI.Container();
        stage.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
        stage.interactive = true;
        // stage.buttonMode = true;
        this.stage = stage;
    };

    Game.prototype.run = function() {
        this.preload(this.setup.apply(this));
    };

    Game.prototype.preload = function(callback) {
        // Load all our textures (sprites)
        PIXI.loader
            .add("img/gen_miss.png")
            .add("img/gen_good.png")
            .add("img/gen_great.png")
            .add("img/marker.png")
            .load(callback);
    };

    Game.prototype.setup = function setup() {
        var self = this;

        this.callState('idle');

        // Repair started
        var pressHandler = function() {
            self.callState('repair');
        };
        this.stage.on('mousedown', pressHandler);
        this.stage.on('touchstart', pressHandler);

        // Repair finished
        var releaseHandler = function() {
            if (self.state.name == 'skillcheck'){
                self.callState('boom');
            } else {
                self.clearStage();
                self.callState('idle');
            }
        };
        this.stage.on('mouseup', releaseHandler);
        this.stage.on('touchend', releaseHandler);

        this.gameLoop(Date.now());
    };

    Game.prototype.gameLoop = function(timestamp) {
        requestAnimationFrame(this.gameLoop.bind(this));
        this.state.run(timestamp);
        this.renderer.render(this.stage);
    };

    Game.prototype.states = {
        idle: IdleState,
        repair: RepairState,
        skillcheck: SkillCheckState,
        boom: BoomState
    };

    Game.prototype.callState = function(name) {
        this.state = new this.states[name](this);
    };

    Game.prototype.clearStage = function() {
        while (this.stage.children.length) {
            this.stage.removeChild(this.stage.children[0]);
        }
    };

    return Game;
});