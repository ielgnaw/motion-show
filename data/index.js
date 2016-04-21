
var fs = require('fs');
var path = require('path');

module.exports = function () {
    var ret = [];
    var folder = path.join(__dirname, '../data/');
    var files = fs.readdirSync(folder);
    files.forEach(function (file) {
        var filePath = path.resolve(folder, file);
        if (fs.statSync(filePath).isDirectory()) {
            var config = JSON.parse(fs.readFileSync(path.join(filePath, 'config.json')), 'utf8');

            var htmlContent = '';
            var lessContent = '';
            var _files = fs.readdirSync(filePath);
            _files.forEach(function (_file) {
                var _filePath = path.resolve(filePath, _file);
                if (path.extname(_filePath) === '.html') {
                    htmlContent = fs.readFileSync(_filePath, 'utf8');
                }
                if (path.extname(_filePath) === '.less') {
                    lessContent = fs.readFileSync(_filePath, 'utf8');
                }
            });

            ret.push({
                id: config.id,
                title: config.title,
                img: config.img,
                desc: config.desc,
                link: '/demo',
                htmlContent: htmlContent,
                lessContent: lessContent
            });
        }
    });

    return ret;
};

// module.exports = {
//     id: '1',
//     title: '小翅膀',
//     img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
//     link: '/demo',
//     desc: '',
//     htmlContent: fs.readFileSync(path.join(__dirname, '/1.html'), 'utf8'),
//     lessContent: fs.readFileSync(path.join(__dirname, '/1.less'), 'utf8')
// };