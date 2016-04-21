/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

var path = require('path');
var fs = require('fs');

module.exports = {
    id: '1',
    title: '小翅膀',
    img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
    link: '/demo',
    desc: '',
    htmlContent: fs.readFileSync(path.join(__dirname, '/1.html'), 'utf8'),
    lessContent: fs.readFileSync(path.join(__dirname, '/1.less'), 'utf8')
};