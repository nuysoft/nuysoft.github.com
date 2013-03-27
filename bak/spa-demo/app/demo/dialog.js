define(function(require, exports) {
    var Backbone = require('backbone'),
        $ = require('$'),
        spa = require('/spa-demo/gallery/backbone-spa/0.1/backbone-spa');
    return Backbone.View.extend({
        events: {
            'click .close, .cancel': function(e) {
                var self = this;
                this.$el.animate({
                    left: this.$el.offset().left + 500,
                    opacity: 0
                }, 'fast', function() {
                    self.remove();
                });
            }
        },
        render: function(template) {
            var self = this;

            this.$el //
            .addClass('dialog table-bordered') //
            .html(template).css('opacity', 0).appendTo('body') //
            .offset({
                left: ($(window).width() - this.$el.width()) / 2,
                top: ($(window).height() - this.$el.height()) / 2,
            });

            if(this.options.closable !== false) $(document.body).on('keydown.dialog', function(e) {
                e.which === 27 && self.$el.find('.close').click();
                $(this).off('keydown.dialog');
            });

            var title = this.$el.find('.title');
            this.options.title ? title.html(this.options.title) : title.remove();

            var content = this.$el.find('.content');
            if(this.options.view) {
                spa.mount(this.options.view, this.options.viewOptions, content, function() {
                    self.resize();
                });
            } else {
                content.html(this.options.content);
            }

            // animation
            var offset = this.$el.offset();
            this.$el.offset({
                left: offset.left + 500,
                opacity: 0
            });
            this.$el.animate({
                left: offset.left,
                opacity: 1
            }, 'fast');
        },
        resize: function() {
            this.$el.offset({
                left: ($(window).width() - this.$el.width()) / 2,
                top: ($(window).height() - this.$el.height()) / 2,
            });
        }
    });
})