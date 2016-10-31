require('./index.less');
require('common/js/layout.js');
Zepto(function($){
  var imglen,count = 0,autoChange ;
  $(document).ready(function(){
    imglen = $(".banner_box li").length;
    autoChange = setInterval(function(){
      if(count > imglen - 1){
        count ++;
      }else{
        count = 0;
      }
      changeTo(count);
    },2500);

  function changeTo(num){
    var goLeft = num * 32;
    $(".banner_box").animate({left: "-" + goLeft + "rem"},500);
    $(".dots_box").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }
  $(".dots_box").find("li").each(function(item){
    $(this).click(function(){
      clearInterval(autoChange);
      changeTo(item);
      count = item;
    },function(){
      autoChangeAgain();
    });
  });


  })
})