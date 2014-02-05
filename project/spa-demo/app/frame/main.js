define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('jquery');
	return Backbone.View.extend({
		render: function(template) {
			$(this.el).empty().append($(template));
		}
	});
})