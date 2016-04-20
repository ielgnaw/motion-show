var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var lessCompiler = require('express-less-middleware');
var less = require('less');
var ejs = require('ejs');

var ajax = require('./ajax');

var baseCSS = '';

exports.init = function (app) {

    app.use(lessCompiler());

    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: true}));
    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: true}));

    exports.routeNav(app);
    exports.routeRequireConfig(app);

    exports.routeTest(app);
    exports.routeAjaxTest(app);

    exports.routeT(app);

    ajax.init(app);

    initCSS();
};

function initCSS() {
    var lessContent = fs.readFileSync(path.join(__dirname, '../views/base.less'), 'utf8');
    less.render(lessContent, {
        paths: [path.join(__dirname)],
        compress: true
    }, function (e, output) {
        baseCSS = output.css;
        var ret = ejs.render(fs.readFileSync(path.join(__dirname, '../views/tpl.ejs'), 'utf8'), {
            baseCssContent: output.css,
            cssContent: '<%- cssContent %>',
            htmlContent: '<%- htmlContent %>'
        });
        console.warn(ret);
        var frameTpl = ['frame.ejs'].join('');
        fs.writeFile(path.join(__dirname, '../views/frame.ejs'), ret, function(err){
            if (err) {
                throw err;
            }
        });
    });
}

// TODO: 把基础的 less 编译成 css 并发送到前端，便于前端获取基础的 css 代码
exports.routeBaseCSS = function (app) {

};

exports.routeNav = function (app) {

    var navData = [
        {
            name: 'aaa',
            path: 'http://www.baidu.com'
        },
        {
            name: 'bbb',
            path: 'http://www.baidu.com'
        },
        {
            name: 'ccc',
            path: 'http://www.baidu.com'
        }
    ];

    var content = 'var NAV = ' + JSON.stringify(navData) + ';';

    app.get('/nav.js', function (req, res) {
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(content);
    });
};

exports.routeTest = function (app) {

    var content = fs.readFileSync(
        path.resolve(__dirname, './test.js'),
        'utf8'
    );
    app.get('/test.js', function (req, res) {
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(content);
    });
};

exports.routeRequireConfig = function (app) {
    var config = {
        baseUrl: './src',
        packages: [
            {
                name: 'etpl',
                location: '../dep/etpl'
            },
            {
                name: 'jquery',
                location: '../dep/jquery/1.9.1/src',
                main: 'jquery.min'
            },
            {
                'name': 'est',
                'location': '../dep/est/2.0.4/src',
                'main': 'lib/index'
            }
        ]
    };
    var configStr = 'require.config(' + JSON.stringify(config) + ');';
    app.get('/require.config.js', function (req, res) {
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(configStr);
    });
};


exports.routeAjaxTest = function (app) {

    var list = (function () {
        var ret = [];
        for (var i = 0; i < 7; i++) {
            ret.push({
                unitId: '2092524363',
                unitName: '北京',
                bid: '1.00',
                pauseStatus: '0',
                mapzone: '[]',
                ideaIds: '',
                userId: '911',
                nestId: '5201',
                planId: '285697',
                opUserId: '0',
                isDelete: '0',
                addTime: '2014-11-11 17:50:42',
                modTime: '2014-11-11 17:50:42'
            });
        }
        return ret;
    })();

    var ajaxData = {
        'status': 0,
        'data': {
            'list': list
        }
    };

    var content = JSON.stringify(ajaxData);

    app.post('/testAjax', function (req, res) {
        var getArgs = req.query;
        var postArgs = req.body;
        console.warn(getArgs);
        console.warn(postArgs);
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.end(content);
    });
};

exports.routeT = function (app) {
    // 1. 生成 iframe 的 html 和 css 代码返回给 demo.html 的代码编辑器展示
    // 2. 把生成的 html 和 css 组装成一个页面作为 iframe 的 html 内容
    app.get('/demo', function (req, res) {
        var getArgs = req.query;
        console.warn(getArgs);
        // res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        // res.sendFile(path.resolve(__dirname, 'aaa.tpl'));
        // res.end('content');
        // res.redirect('http://baidu.com');

        // res.render('tpl.ejs', {
        //     name: '试试'
        // });

        var lessContent = fs.readFileSync(path.join(__dirname, '../views/11.less'), 'utf8');
        less.render(lessContent, {
            paths: [path.join(__dirname)],
            compress: true
        }, function (e, output) {
            var middleRet = ejs.render(fs.readFileSync(path.join(__dirname, '../views/frame.ejs'), 'utf8'), {
                cssContent: output.css.replace(baseCSS, ''),
                htmlContent: ''
                    + '<div class="hb-rain-container">'
                    +   '<div class="hb-rain">'
                    +       '<div class="hb-rain-content"></div>'
                    +       '<div class="hb-rain-left-wing"></div>'
                    +       '<div class="hb-rain-right-wing"></div>'
                    +   '</div>'
                    + '</div>'
            });
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.end(middleRet);
        });
    });
};
