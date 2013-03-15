define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Mustache = require('mustache'),
		$ = require('$');
	return Backbone.View.extend({
		events: {
			'click #create': function(e) {}
		},
		render: function(template) {
			$(this.el).empty().append(Mustache.to_html(template, {

			}));
		}
	});
})