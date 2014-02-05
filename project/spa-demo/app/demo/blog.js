define(function(require, exports) {
	var Backbone = require('backbone'),
		$ = require('jquery');
	return Backbone.View.extend({
		events: {
			'click #create': function(e) {
				seajs.use(['/app/dialog', '/app/dialog.html'], function(Dialog, template) {
					var d = new Dialog({
						title: 'Create Plan',
						view: '/app/handle',
						viewOptions: {
							message: function(data) {
								console.log(data);
							},
							name: Math.random(),
							price: Math.random()
						}
					});
					d.render(template);
				});
			}
		},
		render: function(template) {
			$(this.el).empty().append(
				$(template)
			)
		}
	});
})