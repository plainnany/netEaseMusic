$(function(){
    $('.topbar-tab>li').on('click',function(){
        var index = $(this).index()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $('.tab-content').hide()
        $('.tab-content').eq(index).show()
        
    })


    
})