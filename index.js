const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server);
const fs = require('fs')

app.use(express.static('public'));

//Bij connectie => laad in 'index.html'
app.get('/',(req,res) =>{
    res.sendFile('index.html')
})

//bij connectie met .../jaap => laad in (tekst) 'Hallo'
app.get('/jaap',(req,res) =>{
    res.send('Halloo')
})

//registreren of er een nieuwe connect is
io.on('connection', (socket)=>{
    console.log('nieuwe connect');
    
    //registreren of er een emit met 'chat message' wordt verzonden vanaf client
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        
        //het uitsturen van het bericht naar alle huidige connects
        io.emit('server response', msg)
    });
});

server.listen(3000, ()=>{
    console.log('listening')
})

