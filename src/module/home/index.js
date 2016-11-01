require('./index.less');
Zepto(function($){
  //图片轮播
  var slideBanner = {
    imgLen:0,         //图片个数
    curIndex:0,       //当前图片索引
    autoChange : {},  //自动播放函数
    dots:{},
    $boxSel:{},
    defOpt:{                             //默认配置
      boxSelector:'.banner_box',         //图片轮播容器
      speed:5000,                        //图片轮播速度,
      dotsBoxSelector:'.dots_box',       //小圆点容器
      subBoxWidth:32,                    //图片宽度
    },
    opts:{}                              //当前配置
  }
  /**
   * @option:用户配置包含以下参数
   *  boxSelector,    //容器
   *  speed:5000,     //图片轮播速度,
   *  dotsBoxSelector,//小圆点容器
   *  subBoxWidth,    //图片宽度
   * 初始化
   */
  slideBanner.init = function(option){
    this.opts = $.extend(this.defOpt,option);                   //配置继承
    this.dots = $(this.opts.dotsBoxSelector).children("li");    //存储img的li
    this.$boxSel = $(this.opts.boxSelector);                    //ul
    var cloneLi =  this.$boxSel.html();                         //克隆原先li
    this.$boxSel.append(cloneLi);                               //将克隆的li追加的容器后面
    this.imgLen = $(this.opts.boxSelector+" li").length;        //当前所有图片数量
    this.startMove();                                           //开始轮换图片
    this.bindEvent();                                           //事件绑定
  }
  //事件绑定
  slideBanner.bindEvent = function(){
    var that = this;
    //小圆点点击事件
    that.dots.click(function(){
      that.userMove(this);
    });
  }
  //开始播放
  slideBanner.startMove = function(){
    var that = this;
    var _index = that.curIndex;
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
  //小圆点样式切换
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
    this.changeTo(index);
    this.curIndex = index;
    this.startMove();
  }


  //页面加载后执行
  $(document).ready(function() {
    slideBanner.init();
  })
})