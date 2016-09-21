function searchvideo(query){
  var apiKey = "AIzaSyAGPzQ_KugklsczsxBzTqBwars3SsB4V2Q";
  var max_videos = 10;
  var url = "https://www.googleapis.com/youtube/v3/search?order=viewcount&part=snippet&q=" + escape(query) + "&type=video+&videoDefinition=high&key=" + apiKey + "&maxResults="+ max_videos;

  $.getJSON(url, function(json){
    console.log(json);
  });
}

$('#searchyt').change(function(){
  searchvideo(document.getElementById("searchyt").value);
})
