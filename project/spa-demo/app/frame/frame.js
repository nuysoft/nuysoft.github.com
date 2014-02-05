define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('jquery'),
		Handlebars = require('handlebars');
	return Backbone.View.extend({
		render: function(template) {
			var data = {};
			this.setElement(
				$(
					Handlebars.compile(template)(data)
				)
			);
			this.$el.appendTo(document.body);
		}
	});
})