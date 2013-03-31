define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Mustache = require('mustache'),
		$ = require('$');
	return Backbone.View.extend({
		events: {
			'click #submit': function(e) {
				$('#back')[0].click();
				return false;
			},
			'click #cancel': function(e) {
				$('#back')[0].click();
				return false;
			}
		},
		render: function(template) {
			$(this.el).empty().append(Mustache.to_html(template, {
				state: this.options.id ? 'Edit' : 'Create'
			}));
		}
	});
})