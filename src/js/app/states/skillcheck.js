define(['pixi', 'helper/utils'], function(PIXI, Utils) {
    // CONSTANTS
    var GEN_R = 65.0; // radius of skill check circle
    var R = 70.0;
    var GEN_ANGLE = Math.PI / 4; // degree of pie slice
    var GEN_ANGLE_GREAT = GEN_ANGLE / 5; // degree of pie slice

    var SkillCheckState = function(game) {
        console.log('Skillcheck state');
        this.game = game;
        this.center = game.center;
        this.stamp = Date.now();
        this.deg = this.getRandomDeg();
        this.setup();
    };
    
    SkillCheckState.prototype.name = 'skillcheck';

    SkillCheckState.prototype.run = function(timestamp) {
        if (this.marker.stop === undefined)
            this.marker.rotation = Utils.normalizeAngle(this.marker.rotation+0.1);
        this.marker.position.x = GEN_R*Math.cos(this.marker.rotation + Math.PI/2) + this.center.x;
        this.marker.position.y = GEN_R*Math.sin(this.marker.rotation + Math.PI/2) + this.center.y;
    };

    SkillCheckState.prototype.setup = function() {
        var self = this;
        var stage = this.game.stage;
        this.game.clearStage();

        var genMissSprite = new PIXI.Sprite(PIXI.loader.resources["img/gen_miss.png"].texture);
        var genGoodSprite = new PIXI.Sprite(PIXI.loader.resources["img/gen_good.png"].texture);
        var genGreatSprite = new PIXI.Sprite(PIXI.loader.resources["img/gen_great.png"].texture);
        var genSprites = [genMissSprite, genGoodSprite, genGreatSprite];
        this.marker = new PIXI.Sprite(PIXI.loader.resources["img/marker.png"].texture);

        // Add sprites to stage
        genSprites.forEach(function (sprite) {
            Utils.setAnchorCenter(sprite);
            sprite.position = self.center;
            stage.addChild(sprite);
        });
        stage.addChild(this.marker);

        var rad = this.degToRealRad(this.deg);

        genMissSprite.mask = this.getSectorMask(rad+GEN_ANGLE, rad);
        genGoodSprite.mask = this.getSectorMask(rad, rad+GEN_ANGLE);
        genGreatSprite.mask = this.getSectorMask(rad, rad+GEN_ANGLE_GREAT)
            .addChild(this.getSectorMask(rad+GEN_ANGLE, rad+GEN_ANGLE+0.2));

        Utils.setAnchorCenter(this.marker);
        this.marker.positionDeg = 0;

        var space = Utils.keyboard(32);
        space.press = function() {
            var angle = Utils.getHitAngle(self.marker.rotation);
            if (angle > 270 && angle < 270 + GEN_ANGLE*PIXI.RAD_TO_DEG) {
                console.log('Hit!');
                self.marker.stop = true;
            }
            if (angle > 270 && angle < 270 + GEN_ANGLE_GREAT*PIXI.RAD_TO_DEG) {
                console.log('Great hit!');
            }
        };
    };

    SkillCheckState.prototype.getRandomDeg = function() {
        return Utils.getRandomInt(45, 300);
    };

    SkillCheckState.prototype.degToRealRad = function(deg) {
        return deg*PIXI.DEG_TO_RAD - Math.PI/2;
    };

    SkillCheckState.prototype.getSectorMask = function(startRad, endRad) {
        var mask = new PIXI.Graphics();
        mask.beginFill(0xFFFFFF);
        mask.arc(this.game.center.x, this.game.center.y, R, startRad, endRad);
        mask.lineTo(this.game.center.x, this.game.center.y);
        mask.endFill();
        return mask;
    };

    return SkillCheckState;
});