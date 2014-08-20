var url = 'http://localhost:8080/test.js';
var Mustache = require('mustache');
var scriptTmpl = '\
var jsCode = document.createElement("script");\
    jsCode.setAttribute("src", "{{{url}}}");\
  document.body.appendChild(jsCode);\
';

console.log(Mustache.render(scriptTmpl, {url: process.argv[2]}));
