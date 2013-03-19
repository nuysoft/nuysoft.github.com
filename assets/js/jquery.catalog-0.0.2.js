function htree(headers) {
    var re = [],
        id = 0;

    String.prototype.format = function() {
        var args = arguments;
        if (args.length == 0) return this;
        return this.replace(/{(\d+)?}/g, function($0, $1) {
            return args[parseInt($1)] + '';
        });
    };

    function closest(level, index) {
        for (var i = index - 1; i >= 0; i--) {
            if (re[i] && re[i].level <= level) return re[i].id;
        }
        return -1;
    }

    function _parseChildren(id) {
        var tree;
        var pid = 'p' + id;
        if (pidMap[pid]) {
            tree = pidMap[pid];
            for (var i = 0; tree && i < tree.length; i++) {
                var tmp = _parseChildren(tree[i].id); // 
                if (tmp && tmp.length > 0) tree[i].children = tmp; // 
            }
        }
        return tree && tree.length > 0 && tree || null;
    }

    function _genHTML(tree) {
        if (!tree || !tree.length) return '';
        var html = '<ul>';
        for (var i = 0, len = tree.length; i < len; i++) {
            html += '<li>{0} {1} {2}</li>'.format(tree[i].el.text(), tree[i].id, tree[i].parent);
            if (tree[i].children) html += _genHTML(tree[i].children);
        }
        html += '</ul>';
        return html;
    }

    // 构造父子关系
    headers.each(function(index, elem) {
        var h = $(elem),
            level = parseInt(elem.nodeName.match(/h(\d)/i)[1]),
            item = {
                id: ++id,
                el: h,
                level: level,
                prefix: '',
                parent: closest(level - 1, index)
            };
        re.push(item);
    });
    // 构造 Map，获取同级节点
    var idMap = {}, pidMap = {}, id, pid;
    for (var i = 0, len = re.length; i < len; i++) {
        id = re[i].id;
        pid = 'p' + re[i].parent;
        idMap[id] = re[i];
        (pidMap[pid] = pidMap[pid] || []).push(re[i]);
    }
    // 解析为树结构
    var tree = _parseChildren(-1); // 
    // console.dir(tree);
    // 生成测试 HTML
    var html = _genHTML(tree);
    // console.log(html);
    // $('body').append(html);

    return tree;
}

function hhtml(tree, level) {
    if (!tree || !tree.length) return '';
    var html = '<ul>',
        text;
    for (var i = 0, len = tree.length; i < len; i++) {
        text = tree[i].el.text();
        text = '<a href="#' + text + '">' + text + '</a>';
        if (tree[i].level <= level) html += '<li>' + text + '</li>';
        if (level) {
            if (tree[i].level < level && tree[i].children) html += hhtml(tree[i].children, level);
        } else {
            if (tree[i].children) html += hhtml(tree[i].children, level);
        }
    }
    html += '</ul>';
    return html;
}

$(function() {
    // return;

    var headers = $(':header').not('h1');

    // 自动加序号 <hr>
    headers.filter('h2').each(function(index, elem) {
        $(elem).prepend((index + 1) + '. ');
    });

    var tree = htree(headers);
    var html = hhtml(tree, 2);

    if (html) {
        // 插入目录
        $('<div class="span2" style="margin-left: 0px; "></div>').empty() //
        .append('<h2>目录<h2>') //
        .append(html) //
        .insertAfter('h1'); //
        // 栅格化
        $('div.container').children().not('h1, .span2')
            .wrapAll('<div class="span10"></div>');
    }

    // 插入锚点
    headers.each(function(index, elem) {
        $(elem).before($('<a>').attr('name', $(elem).text()));
    });
    // 自动加 <hr>
    headers.filter('h2').after('<hr>');
    // h1 加 <hr>
    $('h1').after('<hr>');
    // 标题
    $('title').text($('h1').eq(0).text());
    // 回到顶部
    headers.append('<small><a href="#">⬆</a></small>');

});