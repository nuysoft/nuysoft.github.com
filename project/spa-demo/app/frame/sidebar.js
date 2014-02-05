define(function(require, exports) {
	var Backbone = require('backbone'),
		Handlebars = require('handlebars'),
		$ = require('jquery');
	return Backbone.View.extend({
		render: function(template) {
			$(this.el).empty().append(
				Handlebars.compile(template)({})
			);
		}
	});
})