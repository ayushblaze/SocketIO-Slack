const socket = io('http://localhost:8000'); // the / (main) namespace
// const socket2 = io('http://localhost:8000/admin'); // the /admin namespace
const socket2 = io('http://localhost:8000/wiki');
const socket3 = io('http://localhost:8000/mozilla');
const socket4 = io('http://localhost:8000/linux');

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", {data: "Data from the client!"});
});

socket.on("joined", (msg) => {
  console.log(msg); 
});

socket2.on("welcome", (dataFromServer) => {
  console.log(dataFromServer);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", {text: newMessage});
});