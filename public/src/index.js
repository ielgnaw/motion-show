/**
 * @file 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var $ = require('jquery');

    var contentNode = document.querySelector('#content');
    var loadingNode = document.querySelector('#loading');

    var startPos = 0;
    var endPos = 0;

    var projects = [];

    function render() {
        var str = '';

        if (endPos !== projects.length) {
            endPos += 12;
        }
        if (endPos > projects.length) {
            endPos = projects.length;
        }
        if (startPos === endPos) {
            return;
        }
        if (startPos !== 0) {
            str = '';
        }

        for (var i = startPos; i < endPos; i++) {
            var project = projects[i];
            var title = (project.title ? project.title : '这是标题');
            str += ''
                + '<a class="item thumbnail" href="'
                +   project.link
                + '?id='
                +   project.id
                + '" style="background-image: url('
                +   project.img
                + ');" target="_blank">'
                +   '<div class="desc">'
                +       title
                +   '</div>'
                + '</a>';
        }

        startPos = endPos;
        contentNode.innerHTML += str;

        if (endPos >= projects.length) {
            loadingNode.style.display = 'none';
        }
    }

    var exports = {};

    exports.init = function () {
        $.ajax({
            method: 'get',
            url: '/list',
            dataType: 'json'
        }).then(function (data) {
            projects = data.data.list;
            loadingNode.addEventListener(globalData.touchStartEvent, render);
            render();
        });
    };

    return exports;

});
