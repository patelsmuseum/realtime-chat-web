const socket = io();
let username;
let textarea = document.querySelector("#textarea");
let messagearea = document.querySelector(".message__area");
do {
  username = prompt("Enter Username");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(msg) {
  let msgobj = {
    user: username,
    message: msg.trim(),
  };
  // append
  appendMessage(msgobj, "outgoing");
  textarea.value = '';
  scrollToDown
  // send to server
  socket.emit("message", msgobj);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messagearea.appendChild(mainDiv);
}


// receiver

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToDown()
})

// scroll down
function scrollToDown(){
    messagearea.scrollTop = messagearea.scrollHeight
}
