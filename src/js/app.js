// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        pixi: 'pixi.min',
        howler: 'howler.min',
        app: '../app',
        helper: '../app/helper',
        states: '../app/states'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
