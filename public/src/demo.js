/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var $ = require('jquery');

    var abs = Math.abs;

    var htmlContainer = $('#html-code');
    var cssContainer = $('#css-code');
    var iframeNode = $('#iframe');

    var htmlCode = '';
    var cssCode = '';

    /**
     * ace编辑器
     *
     * @type {Object}
     */
    var ace = window.ace;

    /**
     * 初始化ACE编辑器
     *
     * @inner
     * @param {string} type 代码类型
     */
    function initAceEditor(type) {
        var editor = ace.edit(type + '-code');

        editor.$blockScrolling = Infinity;
        editor.setTheme('ace/theme/chrome');

        editor.getSession().setUseWorker(false);
        editor.getSession().setMode('ace/mode/' + type);
        editor.setOption('showPrintMargin', false);
        editor.setOption('wrap', false);
        editor.setOption('highlightActiveLine', false);

        var codeVal = editor.getSession().getValue();

        // var beautified = cssbeautify(codeVal, {
        //     indent: '    ',
        //     autosemicolon: true
        // });
        // editor.getSession().setValue(beautified);
        // editor.getSession().selection.selectAll();
        editor.getSession().setValue(decodeURI(codeVal));

        if (type === 'html') {
            htmlCode = editor.getSession().getValue();
        }

        if (type === 'css') {
            cssCode = editor.getSession().getValue();
        }

        // editor.getSession().setTabSize(4);
        // editor.getSession().setUseWrapMode(true);


        // editor.commands.removeCommand('find');
        // editor.commands.addCommand({
        //     name: 'format',
        //     bindKey: {
        //         win: 'Ctrl-Shift-F',
        //         mac: 'Command-Shift-F'
        //     },
        //     exec: function (editor, line) {
        //         formatCode(codeVal, type, function (data) {
        //             editor.getSession().setValue(data.code);
        //         });
        //     },
        //     readOnly: true
        // });

        editor.on('change', function (evt) {
            if (type === 'html') {
                htmlCode = editor.getSession().getValue();
            }

            if (type === 'css') {
                cssCode = editor.getSession().getValue();
            }
        });
    }

    /**
     * 刷新回调事件
     *
     * @param {Object} e 事件对象
     */
    function refresh(e) {
        e.stopPropagation();
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/refresh',
            dataType: 'json',
            data: {
                htmlContent: htmlCode,
                cssContent: cssCode
            }
        }).then(function (data, textStatus, jqXHR) {
            iframeNode.attr('src', require.toUrl('../' + 'frame.html'));
        });
    }

    var exports = {};

    exports.init = function () {
        $.ajax({
            method: 'post',
            url: '/format/htmlcss',
            dataType: 'json',
            data: {
                htmlContent: htmlContainer.html(),
                cssContent: cssContainer.html()
            }
        }).then(function (data, textStatus, jqXHR) {
            htmlContainer.html(encodeURI(data.data.htmlContent)).show();
            initAceEditor('html');

            cssContainer.html(encodeURI(data.data.cssContent)).show();
            initAceEditor('css');
        });

        $('.refresh').on('click', refresh);
    };

    return exports;

});
