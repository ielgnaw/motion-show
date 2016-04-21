
var beautify = require('js-beautify');

var model = require('./model');

function formatHTML(app) {
    var backData = {
        status: 0,
        data: {}
    };

    app.post('/format/html', function (req, res) {
        var getArgs = req.query;
        var postArgs = req.body;
        var htmlContent = postArgs.content;
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        backData.data.content = beautify.html_beautify(htmlContent, {indent_size: 4});
        res.end(JSON.stringify(backData));
    });
}

function formatCSS(app) {
    var backData = {
        status: 0,
        data: {}
    };

    app.post('/format/css', function (req, res) {
        var getArgs = req.query;
        var postArgs = req.body;
        var htmlContent = postArgs.content;
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        backData.data.content = beautify.css_beautify(htmlContent, {indent_size: 4});
        res.end(JSON.stringify(backData));
    });
}

function formatHTMLCSS(app) {
    var backData = {
        status: 0,
        data: {}
    };

    app.post('/format/htmlcss', function (req, res) {
        var getArgs = req.query;
        var postArgs = req.body;

        var htmlContent = '';
        var cssContent = '';

        try {
            htmlContent = beautify.html_beautify(postArgs.htmlContent, {indent_size: 4});
        }
        catch (e) {
            htmlContent = '解析 HTML 代码错误';
        }

        try {
            cssContent = beautify.css_beautify(postArgs.cssContent, {indent_size: 4});
        }
        catch (e) {
            cssContent = '解析 CSS 代码错误';
        }
        backData.data.htmlContent = htmlContent;
        backData.data.cssContent = cssContent;

        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(JSON.stringify(backData));
    });
}

function list(app) {
    var backData = {
        status: 0,
        data: {
            list: []
        }
    };

    app.get('/list', function (req, res) {
        backData.data.list = model.generateList();
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(JSON.stringify(backData));
    });
}

exports.init = function (app) {
    formatHTML(app);
    formatCSS(app);
    formatHTMLCSS(app);
    list(app);
};