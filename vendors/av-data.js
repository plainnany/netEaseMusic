var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

// var Todo = AV.Object.extend('Recommendlist');
// // 新建一个 Todo 对象
// var todo = new Todo();

// todo.save({
//     url: '',
//     playnum: '126.5',
//     imgUrl: '//ov8ky0xr6.bkt.clouddn.com/1.jpg',
//     info: '七夕快到了，单身狗有话要说……'
// }).then(function (todo) {
//   // 成功保存之后，执行其他逻辑.
//   alert('成功')
// });

$(function(){
    !function(){
        var query = new AV.Query('Indexlist')
        query.find().then(function (results) {
            $('.lastest-list > #loading').remove()
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<a href='+ results[i].attributes.url +' class="music-list border"><div class="music-list-cont">\
                <h3>'+ results[i].attributes.name +'<small>'+ results[i].attributes.nameinfo +'</small></h3>\
                <p class="textoverflow"><svg class="icon icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ 
                results[i].attributes.singer + ' - ' + results[i].attributes.name 
                +'</p></div><span><svg class="icon icon-play"><use xlink:href="#icon-play"></use></svg></span></a>'
            }
            $('.lastest-list').append(html)
        }, function (error) {
            alert('获取歌曲失败')
        })
    }()

    !function(){
        var query = new AV.Query('Hotlist')
        query.find().then(function (results) {
            $('.hot-content > #loading').remove()
            var html = ''
            var num = 0
            for(var i=0;i<results.length;i++){

                num = i >= 9 ? (i+1) : ('0' + (i + 1) )

                html += '<a href='+ results[i].attributes.url +' class="hot-item">\
                            <div class="hot-item-num">'+ num +'</div>\
                                <div class="hot-item-content border">\
                                    <div class="hot-item-context">\
                                        <h3>'+ results[i].attributes.name +'<span>'+ results[i].attributes.nameinfo +'</span></h3>\
                                        <p class="textoverflow"><svg class="icon icon-sq"><use xlink:href="#icon-sq"></use></svg>'+
                                        results[i].attributes.singer + ' - ' + results[i].attributes.name +'</p>\
                                    </div>\
                                    <div class="hot-item-play">\
                                        <svg class="icon icon-play"><use xlink:href="#icon-play"></use></svg>\
                                    </div></div></a>'    
            }
            $('.hot-content').append(html)
        }, function (error) {
            alert('获取歌曲失败')
        })
    }()

    !function(){
        var query = new AV.Query('Recommendlist')
        query.find().then(function (results) {
            $('#loading').remove()
            console.log(results)
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<a href='+ results[i].attributes.url +'>\
                            <div class="recommend-img">\
                                <img src='+ results[i].attributes.imgUrl +' alt="">\
                                <span class="earphone">'+ results[i].attributes.playnum +'万</span>\
                            </div>\
                            <p>'+ results[i].attributes.info +'</p></a>'
            }
            
            $('.recommend-songs').append(html)
        }, function (error) {
            alert('获取推荐失败')
        })
    }()

    !function(){
        $('#search').on('input',function(){
            var value = $(this).val().trim()
            
            $('.search-box').addClass('active')
            if($(this).val() === ''){
                
                $('.search-box').removeClass('active')

                $('.search-results').empty()
                $('.search-list').show()
            } 
        
        
            
            if(value === ''){return}
            var query = new AV.Query('Hotlist')
            query.contains('name',value)
            query.find().then(function (results) {
                $('.search-list').hide()
                
                if(results.length === 0){
                    $('.search-results').empty()
                    var html = ''
                    html = '<h3 class="border">搜索"'+ value +'"</h3>'
                    $('.search-results').append(html)
                }else{
                    $('.search-results').empty()
                    var html = ''
                    console.log(results)
                    
                    for(var i=0;i<results.length;i++){
                        html += '<li class="results-item">\
                                <i class="results-icon">\
                                <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>\
                                </i>\
                                <span class="border textoverflow">'+ results[i].attributes.name + ' - ' +
                            results[i].attributes.singer +'</span></li>'
                    }
                    html = '<h3 class="border">搜索"'+ value +'"</h3><ul>' + html + '</ul>'
                    $('.search-results').append(html)
                }
                
               
            }, function (error) {
                
            })
            
        })
    }()
})






