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
    this.dots = $(this.opts.dotsBoxSelector).children("li");    //存储小圆点的li
    this.$boxSel = $(this.opts.boxSelector);                    //ul
    var cloneLi =  this.$boxSel.html();                         //克隆原先存储Img的li
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
    that.$boxSel.children('li').swipeLeft(function(){
      that.userTouch(this,'L');
    });
    that.$boxSel.children('li').swipeRight(function(){
      that.userTouch(this,'R');
    });
  }
  //开始播放
  slideBanner.startMove = function(){
    var that = this;
    that.autoChange = setInterval(function(){
      that.autoChangeFn(that.curIndex);
    },that.opts.speed);
  }
  //定时执行函数
  slideBanner.autoChangeFn = function(_index,direction){
    var that =this;
    if(_index < that.imgLen - 1 && _index>=0){
      _index = direction=="R"?(_index-1):(_index+1);
    }else if(_index >= that.imgLen - 1){
      _index = that.imgLen/2;
      that.$boxSel.css("margin-left",-(_index-1)*that.defOpt.subBoxWidth+'rem');
    }
    if(_index<0){
      _index = that.imgLen/2-1;
      that.$boxSel.css("margin-left",-(_index+1)*that.defOpt.subBoxWidth+'rem');
    }
    that.changeTo(_index);
    that.curIndex = _index;
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
  //用户切换(点击小圆点)
  slideBanner.userMove = function(that){
    var index = this.dots.index(that);
    clearInterval(this.autoChange);
    this.changeTo(index);
    this.curIndex = index;
    this.startMove();
  }
  //用户切换(手指滑动)
  slideBanner.userTouch = function(that,direction){
    var index = this.$boxSel.children('li').index(that);
    clearInterval(this.autoChange);
    this.autoChangeFn(index,direction);
    this.startMove();
  }


  //页面加载后执行
  $(document).ready(function() {
    document.body.ontouchstart = function(event){
      event.preventDefault();
    }
    slideBanner.init();
  })
})