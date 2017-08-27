$(function(){
    
    
    $('.tab-content').eq(0).addClass('show')
    
    $('.topbar-tab>li').on('click',function(){
        var index = $(this).index()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $('.tab-content').removeClass('show')
        $('.tab-content').eq(index).addClass('show')
        
    })

    
    $('#search').on('focus',function(){
        $('#placeholder').text('')
        
    })
    $('#search').on('blur',function(){
        if($(this).val() === ''){
            $('#placeholder').text('搜索歌曲、歌手、专辑')
        }
    })

})