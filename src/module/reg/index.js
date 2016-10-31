require('./index.less');
Zepto(function($){
    //注册页对象
    var regPage = {
        defOpt:{
            ignore:'ignore',    //设置后不进行验证
            formSel:'#regForm'  //表单ID
        },
        opts:{}
    };
    //初始化
    regPage.init = function(options){
        this.opts = $.extend(this.defOpt,options);
        this.bindEvent();
    }
    //事件绑定
    regPage.bindEvent = function(){
        var that = this;
        //切换用户身份
        $('.memberType input').click(function(o) {
            that.switchUMember(this);
        });
        //提交表单
        $('.register').click(function(o) {
            var success = that.regForm.validForm();
            if(success){
                that.regForm.showErrorTip(null,'提交成功');
            }

        });
        //我有邀请码
        $('#ckBoxInviteCode').click(function(o) {
            that.accessCodeInput(this,'.hasAuthcode');
        });
    }
    //切换用户身份
    regPage.switchUMember = function(that){
        var $that = $(that);
        var t = $that.attr('dataTag');
        $('.comType .ck').hide();
        $('.'+t).show();
    }
    //邀请码输入框显示或隐藏
    regPage.accessCodeInput = function(that,selector){
        var $that = $(that);
        var userCode = $(selector).children('input');
        if($that.is(':checked')){
            $(selector).show();
            userCode.removeClass('ignore');
        }else{
            userCode.addClass('ignore');
            $(selector).hide();
        }
    }
    //表单
    regPage.regForm = {
        validForm:function(){
            if(this.validPwdLen()&&this.rePassWord()&&this.validEle()){
                return true;
            }else{
                return false;
            }
        },
        //验证
        validEle:function(){
            var that = regPage;
            var success = true;
            var $form = $(that.opts.formSel);
            $form.find('input').each(function(){
                var $that = $(this);
                if($that.hasClass(that.opts.ignore)) {
                    return;
                }
                var _val = trim($that.val());
                var elName = $that.parent().find('span.title').html();
                //非空验证
                if(_val.length == 0){
                    that.regForm.showErrorTip($that,elName+'不能为空！');
                    success = false;
                    return false;
                }
            });
            return success;
        },
        //确认密码
        rePassWord:function(){
            var that = regPage;
            if($('#uPwd').val()!==$('#uRePwd').val()){
                that.regForm.showErrorTip($('#uRePwd'),'两次输入密码不一致！');
                return false;
            }else{
                return true;
            }
        },
        //密码长度
        validPwdLen:function(){
            var that = regPage;
            if(trim($('#uPwd').val()).length<=0){
                return true;
            }
            if($('#uPwd').val().length<parseInt($('#uPwd').attr('min'))||
                $('#uPwd').val().length>parseInt($('#uPwd').attr('max'))){
                that.regForm.showErrorTip($('#uPwd'),'密码长度必须在6-16个字符之间！');
                return false;
            }else{
                return true;
            }
        },
        //显示错误提示
        showErrorTip:function(el,msg){
            //提示
            layer.open({
                content: msg
                ,skin: 'msg'
                ,time: 1 //1秒后自动关闭
                ,end:function(){
                    if(el){
                        el.trigger('focus');
                    }
                }
            });
        }
    }

    function trim(val){
        return val.replace(/^\s*/g,'').replace(/\s*$/g,'');
    }

    //页面加载时调用
    regPage.init();
});