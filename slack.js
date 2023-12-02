const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
// console.log(namespaces[0]);

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("messageFromServer", {data: "Welcome to the SocketIO server!"});
  socket.on('dataToServer', (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.join("level1");
  socket.to("level1").emit("joined", `${socket.id}: I have joined the level one room`);
});

// loop through each namespace and look for a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});