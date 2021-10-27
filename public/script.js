const socket = io();

let personName = prompt("Vul hier je naam in");

let message = document.getElementById('input');
let button = document.getElementById('submit');

let isTyping = false;

let personIDNumber;

//stuurt direct naar server eigen naam + bericht
socket.emit('new connect', personName + " joined the chat");

//Krijgt een nummer vanuit server en registreert dat locaal
socket.on('personID', (personID) => {
    personIDNumber = personID;
    console.log(personIDNumber);
})

//registeert of er een emit vanuit server is met nieuwe connect
socket.on('new connect', (newConnect) => {
    
    //maakt een bericht aan om te laten zien wie er is gejoined
    let newConnectMessage = document.createElement('li');
    newConnectMessage.setAttribute('id', 'newConnect')
    const d = new Date();
    let timestamp = d.toLocaleTimeString();
    newConnectMessage.innerHTML = timestamp  + " " + newConnect;
    document.getElementById('messages').appendChild(newConnectMessage);
})

//Chatbericht verzenden
button.addEventListener('click', (e)=>{
    e.preventDefault();
    if (message.value) {
        socket.emit('chat message', personName + ": " + message.value);
        message.value = "";
    }
});

//Chatberichten binnen krijgen
socket.on('server response', (data) => {
    console.log(data);
    let chatBalloon = document.createElement('li');
    chatBalloon.setAttribute('id', 'chatBalloon');
    chatBalloon.innerHTML = data;
    document.getElementById('messages').appendChild(chatBalloon);
});

//"is typing" berichten
message.addEventListener('input', () => {
    
    if(isTyping === false){
        console.log("is typing");
        socket.emit('is typing', personIDNumber, personName)
        isTyping = true;
        
    };
    if(message.value.length < 1) {
            isTyping = false;
            stopTypen();
        }
    
});

button.addEventListener('click', () => {
    isTyping = false;
    stopTypen();
});

function stopTypen() {
    socket.emit('niet typen', personIDNumber)
}

socket.on('is typing', (data1, data2) => {
    //beide data zijn data van andere chatPersoon
    //data1 = personIDNumber
    //data2 = personName

    let connectBalloon = document.createElement('li');
    connectBalloon.setAttribute('id', data1)
    connectBalloon.innerHTML = data2 + " is typing...";
    document.getElementById('messages').appendChild(connectBalloon);
})

socket.on('niet typen', (data) =>{
    //data = personIDNummer van ander chatPersoon
    let connectBalloon = document.getElementById(data)
    connectBalloon.remove()
})