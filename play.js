var APP_ID = 'MTtc1w5rvxtBQtszNzzGxaBi-gzGzoHsz'
var APP_KEY = 'X3lLWjfgi4fJxMNhhYoR4Ewc'

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
var audio = document.createElement('audio')
var onoff = true


var songModule = {
    results: null,
    getAll: function(){
        var query = new AV.Query('Indexlist')
        return query.find().then(function(results){
            this.results = results
        }.bind(this))
    }
}
var songView = {
    showLyrics: showLyrics,
    showDetails: showDetails,
    parseLyric: parseLyric

}

var songController= {
    module: songModule,
    view: songView,
    init: function(){
        this.module.getAll().then(function(){
            this.render()
        }.bind(this))
    },
    render: function(){
        var idArray = location.search.split('=')
        var id = idArray[1] 
        var results = songModule.results
        for(var i=0;i<results.length;i++){
            if(results[i].id === id){
                this.view.showDetails(results[i])
                var data = JSON.parse(results[i].attributes.lyric)
            }
        }
        this.view.showLyrics(data)
    },
    playTab: function(){
        $('.playButton').on('click',function(e){
            if(onoff){
                $('.song-disc-wrap').addClass('active')
                audio.play()
            }else{
                $('.song-disc-wrap').removeClass('active')
                audio.pause()
            }
            e.preventDefault()
            onoff = !onoff
        })
    }
}
songController.init()

songController.playTab()



function showLyrics(data){
    var arraylyric = this.parseLyric(data)
    setInterval(function(){
        var currentTime = audio.currentTime
        var line

        for(var i=0;i<arraylyric.length;i++){
            if(i === arraylyric.length-1){
                return 
            }else if( currentTime >= arraylyric[i].time && currentTime < arraylyric[i+1].time){
                line = $('.song-lyr p').eq(i)
                break
            }
        } 
        if(line){
            if(line.text()===''){return}
            
            var top = line.offset().top
            line.addClass('active').siblings().removeClass('active')
            var linesTop = $('.song-lyr').offset().top
            var delta = top - linesTop
            $('.song-lyr').css('transform', 'translateY(-'+ delta+'px)')
        } 
    },20) 
}

function showDetails(results){
    audio.src = results.attributes.url
    $('.song-info > h2').text(results.attributes.name + ' - ' + results.attributes.singer)
    
    $('.song-img > img').attr('src',results.attributes.imgUrl)
    $('.song-wrap > .song-bg').css({
        'background-image': 'url(' + results.attributes.imgUrl + ')'
    })
}
function parseLyric(data){
    var lyric = data.lyric
    
    var array = lyric.split('\n')
    var regex = /^\[(.*)\](.*)$/
    var arraylyric = []
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
        var matches = object.time.split(':')
        
        var minutes = ~~matches[0]
        var seconds = +matches[1]
        
        var time = minutes*60 + seconds
        
        arraylyric.push({
            time: time,
            lyric: object.words
        })       
        
    })
    
    return arraylyric
}



