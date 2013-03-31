define(function(require, exports) {
	var _ = require('underscore'),
		Backbone = require('backbone'),
		Mustache = require('mustache'),
		$ = require('$');
	return Backbone.View.extend({
		events: {
			'click #seach': function(e) {
				$('#back').get(0).click();
				return false;
			},
			'click #all': function(e) {
				$('#back').get(0).click();
				return false;
			}
		},
		render: function(template) {
			$(this.el).empty().append(Mustache.to_html(template, {
				state: 'Statistics'
			}));
		}
	});
})