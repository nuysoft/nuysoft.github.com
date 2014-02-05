requirejs.config({
    // baseUrl: './',
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    paths: {
        // plugins
        text: '../bower_components/requirejs-text/text',
        // dependences
        jquery: '../bower_components/jQuery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        mockjs: '../bower_components/mockjs/dist/mock',
        // app
        'app':'../app'
    },
    config: {
        text: {
            //Valid values are 'node', 'xhr', or 'rhino'
            env: 'xhr'
        }
    }
})

define(['spa'], function(SPA) {
    SPA.start({
        frame: '/app/frame/frame',
        target: '.main',
        view: '/app/frame/main'
    })
})