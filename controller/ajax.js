/**
 * @file ajax 请求的模块
 * @author ielgnaw(wuji0223@gmail.com)
 */

var beautify = require('js-beautify');
var model = require('./model');
var render = require('./render');

/**
 * 格式化 html 代码的请求
 *
 * @param {Object} app express 实例
 */
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

/**
 * 格式化 css 代码的请求
 *
 * @param {Object} app express 实例
 */
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

/**
 * 格式化 html 代码和 css 代码的请求
 *
 * @param {Object} app express 实例
 */
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

/**
 * 首页请求所有 list
 *
 * @param {Object} app express 实例
 */
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

/**
 * refresh
 *
 * @param {Object} app express 实例
 */
function refresh(app) {
    var backData = {
        status: 0
    };

    app.post('/refresh', function (req, res) {
        var getArgs = req.query;
        var postArgs = req.body;
        render.renderDemo(postArgs.htmlContent, postArgs.cssContent, res);
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(JSON.stringify(backData));
    });
}

/**
 * 初始化
 *
 * @param {Object} app express 实例
 */
exports.init = function (app) {
    formatHTML(app);
    formatCSS(app);
    formatHTMLCSS(app);
    list(app);
    refresh(app);
};