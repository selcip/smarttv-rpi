var socket = io();

$$('.mdl-layout__content').swipeRight(function(){
  $('.mdl-layout__drawer-button').click();
});

socket.on("videotitle", function(object){
  console.log(object)
});
