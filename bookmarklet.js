// Wrapper for https://github.com/mrcoles/bookmarklet
(function() {
var bookmarklet = require('bookmarklet');

module.exports = function (input, name) {
    var data = bookmarklet.parseFile(input);
    if (data.errors) {
        throw data.errors.join('\n');
    }
    return bookmarklet.convert(data.code, data.options);
};
}).call(this);
