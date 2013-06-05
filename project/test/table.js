function table(rs, options) {
  // heads
  var heads = {}
  for (var i = 0; i < rs.length; i++) {
    for (var key in rs[i]) {
      heads[key] = true;
    }
  }

  if (options.heads) heads = options.heads(heads)

  // element
  var table = document.createElement('table'),
    thead = document.createElement('thead'),
    tbody = document.createElement('tbody'),
    tr = document.createElement('tr'),
    th = document.createElement('th'),
    td = document.createElement('td');

  table.appendChild(thead)
  table.appendChild(tbody)

  // options.order
  if (options.order) {
    var column = th.cloneNode()
    column.innerHTML = '#'
    thead.appendChild(column)
  }

  // thead
  for (var key in heads) {
    var column = th.cloneNode()
    column.innerHTML = key
    thead.appendChild(column)
  }

  // tbody
  for (var i = 0; i < rs.length; i++) {
    var row = tr.cloneNode()
    if (options.order) {
      var column = td.cloneNode()
      column.innerHTML = i + 1
      row.appendChild(column)
    }
    for (var key in heads) {
      var column = td.cloneNode()
      column.innerHTML = rs[i][key]
      row.appendChild(column)

      if (options.td) options.td(column, rs[i][key] + '')
    }
    tbody.appendChild(row)
  }

  if (options.table) options.table(table)

  document.getElementsByTagName('body')[0].appendChild(table)
}


/*
 */
exports = {};
exports.pt = exports.printTable = function(rs) {
  if (!rs || !rs.length) return;
  var style = genStyle(rs);
  var devider = genDevider(style);
  var th = genTh(style);
  var trs = genTr(rs, style);

  // console.log(style);

  console.log(devider);
  console.log(th);
  console.log(devider);
  for (var tr in trs) {
    console.log(trs[tr]);
  }
  console.log(devider);
  return exports;
};

function getLen(o) {
  var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
  o = '' + o;
  var re = 0;
  for (var i = 0; i < o.length; i++) {
    if (o[i].match(rcjk)) re += 2;
    else re += 1;
  }
  return re;
}

function genStyle(rs) {
  var style = {};
  // init
  for (var r in rs) {
    for (var key in rs[r]) {
      style[key] = key.length;
    }
  }
  // calculate max width of a colume
  var width = 0;
  for (var key in style) {
    for (var r in rs) {
      width = getLen(rs[r][key]);
      style[key] = width > style[key] ? width : style[key];
    }
  }
  return style;
}

function genDevider(style) {
  var devider = '+';
  for (var key in style) {
    for (var i = 0; i < style[key] + 2; i++) {
      devider += '-';
    }
    devider += '+';
  }
  return devider;
}

function genTh(style) {
  var header = '|';
  for (var key in style) {
    header += ' ';
    header += key;
    for (var i = 0; i < style[key] + 2 - 1 - key.length; i++) {
      header += ' ';
    }
    header += '|';
  }
  return header;
}

function genTr(rs, style) {
  var trs = [];
  var tr;
  for (var r in rs) {
    tr = '|';
    for (var key in style) {
      tr += ' ';
      tr += rs[r][key];
      for (var i = 0; i < style[key] + 2 - 1 - getLen(rs[r][key]); i++) {
        tr += ' ';
      }
      tr += '|';
    }
    trs.push(tr);
  }
  return trs;
}


var data = [{
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  f: false
}, {
  a: 4,
  b: 5,
  c: 6,
  e: true,
  g: '汉字'
}]

table(data, {
  order: true,
  heads: function(heads) {
    var keys = []
    for (var key in heads) keys.push(key)
    keys.sort()
    heads = {}
    for (var i = 0; i < keys.length; i++) heads[keys[i]] = true
    return heads

  },
  table: function(table) {
    table.setAttribute('border', 1)
  },
  td: function(td, html) {
    if (html === 'true') td.style.backgroundColor = 'green'
    if (html === 'false') td.style.backgroundColor = 'red'
  }
})

exports.pt(data);