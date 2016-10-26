require('./index.less');
Zepto(function($){
    var regPage = {
        opts:{}
    };
    //初始化
    regPage.init = function(){
        this.bindEvent();
    }
    //事件绑定
    regPage.bindEvent = function(){
        $('.memberType input').click(function(o) {
            this.switchUMember(this);
        });

    }
    //切换用户身份
    regPage.switchUMember = function(that){
        var $that = $(that);
        var t = $that.attr('dataTag');
        $('.comType .ck').hide();
        $('.'+t).show();
    }
    //表单
    regPage.form = {
        defOpt:{
            ignore:'.ignore'
        },
        validEmpty:function(){

        },
        isEmpty:function(){
            $()
        },
        validate:function(option){

        }
    }
    //提示
    layer.open({
        content: 'hello layer'
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
    });

    //页面加载时调用
    regPage.init();
});