const socket = io();

var message = document.getElementById('chatBox');

let button = document.getElementById('submit');

button.addEventListener('click', (e)=>{
    e.preventDefault();
    if (message.value) {
        socket.emit('chat message', message.value);
        message.value = "";
    }})
    
socket.on('server response', (data) => {
    console.log(data);
});
    
    
    /* Dit was een poging.
    let chatBalloon = document.createElement('p');
    let message = document.getElementById('chatBox').value;
    chatBalloon.innerHTML = message;
    chatBalloon.style.color = 'red';
    */

   // document.body.appendChild(chatBalloon);


