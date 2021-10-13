var message = document.getElementById('chatBox');

let button = document.getElementById('submit');

button.addEventListener('click', (e)=>{
    e.preventDefault();
    if (message.value) {
        socket.emit('chat message', input.value);
        input.value = "";
    }
    
    
    
    
    /* Dit was een poging.
    let chatBalloon = document.createElement('p');
    let message = document.getElementById('chatBox').value;
    chatBalloon.innerHTML = message;
    chatBalloon.style.color = 'red';
    */

    document.body.appendChild(chatBalloon);
})

