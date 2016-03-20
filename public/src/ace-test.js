/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var $ = require('jquery');

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
        var editor = ace.edit(type + '-editor');

        editor.$blockScrolling = Infinity;
        editor.setTheme('ace/theme/monokai');

        editor.getSession().setUseWorker(false);
        editor.getSession().setMode('ace/mode/' + type);

        editor.setOption('wrap', false);
        editor.setOption('highlightActiveLine', false);

        var codeVal = editor.getSession().getValue();

        var beautified = cssbeautify(codeVal, {
            indent: '    ',
            autosemicolon: true
        });
        editor.getSession().setValue(beautified);

        // editor.getSession().setValue(codeVal);
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
        });

    }

    var exports = {};

    exports.init = function () {
        $('#css-editor').html(''
            + 'a {'
            +     'color: red;'
            + '}'
        );
        initAceEditor('css');
        $('#css-editor').height(500);
    };

    return exports;

});
