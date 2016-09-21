var socket = io();

$$('.mdl-layout__content').swipeRight(function(){
  $('.mdl-layout__drawer-button').click();
});

socket.on('connect', function(data){
    console.log("Servidor de socket conectado (Controle Remoto)");
    socket.emit('remotecontrol');
});
