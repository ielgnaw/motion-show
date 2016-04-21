/**
 * @file 组装 data
 * @author ielgnaw(wuji0223@gmail.com)
 */

var fs = require('fs');
var path = require('path');

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
                id: config.id || generateUUID(),
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
