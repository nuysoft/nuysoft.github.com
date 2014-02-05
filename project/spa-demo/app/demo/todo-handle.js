define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Handlebars = require('handlebars'),
		$ = require('jquery');
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
			$(this.el).empty().append(
				Handlebars.compile(template)({
					state: this.options.id ? 'Edit' : 'Create'
				})
			)
		}
	});
})