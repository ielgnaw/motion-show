/**
 * @file 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var projects = [
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            // link: '/demo.html?name=hb-rain',
            link: '/demo',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/demo.html',
            desc: ''
        }
    ];

    var contentNode = document.querySelector('#content');
    var loadingNode = document.querySelector('#loading');

    var startPos = 0;
    var endPos = 0;

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
            var title = (title ? title : '这是标题');
            str += ''
                + '<div class="game">'
                +   '<div class="game-logo">'
                +       '<a href="' + project.link + '" target="_blank">'
                +           '<img src="' + project.img + '">'
                +       '</a>'
                +   '</div>'
                +   '<div class="game-info">'
                +       '<p class="title" title="' + title + '">'
                +           title
                +       '</p>'
                +       '<p class="desc">'
                +           (project.desc ? project.desc : '这是描述')
                +       '</p>'
                +       '<footer>'
                +           '<a href="' + project.link + '" target="_blank" class="btn-play">'
                +               '查看示例'
                +           '</a>'
                +       '</footer>'
                +   '</div>'
                + '</div>';
        }

        startPos = endPos;
        contentNode.innerHTML += str;

        if (endPos >= projects.length) {
            loadingNode.style.display = 'none';
        }
    }

    var exports = {};

    exports.init = function () {
        loadingNode.addEventListener(globalData.touchStartEvent, render);
        render();
    };

    return exports;

});
