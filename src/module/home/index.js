require('./index.less');
Zepto(function($){
  //图片轮播
  var slideBanner = {
    imgLen:0,         //图片个数
    curIndex:0,       //当前图片索引
    autoChange : {},  //自动播放函数
    dots:{},
    $boxSel:{},
    defOpt:{          //默认配置
      boxSelector:'.banner_box', //容器
      speed:5000,     //图片轮播速度,
      dotsBoxSelector:'.dots_box',
      subBoxWidth:32,
    },
    opts:{}           //当前配置
  }
  //初始化
  slideBanner.init = function(option){
    this.opts = $.extend(this.defOpt,option);
    this.dots = $(this.opts.dotsBoxSelector).children("li");
    this.$boxSel = $(this.opts.boxSelector);
    this.startMove();
  }
  //事件绑定
  slideBanner.bindEvent = function(){
    var that = this;
    that.dots.click(function(){
      that.userMove(this);
    });
  }
  //开始播放
  slideBanner.startMove = function(){
    var that = this;
    var _index = that.curIndex;
    var cloneLi =  that.$boxSel.html();
    that.$boxSel.append(cloneLi);
    that.imgLen = $(that.opts.boxSelector+" li").length;
    that.autoChange = setInterval(function(){
      if(_index < that.imgLen - 1){
        _index ++;
      }else{
        _index = that.imgLen/2;
        that.$boxSel.css("margin-left",-(_index-1)*that.defOpt.subBoxWidth+'rem');
      }
      that.changeTo(_index);
      that.opts.curIndex = _index;
    },that.opts.speed);
  }
  //轮换动画
  slideBanner.changeTo = function(curIndex){
    var goLeft = -curIndex * this.defOpt.subBoxWidth;
    this.$boxSel.animate({'margin-left': goLeft + "rem"},this.dots.speed);
    this.dotsChange(curIndex);
  }
  //
  slideBanner.dotsChange = function(curIndex){
    if(curIndex > this.imgLen/2 - 1){
      curIndex = curIndex%(this.imgLen/2);
    }
    this.dots.removeClass("current").eq(curIndex).addClass("current");
  }
  //用户切换
  slideBanner.userMove = function(that){
    var index = this.dots.index(that);
    clearInterval(this.autoChange);
    changeTo(index);
    this.curIndex = index;
    this.startMove();
  }


  //页面加载后执行
  $(document).ready(function() {
    slideBanner.init();
  })
})