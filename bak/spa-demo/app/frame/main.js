define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('$');
	return Backbone.View.extend({
		render: function(template) {
			$(this.el).empty().append($(template));
		}
	});
})