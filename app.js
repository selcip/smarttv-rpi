/**______ ______ _____ _____ _    _           _____   _________      __
  |  ____|  ____|_   _/ ____| |  | |   /\    / ____| |__   __\ \    / /
  | |__  | |__    | || |    | |__| |  /  \  | (___      | |   \ \  / /
  |  __| |  __|   | || |    |  __  | / /\ \  \___ \     | |    \ \/ /
  | |    | |____ _| || |____| |  | |/ ____ \ ____) |    | |     \  /
  |_|    |______|_____\_____|_|  |_/_/    \_\_____/     |_|      \/
 */

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    bodyParser = require('body-parser'),
    spawn = require('child_process').spawn,
    omx = require('omxcontrol'),
    ss;

//env
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));
app.use(omx());
//rotas
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/remote', function(req, res){
  res.sendFile(__dirname + '/public/remote.html')
});

app.get('/remote/youtube', function(req, res){
  res.sendFile(__dirname + '/public/youtube.html')
});

app.get('/remote/torrent', function(req, res){
  res.sendFile(__dirname + '/public/torrent.html')
});

app.get('/conteudo', function(req, res){
  res.sendFile(__dirname + '/public/conteudo.html')
});

//server
server.listen(app.get('port'), function(){
  console.log('Feichas TV em execução na porta ' + app.get('port'));
});

//server socket
io.sockets.on('connection', function(socket){
  socket.on("mainscreen", function(object){
    socket.type = "mainscreen";
    ss = socket;
    console.log('Aguardando controle..' + ss);
  });
  socket.on("remotecontrol", function(object){
    socket.type = "remote";
    console.log('Controle remoto pronto..')
  });
  socket.on("videoyt", function(object){
    var url = "http://www.youtube.com/watch?v="+object;

    var runShell = new run_shell('youtube-dl',['-o','%(id)s.%(ext)s','-f','/18/22',url],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            omx.start(object+'.mp4');
        });
  });
});
