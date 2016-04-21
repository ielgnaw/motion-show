/**
 * @file 后端逻辑主模块
 * @author ielgnaw(wuji0223@gmail.com)
 */

var bodyParser = require('body-parser');
var lessCompiler = require('express-less-middleware');
var ajax = require('./ajax');
var model = require('./model');
var render = require('./render');

/**
 * 路由模块
 *
 * @type {Object}
 */
var route = {
    /**
     * require.config 的路由
     *
     * @param {Object} app express 实例
     */
    requireConfig: function (app) {
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
    },

    /**
     * demo 的路由
     * 1. 生成 iframe 的 html 和 css 代码返回给 demo.html 的代码编辑器展示
     * 2. 把生成的 html 和 css 组装成一个页面作为 iframe 的 html 内容
     *
     * @param {Object} app express 实例
     */
    demo: function (app) {
        app.get('/demo', function (req, res) {
            var getArgs = req.query;
            // res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            // res.sendFile(path.resolve(__dirname, 'aaa.tpl'));
            // res.end('content');
            // res.redirect('http://baidu.com');

            // res.render('tpl.ejs', {
            //     name: '试试'
            // });

            var id = getArgs.id;
            var curData = model.getById(id);
            if (!curData) {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end('参数错误');
                return;
            }

            render.compileCSS(curData.lessContent, function (css) {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end(render.renderDemo(curData.htmlContent, css, res));
            });

        });
    }
};

/**
 * 初始化
 * 渲染页面的过程：
 * compile base.less -> render tpl.ejs -> write frame.ejs -> render frame.ejs -> write frame.html
 *
 * @param {Object} app express 实例
 */
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

    route.requireConfig(app);
    route.demo(app);

    ajax.init(app);

    render.compileBaseCSS();
};