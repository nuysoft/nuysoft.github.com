$(function() {
    // return;
    
    var header = $(':header').not('h1');

    var prev, html = '<ol>',
        stack = 0;
    header.each(function(index, elem) {

        var h = $(elem),
            text = h.text(),
            level = parseInt(elem.nodeName.match(/h(\d)/i)[1]),
            anchor = $('<a>').attr('name', text);

        h.before(anchor);
        text = '<a href="#' + text + '">' + text + '</a>';

        prev = prev || level;
        // console.log('prev', prev, 'level', level);
        if(index == 0) html += '<li>' + text;
        else if(level < prev) {
            for(var i = 0; i < prev - level; i++) html += '</ul>'
            html += '<li>' + text; //   
        } else if(level == prev) html += '</li><li>' + text;
        else if(level > prev) html += '<ul><li>' + text;

        prev = level;
    });
    html += '</li></ol>'

    // 插入目录
    $('<div class="span2" style="margin-left: 0px; "></div>').empty() //
    .append('<h2>目录<h2>') //
    .append(html) //
    // .insertAfter('h1'); //
    // 自动加序号
    header.filter('h2').each(function(index, elem) {
        $(elem).prepend((index + 1) + '. ') //
        .filter(':gt(1)').before('<hr>');
    });
    // 回到顶部
    header.append('<small><a href="#">⬆</a></small>');
    // 栅格化
    $('div.container').children().not('h1, .span2').wrapAll('<div class="span10"></div>');
    // h1
    $('h1').after('<hr>');

});