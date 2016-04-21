/**
 * @file 数据模块
 * @author ielgnaw(wuji0223@gmail.com)
 */

var path = require('path');
var fs = require('fs');

var list = [];

/**
 * 首页请求 /list 后会生成所有的数据
 * 并把每个实例 demo 的 html, css 代码挂载到 list 的 item 中
 *
 * @return {Array.<Object>} 所有数据
 */
exports.generateList = function () {
    if (!list.length) {
        list = require(path.join(__dirname, '../data/'))();
    }
    return list;
};

/**
 * 根据 id 获取某个具体的 demo
 *
 * @param {string} id id
 *
 * @return {Object} 具体的 demo 数据
 */
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