define([], function() {
    var IdleState = function(game) {
        console.log('Idle state');
        this.game = game;
    };

    IdleState.prototype.name = 'idle';

    IdleState.prototype.run = function() {};

    return IdleState;
});