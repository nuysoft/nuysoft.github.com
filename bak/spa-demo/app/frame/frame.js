define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('$'),
		Mustache = require('mustache');
	return Backbone.View.extend({
		render: function(template) {
			var data = {};
			this.setElement($(Mustache.to_html(template, data)));
			this.$el.appendTo(document.body);
		}
	});
})