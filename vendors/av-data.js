var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

$(function(){
    !function(){
        var query = new AV.Query('Indexlist')
        query.find().then(function (results) {
        // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<a href='+ results[i].attributes.url +' class="music-list border"><div class="music-list-cont">\
                <h3>'+ results[i].attributes.name +'<small>'+ results[i].attributes.nameinfo +'</small></h3>\
                <p class="textoverflow"><i class="icon-sq"></i>'+ results[i].attributes.singer + ' - ' + 
                results[i].attributes.name 
                +'</p></div><span><i class="icon-play"></i></span></a>'
            }
            $('.lastest-list').append(html)
        }, function (error) {
            alert('获取歌曲失败')
        })
    }()

    !function(){
        var query = new AV.Query('Hotlist')
        query.find().then(function (results) {
        // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
            var html = ''
            var num = 0
            for(var i=0;i<3;i++){
                html += '<a href='+ results[i].attributes.url +' class="hot-item">\
                <div class="hot-item-num top-three">0'+ (i+1) +'</div>\
                <div class="hot-item-content border">\
                    <div class="hot-item-context">\
                        <h3>'+ results[i].attributes.name +'<span>'+ results[i].attributes.nameinfo +'</span></h3>\
                        <p class="textoverflow"><i class="icon-sq"></i>'+ results[i].attributes.singer + ' - ' + 
                        results[i].attributes.name +'</p>\
                    </div>\
                    <div class="hot-item-play">\
                        <i class="icon-play"></i>\
                    </div></div></a>'
            }

            for(var i=3;i<results.length;i++){

                num = i >= 9 ? (i+1) : ('0' + (i + 1) )

                html += '<a href='+ results[i].attributes.url +' class="hot-item">\
                <div class="hot-item-num">'+ num +'</div>\
                <div class="hot-item-content border">\
                    <div class="hot-item-context">\
                        <h3>'+ results[i].attributes.name +'<span>'+ results[i].attributes.nameinfo +'</span></h3>\
                        <p class="textoverflow"><i class="icon-sq"></i>'+ results[i].attributes.singer + ' - ' + 
                        results[i].attributes.name +'</p>\
                    </div>\
                    <div class="hot-item-play">\
                        <i class="icon-play"></i>\
                    </div></div></a>'

                
            }
            $('.hot-content').append(html)
        }, function (error) {
            alert('获取歌曲失败')
        })
    }()
})





$('#search').on('input',function(){
    
    var value = $(this).val().trim()
    if(value === ''){return}
    var query = new AV.Query('Song')
    query.contains('name',value)
    query.find().then(function (results) {
        $('.search-list ul').empty()
        if(results.length === 0){
            console.log('没有结果')
        }else{
            
            var html = ''
            for(var i=0;i<results.length;i++){
                html += '<li>'+ results[i].attributes.name + '-' + results[i].attributes.singer
                 +'</li>'
            }
            $('.search-list ul').append(html)
        }
        console.log(results)
        var html = ''
        
    }, function (error) {
        
    })
    
})
