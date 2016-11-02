require('./index.less');
Zepto(function($){
  $(".module_rg a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".module_lf a").removeClass("current");
    $(".module_lf a").css('color','#383838');
  })

  $(".module_lf a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".module_rg a").removeClass("current");
    $(".module_rg a").css('color','#383838');

  })
  })