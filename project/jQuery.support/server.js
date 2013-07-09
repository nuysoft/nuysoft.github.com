var http = require("http"),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    dataUtil = require('date-utils'),
    colors = require('colors');

// 切换到当前目录
process.chdir(path.dirname(process.argv[1]));

function write(file, content) {

}

function read(file) {
    var content = fs.readFileSync(file, 'utf8');
    var fn = new Function('return ' + content);
    return fn();
}

var db = 'records.db',
    records = {};

fs.exists(db, function(exists) {
    if (!exists) return;
    fs.readFile(db, function(error, content) {
        if (error) return
        records = JSON.parse(content);
    });
});

function onRequest(request, response) {
    // parts: search query pathname path href
    var parts = url.parse(decodeURI(request.url), true),
        pathname = parts.pathname,
        host = request.headers['host'];

    if (pathname === '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }

    // time method host port url
    console.log((new Date()).toFormat('HH:MI:SS').grey, request.method.magenta, host.yellow, request.url.inverse);
    console.log('parts', parts);
    response.setHeader('Access-Control-Allow-Origin', '*')

    // /support
    if (pathname === '/support') {
        var userAgent = parts.query.userAgent,
            version = parts.query.version,
            id = version + ' ' + userAgent;
        delete parts.query.userAgent
        delete parts.query.version

        records[version] = records[version] || {}
        records[version][userAgent] = parts.query

        fs.writeFile(db, JSON.stringify(records), 'utf8');

        response.writeHead(200, {
            'Content-Type': exports.types['jpg']
        })
        response.end(JSON.stringify(records), 'utf-8')
        return
    }

    // list
    if (pathname === '/list') {
        response.writeHead(200, {
            'Content-Type': 'text/javascript'
        })
        response.end(JSON.stringify(records), 'utf-8')
        return
    }
    // 

    // file
    // pathname = 'report.html';
    pathname = pathname.substr(1)
    fs.exists(pathname, function(exists) {
        if (!exists) {
            response.writeHead(404);
            response.end();
            return;
        }

        fs.readFile(pathname, function(error, content) {
            if (error) {
                response.writeHead(500);
                response.end();
                return;
            }

            response.writeHead(200, {
                'Content-Type': exports.types[path.extname(pathname).slice(1)] || 'text/plain'
            });
            response.end(content, 'utf-8');
        });
    });
}

exports.start = function() {
    http.createServer(function(request, response) {
        try {
            onRequest(request, response)
        } catch (error) {
            console.error(error);
        }
    }).listen(4242);
    console.log("Server has started.");
};
exports.start()
/*
    [测试](http://localhost:4242/support.html)
    [报表](http://localhost:4242/report.html)
    [结果](http://localhost:4242/list)
*/

exports.types = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};