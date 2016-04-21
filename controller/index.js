var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var lessCompiler = require('express-less-middleware');
var less = require('less');
var ejs = require('ejs');
var ajax = require('./ajax');
var model = require('./model');

/**
 * 基础的 css 内容，这部分内容不显示在代码编辑器中
 *
 * @type {string}
 */
var baseCSS = '';

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

            // TODO: 错误处理
            var id = getArgs.id;
            var curData = model.getById(id);
            if (!curData) {
                // TODO 错误处理
                return;
            }

            var lessContent = curData.lessContent;
            less.render(lessContent, {
                paths: [path.join(__dirname)],
                compress: true
            }, function (e, output) {
                if (e) {
                    console.warn(e);
                    throw e;
                }
                var cssContent = output.css.replace(baseCSS, '');
                var middleRet = ejs.render(fs.readFileSync(path.join(__dirname, '../views/frame.ejs'), 'utf8'), {
                    cssContent: cssContent,
                    htmlContent: ''
                        + '<div class="hb-rain-container">'
                        +   '<div class="hb-rain">'
                        +       '<div class="hb-rain-content"></div>'
                        +       '<div class="hb-rain-left-wing"></div>'
                        +       '<div class="hb-rain-right-wing"></div>'
                        +   '</div>'
                        + '</div>'
                });

                var frameTmp = path.join(__dirname, '../public/frame.html');
                fs.writeFile(frameTmp, middleRet, function (err) {
                    if (err) {
                        throw err;
                    }
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    res.end(ejs.render(fs.readFileSync(path.join(__dirname, '../views/demo.ejs'), 'utf8'), {
                        frameSrc: './frame.html',
                        cssContent: cssContent,
                        htmlContent: ''
                            + '<div class="hb-rain-container">'
                            +   '<div class="hb-rain">'
                            +       '<div class="hb-rain-content"></div>'
                            +       '<div class="hb-rain-left-wing"></div>'
                            +       '<div class="hb-rain-right-wing"></div>'
                            +   '</div>'
                            + '</div>'
                    }));
                });
            });
        });
    }
};

/**
 * 编译 base.less
 */
function compileCSS() {
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
        fs.writeFile(path.join(__dirname, '../views/frame.ejs'), ret, function(err){
            if (err) {
                throw err;
            }
        });
    });
}

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

    compileCSS();

    // model.mapToCode();
};