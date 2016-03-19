/**
 * @file 启动服务器
 * @author ielgnaw(wuji0223@gmail.com)
 */

var express = require('express');
var edp = require('edp-core');
var path = require('path');
var fs = require('fs');

var PORT = 8000;

/**
 * 机器 ip
 *
 * @inner
 * @type {string}
 */
var ip = (function () {
    var ifaces = require('os').networkInterfaces();
    var defultAddress = '127.0.0.1';
    var ip = defultAddress;

    function x(details) {
        if (ip === defultAddress && details.family === 'IPv4') {
            ip = details.address;
        }
    }

    for (var dev in ifaces) {
        ifaces[dev].forEach(x);
    }

    return ip;
})();

/**
 * 对输出命令行的字符串添加下划线
 *
 * @inner
 * @param {string} str 源字符串
 * @return {string}
 */
function underlineString(str) {
    return '\033[4m' + str + '\033[0m';
}

/**
 * 启动 socket.io 服务
 *
 * @param {http.Server} httpServer http 服务实例
 * @return {socket.io}
 */
function startWebSocketServer(httpServer) {
    console.warn('startWebSocketServer');
    var io = require('socket.io')(httpServer);

    io.on('connection', function (socket) {
        // 监听 mobile 扫码进入页面
        socket.on('mobileEnter', function (data) {
            console.warn('mobileEnter');
            // 触发 PC 页面跳转到 question.html
            socket.broadcast.emit('jump', {url: 'http://' + ip + ':' + PORT + '/question.html'});
        });

        // 监听到 PC 端扫码进入 question 页面
        socket.on('questionEnter', function (data) {
            console.warn('questionEnter');
            // 触发 mobile 页面生成答题文本框
            socket.broadcast.emit('createAnswer', data);
        });

        // 监听到 mobile 端回答问题
        socket.on('mobileAnwser', function (data) {
            console.warn('mobileAnwser');
            // 触发 mobile 页面生成答题文本框
            socket.broadcast.emit('mobileAnwserToPC', data);
        });

        // 监听到 question(pc) 发来的全对的消息
        socket.on('allRight', function () {
            console.warn('allRight');
            socket.broadcast.emit('tell2MobileAllRight');
        });



        // console.warn(socket.broadcast, 1111);
        // socket.on('disconnect', function(){
        //     console.warn('over');
        // });

        // 广播信息给除当前用户之外的用户
        // socket.broadcast.emit('user connected');
        // 广播给全体客户端
        // io.sockets.emit('all users');
    });

    return io;
}

/**
 * 启动
 *
 * @param {number} port 端口
 */
function start(port) {
    var app = express();
    app.use(express.static(__dirname + '/public'));
    var files = fs.readdirSync(__dirname);
    files.forEach(function (file) {
        var dir = path.resolve(__dirname, file);
        var indexFile = path.resolve(dir, 'index.js');
        if (fs.statSync(dir).isDirectory() && fs.existsSync(indexFile)) {
            var indexModule = require(indexFile);
            if (typeof indexModule.init === 'function') {
                indexModule.init(app);
            }
        }
    });

    var server = app.listen(port);
    // startWebSocketServer(server);

    edp.log.info('Webserver start.');
    edp.log.info('Visit ' + underlineString('http://localhost:' + port)
        + ' or ' + underlineString('http://' + ip + ':' + port));
    edp.log.info('To stop, Press Ctrl+C');
}

start(PORT);