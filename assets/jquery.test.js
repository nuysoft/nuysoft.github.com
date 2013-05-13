$(function() {
    var img, server = 'http://nuyproxy.appspot.com/log?action=insert',
        Test = {
            send: function(obj, debug) {
                if (!img) {
                    img = new Image()
                    img.onerror = function(e) {
                        img = null
                        img = new Image()
                    }
                }
                if (debug) console.log($.param(obj))
                img.src = server + '&' + $.param(obj)
            }
        };

    // support
    var support = $.extend({}, $.support)
    Test.send($.extend(support, {
        lib: 'jquery',
        version: $.fn.jquery,
        type: 'support',
        userAgent: navigator.userAgent
    }), false)
})