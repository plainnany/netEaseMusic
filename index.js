$(function(){
    
    
    $('.tab-content').eq(0).addClass('show')
    
    $('.topbar-tab>li').on('click',function(){
        var index = $(this).index()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $('.tab-content').removeClass('show')
        $('.tab-content').eq(index).addClass('show')
        
    })


    
    
    $('#search').on('input',function(){
        
        $('#search').val($(this).val()) 
        $('.search-box').addClass('active')
        if($('#search').val().trim() === ''){
            
            $('.search-box').removeClass('active')
        }    
        
    })

    $('.close').on('click',function(){
        console.log('hi')
        $('#search').val(' ')
        $('#placeholder').show()
    })

})