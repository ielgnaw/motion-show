/**
 * @file 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var projects = [
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/angelababy',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/angelababy.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/bzhan',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/bzhan.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/chenweiting',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/chenweiting.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/dunkengle',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/dunkengle.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/huangbo',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/huangbo.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/kuanianhongbao',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/kuanianhongbao.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/mid-autumn',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/mid-autumn.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/music',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/music.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/quanxi-xiaodu',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/quanxi-xiaodu.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/ssgsports',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/ssgsports.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/starking',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/starking.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/summerparty',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/summerparty.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/variety',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/variety.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/xingjiuling',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/xingjiuling.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/activity/yashilandai',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/yashilandai.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/landingpage/guide',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/landingpage-guide.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/immersion/music',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/immersion-music.png'
        },
        {
            title: '',
            img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/1.png',
            link: '/immersion/poem',
            desc: '',
            qrUrl: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/project-collection/immersion-poem.png'
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
                +               '预览项目'
                +           '</a>'
                +           '<div class="qr-wrap">'
                +               '<span class="qr"></span>'
                +               '<div class="game-qr">'
                +                   '<img src="' + project.qrUrl + '">'
                +               '</div>'
                +           '</div>'
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
