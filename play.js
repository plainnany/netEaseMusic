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


    $('.playButton').on('click',function(){
        $('.song-disc-wrap').addClass('active')
    })
    
    
})
