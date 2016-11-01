require('./index.less');
Zepto(function($){
  $(".identity_rg a").click(function() {
    $(this).addClass("current");
    $(".identity_lf a").removeClass("current");
  })

  $(".identity_lf a").click(function() {
    $(this).addClass("current");
    $(".identity_rg a").removeClass("current");
  })
  })