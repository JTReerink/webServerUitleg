const socket = io();

let personName = prompt("Vul hier je naam in");

let message = document.getElementById('input');

let button = document.getElementById('submit');

socket.emit('new connect', personName + " joined the chat");

socket.on('new connect', (newConnect) => {
    let newConnectMessage = document.createElement('li');
    newConnectMessage.setAttribute('id', 'newConnect')
    
    const d = new Date();
    let timestamp = d.toLocaleTimeString();
    newConnectMessage.innerHTML = timestamp  + " " + newConnect;
    document.getElementById('messages').appendChild(newConnectMessage);
})

button.addEventListener('click', (e)=>{
    e.preventDefault();
    if (message.value) {
        socket.emit('chat message', personName + ": " + message.value);
        message.value = "";
    }
});

socket.on('server response', (data) => {
    console.log(data);
    let chatBalloon = document.createElement('li');
    chatBalloon.setAttribute('id', 'chatBalloon');
    chatBalloon.innerHTML = data;
    document.getElementById('messages').appendChild(chatBalloon);
});
    
    
    /* Dit was een poging.
    let chatBalloon = document.createElement('p');
    let message = document.getElementById('chatBox').value;
    chatBalloon.innerHTML = message;
    chatBalloon.style.color = 'red';
    */

   // document.body.appendChild(chatBalloon);


