define(['howler'], function(Howl) {
    var sound = new Howl({
        src: ['sounds.webm', 'sounds.mp3'],
        sprite: {
            blast: [0, 1000],
            laser: [2000, 3000],
            winner: [4000, 7500]
        }
    });

    return {
        Sound: sound
    };
});