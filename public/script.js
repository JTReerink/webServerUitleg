const socket = io();

let personName;

let message = document.getElementById('input');

let button = document.getElementById('submit');


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
        socket.emit('chat message', message.value);
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


