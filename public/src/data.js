/**
 * @file 模拟 cap 数据
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    return {
        "layers": [
            {
                "id": 1,
                "type": 0,
                "name": "layer name1",
                "classname": "layer-dom-classname",
                "parentid": 0, // 如果没有parent都为0,
                "view": true,
                "tColor": "#fff", // 时间轴上的颜色
                "bgid": 123, // static id,
                "props": { // 初始properties
                    "zIndex": 100,
                    "x": 100,
                    "y": 200,
                    "width": 100,
                    "height": 200,
                    "opacity": 0
                    // ...  css属性, 同keyframes -> layers
                }
            }
        ],

        "keyframes": [
            {
                "id": 1, // 关键帧id,
                "index": 1, // 第几帧
                "layers": [
                    {
                        "id": 1, // layerid

                        "opacity": {
                            "fx": "liner",
                            "value": 20
                        },

                        "x": {
                            "fx": "liner",
                            "value": 200
                        },

                        "y": {
                            "fx": "liner",
                            "value": 300
                        },

                        "width": {
                            "fx": "liner",
                            "value": 300
                        },

                        "height": {
                            "fx": "liner",
                            "value": 300
                        },

                        "scaleX": {
                            "fx": "liner",
                            "value": 2 // 放大2倍, 0.5为缩小2倍
                        },

                        "scaleY": {
                            "fx": "liner",
                            "value": 0.5
                        },

                        "direction": {
                            "fx": "liner",
                            "value": -1 // -1逆时针， 1: 顺时针
                        },

                        "zIndex": {
                            "fx": "liner",
                            "value": 100
                        },

                        "tanslateX": {
                            "fx": "liner",
                            "value": 30
                        },

                        "tanslateY": {
                            "fx": "liner",
                            "value": 30
                        },

                        "skewX": {
                            "fx": "liner",
                            "value": 30
                        },

                        "skewY": {
                            "fx": "liner",
                            "value": 30
                        },

                        "color": {
                            "fx": "liner",
                            "value": "#fff"
                        }
                    }
                ]
            }
        ]
    };
});
