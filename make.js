var bookmarklet = require('bookmarklet');
var Mustache = require('mustache');
var open = require('open');
var fs = require('fs');

var htmlTmpl = '<html><body>Drag <a href="{{url}}">{{name}}</a> to bookmark toolbar</body></html>';

function die(msg) {
    msg && util.puts('[ERROR] bookmarklet: ' + msg);
    process.exit(1);
}

function createBookmarklet(input) {
    var data = bookmarklet.parseFile(input);

    if (data.errors) {
        die(data.errors.join('\n'));
    }

    var url = bookmarklet.convert(data.code, data.options);

    var page = Mustache.render(htmlTmpl, {name: 'bookmarklet', url: url});

    fs.writeFile('/tmp/index.html', page, function() {
        open('/tmp/index.html');
    });

}

process.stdin.resume();
process.stdin.setEncoding('utf8');

var buffer = '';
process.stdin.on('data', function(data) {
    buffer += data;
});

process.stdin.on('end', function() {
    createBookmarklet(buffer);
});
