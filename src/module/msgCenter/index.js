require('common/js/layout.js');
require('./index.less');

Zepto(function($){
    //测试数据
    var testData = {data:[{msgTitle:'网站新版上线',msgContent:'易家纺新网站上线，全部新的界面给用户全新的感受。核价功能用户舒适度得到大幅度的提升，做到了解用户为用户服务。易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易。易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易'},{msgTitle:'网站新版上线',msgContent:'易家纺新网站上线，全部新的界面给用户全新的感受。核价功能用户舒适度得到大幅度的提升，做到了解用户为用户服务。易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易。易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易数据使用大数据挖掘匹配出用户合适易'}]}

    //消息中心对象
    var msgCenterPage = {
        defOpts : {
            expand:'展开站内信',
            shrink:'收缩站内信',
            initSize : 60,//初始容器字数 默认
            pSelector:'.content_box',
            animateOpt:{
                expandH:'200px',
                shrinkH:'50px',
                time:500,
                type:'ease-out',
                callback:function(data){
                    data.$btn.html(data.btnText);
                    data.$msgContent.html(data.content);
                }
            }
        },
        initText:'',
        opt:{}

    }
    /**
     * @option:用户自定义配置 参考this.defOpts
     * 初始化
     */
    msgCenterPage.init = function(option){
        this.opt = $.extend(this.defOpts,option);
        this.bindEvent();
        this.loadData();
    }
    //事件绑定
    msgCenterPage.bindEvent = function(){

    }
    //加载公告数据
    msgCenterPage.loadData = function(){
        //ajax获取数据 暂时省略
        var msgData = testData;
        this.processMsg(msgData.data);
    }
    /**
     * @msgDataArray:消息数据数组格式
     * 构建消息内容HTML
     */
    msgCenterPage.processMsg = function(msgDataArray){
        //消息个数
        var msgDataLen = msgDataArray.length;
        //父容器
        var $pSelector =  $(this.opt.pSelector);
        for(var i=0;i<msgDataLen;i++){
            var msgData = msgDataArray[i];
            //构建循环容器
            var $pDiv = $('<div>');
            $pDiv.addClass('news_box');
            var headerHTML = '<div class="avatar_box lf"><div class="avatar_ico"></div></div>';
            $pDiv.append(headerHTML);
            var $content = $('<div>').addClass('rg news_con');
            $content.addClass('rg news_con');
            //构建标题、日期
            var titleHTML = '<div class="clearfix"><p class="lf news_name">易家纺公告</p><p class="rg news_data">16/09/01</p></div>';
            $content.append(titleHTML);
            var msgTitle =$('<p>').addClass('news_tit');
            msgTitle.addClass('news_tit');
            msgTitle.html(msgData.msgTitle);
            $content.append(msgTitle);
            var $msgContent = $('<div>').addClass('news_text');
            $msgContent.addClass('news_text');
            //构建消息主体HTML
            this.processMsgShow(msgData.msgContent,$msgContent);
            $content.append($msgContent);
            var $btn = $('<p>');
            $btn.html(this.opt.expand).addClass('expand');
            //构建消展开收缩按钮
            this.processMsgShowMore(msgData.msgContent,$msgContent,$btn);
            $content.append($btn);
            $pDiv.append($content);
            $pSelector.append($pDiv);
        }
    }
    /**
     * @msgContentData:消息数据
     * @msgContent:消息容器
     * 构建消息主体HTML
     */
    msgCenterPage.processMsgShow = function(msgContentData,$msgContent){
        //获得文本长度
        var msgDataLen = msgContentData.length;
        if(msgDataLen<=this.opt.initSize){
            //注入数据
            $msgContent.html(msgContentData);
        }else{
            var initText = msgContentData.substr(0,this.opt.initSize);
            this.opt.initText = initText+'...';
            $msgContent.html(this.opt.initText);
        }
    }
    /**
     * @msgContentData:消息数据
     * @msgContent:消息容器
     * @$btn:展开收缩按钮
     * 构建消展开收缩按钮
     */
    msgCenterPage.processMsgShowMore = function(msgContentData,$msgContent,$btn){
        var that = this;
        //获得文本长度
        var len = msgContentData.length;
        if(len<=this.opt.initSize){
            //隐藏按钮
            $btn.hide();
        }else{
            //展开收缩事件
            $btn.click(function(){
                var $msg = $(this);
                $msg.html()==that.opt.expand?that.expand($msg,msgContentData,$msgContent):that.shrink($msg,$msgContent);
            });
        }
    }
    /**
     * @$msg:展开收缩按钮对象
     * @msgContentData:展开后要显示的内容
     * @$msgContent:显示消息的容器
     *  展开功能
     */
    msgCenterPage.expand = function($msg,msgContentData,$msgContent){
        var that = this;
        var param = {
            btnText:that.opt.shrink,
            content:msgContentData,
            $btn:$msg,
            $msgContent:$msgContent
        }
        that.opt.animateOpt.callback(param);


    }
    /**
     * @$msg:展开收缩按钮对象
     * @$msgContent:显示消息的容器
     *  收缩功能
     */
    msgCenterPage.shrink = function($msg,$msgContent){
        var that = this;
        var param = {
            btnText:that.opt.expand,
            content:that.opt.initText,
            $btn:$msg,
            $msgContent:$msgContent
        }
        that.opt.animateOpt.callback(param)
    }

    //dom初始化成功后执行
    $(document).ready(function (){
        msgCenterPage.init();

    })
});
