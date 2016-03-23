/**
 * @file pc 首页
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    return {
        /**
         * 启动
         */
        start: function () {
            var $ = require('jquery');
            console.warn(NAV);
            console.warn(TEST);

            $('#ajax').on('click', function () {
                $.ajax({
                    method: 'post',
                    url: '/testAjax?aaa=1',
                    data: {
                        dir: 'test'
                    },
                    success: function (data) {
                        console.warn(data);
                    },
                    dataType: 'json'
                });
            });

            var capData = require('./data');
            console.warn(capData);

        }
    };
});
