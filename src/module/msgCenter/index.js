require('common/js/layout.js');
require('./index.less');
Zepto(function($){
$(document).ready(function (){
   $('.news_con').each(function(){
    var len=$(this).children(".news_text").html().length;
    if(len<=100){
      $(this).children(".expand").hide();
    }else{
      var jie=$(this).children(".news_text").html().substr();
      var qu=$(this).children(".news_text").html().substr(0,28);
      $(this).children(".news_text").html(qu);
      $(this).children(".expand").click(function(){
        if($(this).html()=="展开站内信"){
        $(this).html("收缩站内信");
        $(this).siblings(".news_text").html(jie);


      }else{
        $(this).html("展开站内信");
        $(this).siblings(".news_text").html(qu);

      }
      })

    }

});

})
});
