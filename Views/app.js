/**
 * Created by synerzip on 16/3/14.
 */
define({
    require: {
        paths:  { backbone: '../app/bower_components/backbone/backbone' },
        shim:   { backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] } }
    }
});