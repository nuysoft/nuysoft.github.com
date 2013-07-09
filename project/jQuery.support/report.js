String.prototype.format = function() {
    var args = arguments;
    if (args.length == 0) return this;
    return this.replace(/{(\d+)?}/g, function($0, $1) {
        return args[parseInt($1)] + '';
    });
};

function nav() {
    var h1s = $('h1').each(function(i, h1) {
        var $el = $(this);
        $el.before('<a name="{0}"></a>'.format($.trim($el.text())));
        $('#nav').append('<li><a href="#{0}">{0}</a></li>'.format($.trim($el.text())));
    });

    var btns = $('#nav > a');
    $(window).on('scroll', function(e) {
        var top = $(window).scrollTop();

        for (var i = 0; i < h1s.length; i++) {
            if (i == h1s.length - 1) return btns.removeClass('btn-primary').eq(-1).addClass('btn-primary');
            if ((h1s.eq(i).offset().top + h1s.eq(i).height()) > top) return btns.removeClass('btn-primary').eq(i).addClass('btn-primary');
        }
    });
}

function uaMatch(userAgent) {
    var re = $.uaMatch(userAgent),
        rchrome = / Chrome\/([\d.]+) /i,
        rsafari = / Version\/([\d.]+) /,
        rfirefox = / Firefox\/([\d.]+)/,
        match;
    if (re.browser === 'webkit') {
        if (match = rchrome.exec(userAgent)) {
            re.browser = 'Chrome'
            re.version = match[1]
        }
        if (match = rsafari.exec(userAgent)) {
            re.browser = 'Safari'
            re.version = match[1]
        }
    }
    if (re.browser === 'mozilla') {
        if (match = rfirefox.exec(userAgent)) {
            re.browser = 'Firefox'
            re.version = match[1]
        }
    }

    if (re.browser == 'msie') re.browser = 'IE'
    if (re.browser == 'mozilla') re.browser = 'Firefox'
    if (re.browser == 'opera') re.browser = 'Opera'
    re.orig = userAgent

    return re;
}

function compareVersion(a, b) {
    if (a.indexOf('.') != -1 || b.indexOf('.') != -1) {
        var as = a.split('.'),
            bs = b.split('.'),
            i;
        // as.length >= bs.length
        for (i = 0; i < as.length; i++) {
            if (as[i] != bs[i]) {
                if (bs[i]) return parseInt(as[i], 10) > parseInt(bs[i], 10) ? 1 : -1
                else return 1
            }
        }
        // as.length < bs.length
        if (as.length < bs.length) return -1
        return 0
    }
}

function table(uas, tcMap, data) {
    var table = $('<table>').addClass('table table-bordered'),
        thead = $('<thead>').appendTo(table)
        tbody = $('<tbody>').appendTo(table),
        tr = $('<tr>');

    // thead
    var ths = tr.clone().appendTo(thead)
        .append($('<th>#</th>').css('width', 25))
        .append($('<th>support</th>').css('width', 250));
    _.each(uas, function(ua, index) {
        $('<th>').html(ua.browser + '<br>' + ua.version)
            .css('width', 100)
            .appendTo(ths);
    })

    // tbody
    var count = 1;
    _.each(tcMap, function(tccount, tc) {
        var row = tr.clone().appendTo(tbody)
            .append('<td>' + (count++) + '</td>')
            .append('<td>' + tc + '</td>')

        _.each(uas, function(ua, index) {
            var result = data[ua.orig]
            if (tc in result) {
                $('<td>').text(result[tc])
                    .addClass(result[tc] === 'true' && 'alert-success' || result[tc] === 'false' && 'alert-error' || '')
                    .appendTo(row)
            } else {
                $('<td>').text('-')
                    .appendTo(row)
            }
        })
    })

    return table
}

function render(data) {
    var uas = _.map(data, function(result, userAgent) {
        return uaMatch(userAgent)
    }).sort(function(a, b) {
        if (a.browser != b.browser) return a.browser > b.browser ? 1 : -1
        else return compareVersion(a.version, b.version)
    })
    for (var i = 1; i < uas.length; i++) {
        if (uas[i].browser === uas[i - 1].browser && uas[i].version === uas[i - 1].version) uas.splice(i--, 1)
    }


    var tcMap = {}
    _.each(data, function(result, userAgent) {
        _.each(result, function(value, tc, count) {
            count = tcMap[tc] || 0
            tcMap[tc] = ++count
        })
    })

    return table(uas, tcMap, data)
}

function handle(data, textStatus, jqXHR) {
    var versions = _.keys(data).sort(compareVersion)
    window.console && console.info(versions);
    _.each(versions, function(v, index) {
        $('#result')
            .append('<h1>jQuery ' + v + '</h1>')
            .append(render(data[v]))
    })
    nav()
}

function local() {
    $.ajax({
        url: 'records.db',
        dataType: 'json'
    }).then(handle);
}

$(function() {
    $.ajax({
        url: '/list',
        dataType: 'json'
    }).then(handle, local);
});