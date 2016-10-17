define(['helper/utils'], function(Utils) {
    var BoomState = function(game) {
        this.game = game;
    };

    BoomState.prototype.name = 'boom';

    BoomState.prototype.run = function(timestamp) {};

    return BoomState;
});