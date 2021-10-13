const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server);

app.use(express.static('public'));

app.get('/',(req,res) =>{
    res.sendFile('index.html')
})

app.get('/jaap',(req,res) =>{
    res.send('Halloo')
})

io.on('connection', (socket)=>{
    console.log('nieuwe connect');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

app.listen(3000, ()=>{
    console.log('listening')
})