$(function(){
    
    
    $('.tab-content').eq(0).addClass('show')
    
    $('.topbar-tab>li').on('click',function(){
        var index = $(this).index()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        $('.tab-content').removeClass('show')
        $('.tab-content').eq(index).addClass('show')
        
    })




    $('.close').on('click',function(){
        $('#search').val('')
        $('.search-box').removeClass('active')       
        $('.search-list').show()
        $('.search-results').empty()
    })

    $('.search-list > ul').on('click','li',function(){
        $('.search-list').hide ()
        $('.search-box').addClass('active')  
        $('#search').val($(this).text())
        $('.search-results').empty()
        var html = ''
        html = '<h3 class="border">搜索"'+ $('#search').val().trim() +'"</h3>'
        $('.search-results').append(html)
    })

})