var socket = io();

function makecard(thumb, title, channel, publish, videoid){
  return `<div class="mdl-card mdl-shadow--2dp utube" id='${videoid}'>
      <div class="mdl-card__supporting-text texttube">
          <img src="${thumb}" />
          <div class="text">
              <span class="titulo">${title}</span><br />
              <span class="canal">${channel}</span><br /><br /><br />
              <span class="pub">${publish}</span>
          </div>
      </div>
  </div>`
}


function searchvideo(query){
  var apiKey = "AIzaSyAGPzQ_KugklsczsxBzTqBwars3SsB4V2Q";
  var max_videos = 10;
  var url = "https://www.googleapis.com/youtube/v3/search?order=viewcount&part=snippet&q=" + escape(query) + "&type=video+&videoDefinition=high&key=" + apiKey + "&maxResults="+ max_videos;

  $.getJSON(url, function(json){
    var obj = [];
    $(json.items).each(function(key, item){
      var date = item.snippet.publishedAt.substr(0, 10);
      var time = item.snippet.publishedAt.substr(11, 8);
      var card = makecard(item.snippet.thumbnails.default.url, item.snippet.title.substr(0, 20) + "...", item.snippet.channelTitle, date + " " + time, item.id.videoId);
      $('.videos').append(card)
    });
  });
};

$('form').on('submit', function(e){
  e.preventDefault();
  searchvideo(document.getElementById("searchyt").value);
})

$$('.utube').tap(function(){
  socket.emit("videoyt", $$(this).attr("id"))
  window.location = '/remote'
})
