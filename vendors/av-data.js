var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

// var Todo = AV.Object.extend('Indexlist');
// // 新建一个 Todo 对象
// var todo = new Todo();

// todo.save({
//     url: 'http://ov8ky0xr6.bkt.clouddn.com/%E4%B9%9D%E5%BC%A0%E6%9C%BA.mp3',
//     name: '九张机',
//     singer: '叶炫清',
//     hot: 'hot',
//     nameinfo: '',
//     imgUrl: 'http://ov8ky0xr6.bkt.clouddn.com/%E4%B9%9D%E5%BC%A0%E6%9C%BA.webp',
// }).then(function (todo) {
//   // 成功保存之后，执行其他逻辑.
//   alert('成功')
// });

$(function(){
    !function(){
        var query = new AV.Query('Indexlist')
        query.find().then(function (results) {
            
            $('.lastest-list > #loading').remove()
            $('.hot-content > #loading').remove()
            var html = ''
            var html1 = ''
            var html2 = ''
            var num = 0
            for(var i=0;i<results.length;i++){
                

                if(results[i].attributes.hot === 'index'){
                    html += '<a href="./play.html?id=' + results[i].id +'" class="music-list border"><div class="music-list-cont">\
                    <h3>'+ results[i].attributes.name +'<small>'+ results[i].attributes.nameinfo +'</small></h3>\
                    <p class="textoverflow"><svg class="icon icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ 
                    results[i].attributes.singer + ' - ' + results[i].attributes.name 
                    +'</p></div><span><svg class="icon icon-play"><use xlink:href="#icon-play"></use></svg></span></a>'
                    }
                
                
                if(results[i].attributes.hot === 'hot'){
                    num++
                    num = num > 9 ? num : '0' + num
                    //console.log(num)
                    html1 += '<a href="./play?id='+ results[i].id +'" class="hot-item">\
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
            }
            $('.lastest-list').append(html)
            $('.hot-content').append(html1)

            $('.latest-list a').on('click',function(){
                $.get('./play.html?id='+results[i].id).done(function(response){
                    console.log(response)
                })
            })
            
        }, function (error) {
            alert('获取歌曲失败')
        })

        
    }()

    !function(){
        var query = new AV.Query('Recommendlist')
        query.find().then(function (results) {
            $('#loading').remove()
            
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<a href="./playlist.html?id='+ (i+1) +'">\
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
        var timer = null
        $('#search').on('input',function(e){
            var value = $(e.currentTarget).val().trim()
            
            $('.search-box').addClass('active')
            if($(e.currentTarget).val() === ''){
                
                $('.search-box').removeClass('active')

                $('.search-results').empty()
                $('.search-list').show()
            } 
            if(value === ''){return}
            var query = new AV.Query('Indexlist')
            query.contains('name',value)

            if(timer){clearTimeout(timer)}
            timer = setTimeout(function(){
                timer = null
                
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
                            html += '<a class="results-item" href="./play.html?id='+ results[i].id +'">\
                                    <i class="results-icon">\
                                    <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>\
                                    </i>\
                                    <span class="border textoverflow">'+ results[i].attributes.name + ' - ' +
                                results[i].attributes.singer +'</span></a>'
                        }
                        html = '<h3 class="border">搜索"'+ value +'"</h3><div>' + html + '</div>'
                        $('.search-results').append(html)
                    }
                    
                   
                }, function (error) {
                    
                })
            },500)
            
            
        })
    }()

    
})






