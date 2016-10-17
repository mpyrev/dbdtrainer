define(['helper/utils', 'pixi'], function(Utils, PIXI) {
    // CONSTANTS
    var CHANCE_STEP = 40;

    var RepairState = function(game) {
        // Chance percent of skill check
        // Grows every second
        console.log('Repair state');
        this.chance = 0;
        this.stamp = null;
        this.game = game;
        this.stop = false;
    };

    RepairState.prototype.name = 'repair';

    RepairState.prototype.run = function(timestamp) {
        var self = this;

        if (this.stamp == null) this.stamp = timestamp;

        if (!this.stop && timestamp - this.stamp >= 1000) {
            this.stamp = timestamp;
            this.chance += CHANCE_STEP;
            console.log('Chance is ' + this.chance + '%');
            if (this.isSkillCheck()) {
                this.stop = true;
                setTimeout(function() {
                    self.game.callState('skillcheck');
                }, 1000);
            }
        }
    };

    RepairState.prototype.isSkillCheck = function() {
        var rng = Utils.getRandomInt(0, 99);
        return rng < this.chance;
    };

    return RepairState;
});