require('./index.less');
Zepto(function($){
  $(".module_rg a").click(function() {
    $(this).addClass("current");
    $(".module_lf a").removeClass("current");
  })

  $(".module_lf a").click(function() {
    $(this).addClass("current");
    $(".module_rg a").removeClass("current");
  })
  })