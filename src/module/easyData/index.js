require('./index.less');
Zepto(function($){
  $(".identity_rg a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".identity_lf a").removeClass("current");
    $(".identity_lf a").css('color','#383838');
  })

  $(".identity_lf a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".identity_rg a").removeClass("current");
    $(".identity_rg a").css('color','#383838');
  })
  })