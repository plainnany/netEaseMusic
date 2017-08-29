var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
$(function(){


    var query = new AV.Query('Indexlist')
    query.find().then(function (results) {
        $('.songs > #loading').remove()
        var html = ''
        for(var i=0;i<6;i++){
            html += '<a href="./play.html?id='+ results[i].id +'" class="songs-item">\
                        <div class="songs-num">'+ (i+1) +'</div>\
                            <div class="songs-content border">\
                                <div class="songs-content-wrap">\
                                    <div class="songs-title textoverflow">'+ results[i].attributes.name +
                                    '</div>\
                                    <div class="songs-info textoverflow">'+
                                     results[i].attributes.singer + ' - '+ results[i].attributes.name +
                                    '</div>\
                                </div>\
                            <div class="songs-play">\
                                <i class="icon-play"></i>\
                            </div>\
                        </div>\
                    </a>'
        }
        $('.songs').append(html)
    })

    !function(){
        var idArray = location.search.split('=')
        var id = idArray[1] 
        var query = new AV.Query('Recommendlist')
        query.find().then(function (results) {
            console.log(results)
            for(var i=0;i<results.length;i++){
                if(results[i].attributes.id === id){
                    $('.playlist-header-img > img').attr('src',results[i].attributes.imgUrl)
                    $('.earphone').text(results[i].attributes.playnum)
                    $('.playlist-header-content > h2').text(results[i].attributes.info)
                    $('.play-desc').text(results[i].attributes.desc)
                    $('.playlist-bg').css({
                        'background-image': 'url('+ results[i].attributes.imgUrl +')'
                    })
                }
            }
            
        })
    }()
})