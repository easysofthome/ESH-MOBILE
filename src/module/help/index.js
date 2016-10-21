require('./index.less');
Zepto(function($){
  $('.validType select').click(function(){
      var svalue = $(this).val();
      if(svalue == 'phone'){
          $('.phone').show();
          $('.email').hide();
      }else if(svalue == 'email'){
          $('.email').show();
          $('.phone').hide();
      }
  });

})


