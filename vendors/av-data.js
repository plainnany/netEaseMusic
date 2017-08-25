var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
var songObject = AV.Object.extend('Song')
var songs = new songObject()
// songs.save({
//   name: '龙卷风',
//   singer: '邓紫棋',
//   url: '//ov8ky0xr6.bkt.clouddn.com/%E9%BE%99%E5%8D%B7%E9%A3%8E.mp3'

// }).then(function(object) {
//   alert('保存成功')
// })
var query = new AV.Query('Song')
query.find().then(function (results) {
  // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
    console.log(results)
    var html = ''
    for(var i=0;i<results.length;i++){
        html += '<a href='+ results[i].attributes.url +' class="music-list border">\
        <h3>'+ results[i].attributes.name +'<small></small></h3>\
        <p><i class="icon-sq"></i>'+ results[i].attributes.singer +'</p>\
        <span><i class="icon-play"></i></span></a>'
    }
    $('.lastest-list').append(html)
}, function (error) {
    alert('获取歌曲失败')
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
console.log()
