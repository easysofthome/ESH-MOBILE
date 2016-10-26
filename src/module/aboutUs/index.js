require('./index.less');
Zepto(function($){
    $('.header ul li').click(function(o){
        var $that = $(this);
        if($that.hasClass('cur')) return;
        var curTag = $that.attr('dataTag');
        $that.parent().children('li').each(function(){
            $(this).removeClass('cur');
            var oTag = $(this).attr('dataTag');
            $('.'+oTag).show();
            if(oTag == curTag){
                return;
            }
            $('.'+oTag).hide();
        });
        $that.addClass('cur');
    });
});