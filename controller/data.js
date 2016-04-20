/**
 * @file 数据
 * @author ielgnaw(wuji0223@gmail.com)
 */

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

var data = [
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    },
    {
        title: '',
        img: 'http://boscdn.bpc.baidu.com/mms-res/ielgnaw/motion-tool/1.gif',
        link: '/demo?name=' + generateUUID(),
        desc: ''
    }
];

module.exports = data;