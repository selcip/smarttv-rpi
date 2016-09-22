var images = [], x = 1, app = document;
var host = document.location.origin;
var socket = io.connect(host);

app.querySelector('.state').innerHTML = "Aguardando controle..";

socket.on('connect', function(data){
    console.log("Servidor de socket conectado (Tela Principal)");
    socket.emit('mainscreen');
});

socket.on('video', function(data){
  alert("youtube.com/?v=" + data);
})

for (let i = 0; i<101; i++){
    images[i] = i+1;
}

app.body.style.backgroundImage = "url('images/bgs/1.jpg')"

function nextImage(){
    (x == 100) ? x = 0 : x += 1;
    app.body.style.backgroundImage = "url('images/bgs/"+ x +".jpg')";
}

function startTimer(){
    setInterval(nextImage, 120000);
}

var relogio = {
    weekdays: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    timeParts: function(){
        var date = new Date(),
            hour = date.getHours();

        return{
            day: relogio.weekdays[date.getDay()],
            date: date.getDate(),
            month: relogio.months[date.getMonth()],
            hour: relogio.appendZero(hour),
            minute: relogio.appendZero(date.getMinutes()),
            second: relogio.appendZero(date.getSeconds()),
        };
    },
    appendZero : function(num){
        if(num < 10){
            return "0" + num;
        }
        return num;
    },
    refresh: function(){
        var parts = relogio.timeParts(12);
        document.getElementById('time').innerHTML = "<span class='hour'>" + parts.hour + "</span><span class='minute'>:" + parts.minute + "</span><span class='second'>:" + parts.second + "</span>";
        document.getElementById('date').innerHTML = parts.month + ", " + parts.day + " " + parts.date;

            var feijao = 'feijao';
            var janta = "arroz" + feijao + "pure"
    },
    start: function(){
        if (relogio.__running){
            clearInterval(relogio.__running);
        }

        relogio.__running = setInterval(function(){
            relogio.refresh();
        }, 1000);
        relogio.refresh();
    }
};

relogio.start();
