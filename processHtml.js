/**
 * html-webpack-plugin实现钩子回调函数，对动态生成的html进行二次加工
 */
function processHtml(options) {
    this.process =_processHtml;
}
//回调函数
processHtml.prototype.apply = function(compiler) {
    var that = this.process;
    compiler.plugin('compilation', function(compilation) {
        //钩子
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            var htmlData = htmlPluginData.html;
            var tempHtml = that.insertToHeader(htmlData);
            htmlPluginData.html = that.insertToBody(tempHtml);
            callback(null, htmlPluginData);
        });
    });
};
//二次加工html
var _processHtml = {
    addData: {
        'headerData':[
        '<script>'+
            '(function (doc, win) {' +
        'var docEl = doc.documentElement,' +
        'resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",' +
        'recalc = function () {' +
        'var clientWidth = docEl.clientWidth;' +
        'if (!clientWidth) return;' +
        'docEl.style.fontSize = 10 * (clientWidth / 320) + "px";' +
        '};' +
        'if (!doc.addEventListener) return;' +
        'recalc();' +
        '})(document, window)</script>'],
        'bodyData':['<script src="/dist/common/common.js"></script>']
    }
};
//初始化
_processHtml.init = function(options){

}
//在head动态加入script函数
_processHtml.insertToHeader=function(data){
    var headerData = this.addData.headerData.join();
    var ret = data.replace(/\<\/head\>/g,headerData+'</head>');
    return ret;
}
//body底部
_processHtml.insertToBody=function(data){
    var bodyData = this.addData.bodyData.join();
    var ret= data.replace(/\<\/body\>/g,bodyData+'</body>');
    return ret;
}
//接口
module.exports = processHtml;

