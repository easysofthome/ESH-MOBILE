require('./index.less');
Zepto(function($){
  $(".library_rg a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".library_lf a").removeClass("current");
    $(".library_lf a").css('color','#383838');
  })

  $(".library_lf a").click(function() {
    $(this).addClass("current");
    $(this).css('color','#128bf7');
    $(".library_rg a").removeClass("current");
    $(".library_rg a").css('color','#383838');
  })
  })