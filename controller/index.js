var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

exports.init = function (app) {

    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    exports.routeNav(app);
    exports.routeRequireConfig(app);

    exports.routeTest(app);
    exports.routeAjaxTest(app);
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
