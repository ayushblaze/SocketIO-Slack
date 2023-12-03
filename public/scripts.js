const socket = io('http://localhost:8000'); // the / (main) namespace

// Listen for namespaceList event, list all namespaces.
socket.on("namespaceList", (namespaceData) => {
  console.log("The list of namespaces has arrived!!");
  // console.log(namespaceData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  namespaceData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace"><img src="${ns.img}" /></div>`;
  });
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", {data: "Data from the client!"});
});

// document.querySelector("#message-form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const newMessage = document.querySelector("#user-message").value;
//   socket.emit("newMessageToServer", {text: newMessage});
// });

