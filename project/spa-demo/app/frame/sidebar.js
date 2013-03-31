define(function(require, exports) {
    var Backbone = require('backbone'),
        Mustache = require('mustache'),
        $ = require('$');
    return Backbone.View.extend({
        render: function(template) {
            $(this.el).empty().append(Mustache.to_html(template, {}));
        }
    });
})