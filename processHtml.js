/**
 * html-webpack-plugin实现钩子回调函数，对动态生成的html进行二次加工
 */
function processHtml(options) {
    _processHtml.init(options);
    this.data = _processHtml.data;
}
//回调函数
processHtml.prototype.apply = function(compiler) {
    var that = this;
    compiler.plugin('compilation', function(compilation) {
        console.log('二次加工HTML');
        //钩子
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            htmlPluginData.html = htmlPluginData.html.replace(/\<\/head\>/g,that.data.script+'</head>') ;
            callback(null, htmlPluginData);
        });
    });
};
//二次加工html
var _processHtml = {
    data:{}
};
//初始化
_processHtml.init = function(options){
    this.data.script = this.insertInitScript(options);
}
//在head动态加入script函数
_processHtml.insertInitScript=function(options){
    var script=
        '<script>'+
        '(function (doc, win) {'+
        'var docEl = doc.documentElement,'+
        'resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",'+
        'recalc = function () {'+
        'var clientWidth = docEl.clientWidth;'+
        'if (!clientWidth) return;'+
        'docEl.style.fontSize = 10 * (clientWidth / 320) + "px";'+
        '};'+
        'if (!doc.addEventListener) return;'+
        'recalc();'+
        '})(document, window)</script>';
    return script;
}
//接口
module.exports = processHtml;

