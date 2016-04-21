/**
 * @file 渲染的逻辑
 * compile base.less -> render tpl.ejs -> write frame.ejs -> render frame.ejs -> write frame.html
 * @author ielgnaw(wuji0223@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var less = require('less');
var ejs = require('ejs');

/**
 * 基础的 css 内容，这部分内容不显示在代码编辑器中
 *
 * @type {string}
 */
var baseCSS = '';

/**
 * 编译 base.less
 */
exports.compileBaseCSS = function () {
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
};

/**
 * 编译每个 demo 所需要的业务 less
 *
 * @return {string} 编译好的 css 字符串
 * @return {Function} 回调函数
 */
exports.compileCSS = function (lessContent, callback) {
    less.render(lessContent, {
        paths: [path.join(__dirname)],
        compress: true
    }, function (e, output) {
        if (e) {
            console.warn(e);
            throw e;
        }
        callback(output.css);
    });
};

/**
 * 渲染 demo 页面里的 iframe
 * 这个方法提取出来是为了页面点击刷新按钮时复用
 *
 * @param {string} htmlContent html 内容
 * @param {string} cssContent css 内容
 * @param {Object} res 响应对象
 */
exports.renderDemo = function (htmlContent, cssContent, res) {
    var css = cssContent.replace(baseCSS, '');
    var middleRet = ejs.render(fs.readFileSync(path.join(__dirname, '../views/frame.ejs'), 'utf8'), {
        cssContent: css,
        htmlContent: htmlContent
    });

    var ret = '';

    try {
        var frameTmp = path.join(__dirname, '../public/frame.html');
        fs.writeFileSync(frameTmp, middleRet);
        ret = ejs.render(fs.readFileSync(path.join(__dirname, '../views/demo.ejs'), 'utf8'), {
            frameSrc: './frame.html',
            cssContent: css,
            htmlContent: htmlContent
        });
    }
    catch (e) {
        ret = '后台错误';
    }

    return ret;
};
