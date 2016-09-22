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

//funcao shell
function run_shell(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer); });
    child.stdout.on('end', end);
}

//server socket
io.sockets.on('connection', function(socket){
  socket.on("mainscreen", function(object){
    socket.type = "mainscreen";
    ss = socket;
  });
  socket.on("remotecontrol", function(object){
    socket.type = "remote";
  });
  socket.on("videoyt", function(object){
    var runShell1 = new run_shell('rm',['yt.mp4'],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            console.log('deletando o arquivo já existente');
        });
        
    var id = object, url = "http://www.youtube.com/watch?v="+object;
    
    var runShell2 = new run_shell('youtube-dl',['-o','yt.mp4 ',url],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            omx.start('yt.mp4');
            console.log('Vídeo iniciado');
        });
  });
});