define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('$'),
		Mustache = require('mustache');
	return Backbone.View.extend({
		events: {
			'click #create': function(e) {
				this.options.message({
					name: $('#name').val(),
					price: $('#price').val()
				});
				return false;
			},
			'click #cancel': function(e) {
				
			}
		},
		render: function(template) {
			var html = Mustache.to_html(template, this.options)
			$(this.el).empty().append($(html));
		}
	});
})