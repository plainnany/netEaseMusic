$(function(){
    
    $.get('lyric.json').then(function(data){
        var lyric = data.lyric
        var array = lyric.split('\n')
        var regex = /^\[(.*)\](.*)$/
        array = array.map(function(string,index){
            var matches = string.match(regex)
            //console.log(matches)
            if(matches){
                return {time: matches[1], words: matches[2]}
            }
        })
        
        array.map(function(object){
            if(!object){return}
            var $p = $('<p></p>')
            $p.attr('data-time',object.time)
            $p.text(object.words)
            $('.song-lyr').append($p)
        })
    },function(){
        console.log('error')
    })

    !function(){
        var audio = document.createElement('audio')
        audio.src = '//ov8ky0xr6.bkt.clouddn.com/%E6%9D%A5%E8%87%AA%E5%A4%A9%E5%A0%82%E7%9A%84%E9%AD%94%E9%AC%BC.mp3'

        $('.playButton').on('click',function(){
            $('.song-disc-wrap').addClass('active')
            audio.play()
        })
    }()
    
    
})
