const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
// console.log(namespaces[0]);

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  // build an array to send back info with the img and endpoint for each NS
  let namespaceData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    }
  });
  // console.log(namespaceData);
  // ! Send the namespaceData back to the client, we'll socket and not io
  // ! because we only want to send the data to this client (socket).
  socket.emit("namespaceList", namespaceData);
});

// loop through each namespace and look for a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});