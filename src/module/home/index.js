require('./index.less');
require('common/js/layout.js');
Zepto(function($){
  var imgLen,count = 0,autoChange ;
  $(document).ready(function(){
    imgLen = $(".banner_box li").length;
    autoChange = setInterval(function(){
      if(count > imgLen - 1){
        count ++;
      }else{
        count = 0;
      }
      changeTo(count);
    },2500);

    function changeTo(num){
      var goLeft = -num * 32;
      $(".banner_box").animate({'margin-left': goLeft + "rem"},500);
      $(".dots_box").find("li").removeClass("current").eq(num).addClass("current");
    }

    $(".dots_box").find("li").click(function(){
      var index = $(".dots_box li").index(this);
      clearInterval(autoChange);
      changeTo(index);
      count = index;
    });

  })
})