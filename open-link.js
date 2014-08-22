(function() {
var Mustache = require('mustache');
var open = require('open');
var fs = require('fs');
var tmp = require('tmp');

var htmlTmpl = '<html><body>Drag <a href="{{url}}">{{name}}</a> to bookmark toolbar</body></html>';

module.exports = function(url, name, callback) {
    var page = Mustache.render(htmlTmpl, {name: name, url: url});
    tmp.file({keep: true}, function(err, path) {
        if (err) return callback(err);
        return fs.writeFile(path, page, function() {
            open(path);
            return callback.call(this);
        });
    });
}
}).call(this);
