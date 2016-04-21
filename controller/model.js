/**
 * @file 数据
 * @author ielgnaw(wuji0223@gmail.com)
 */

var path = require('path');
var fs = require('fs');

/**
 * create uuid
 *
 * @return {string} uuid
 */
function generateUUID() {
    var d = new Date().getTime();
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'yxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ( r & 0x3 | 0x8)).toString(16);
    });
}

// var list = [
//     {
//         id: generateUUID(),
//         title: '小翅膀',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     },
//     {
//         id: generateUUID(),
//         title: '',
//         img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//         link: '/demo',
//         desc: ''
//     }
// ];

// /**
//  * 把 list 中每个元素与它对应的 html, css 代码映射起来
//  */
// exports.mapToCode = function () {
//     var copy = list.concat();
//     var i = -1;
//     var len = copy.length;
//     // console.warn(path.join(__dirname, '../data/1.js'));
//     // console.warn(require('../data/1'));
//     while (++i < len) {
//         // console.warn(require('../data/' + (i + 1)));
//         // console.warn(i, copy[i]);
//     }
// };

var list = [];

exports.generateList = function () {
    var folder = path.join(__dirname, '../data/');
    var files = fs.readdirSync(folder);
    files.forEach(function (file) {
        var dir = path.resolve(folder, file);
        var indexFile = path.resolve(dir, 'index.js');
        list.push(require(indexFile));
    });
    return list;
};

exports.getById = function (id) {
    id = String(id);
    var ret = null;
    var i = -1;
    var len = list.length;
    while (++i < len) {
        if (id === list[i].id) {
            ret = list[i];
            break;
        }
    }
    return ret;
};