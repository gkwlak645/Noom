const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
let roomName = "";

room.hidden = true;

function addMessage(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.appendChild(li);
}



form.addEventListener("submit", event => {
    event.preventDefault();
    const input_nick= form.querySelector("#name");
    socket.emit("nickname", input_nick.value);
    input_nick.value = "";
    const input_rn = form.querySelector("#room_name");
    socket.emit("enter_room", input_rn.value, () => {
        welcome.hidden = true;
        room.hidden = false;
        const h3 = room.querySelector("h3");
        h3.innerText = `Room ${roomName}`;
        const msgForm = room.querySelector("#msg");
        msgForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = room.querySelector("#msg input");
            const v = input.value;
            socket.emit("new_message", v, roomName, () => {
                addMessage(`You: ${v}`);
            });
            input.value = "";
        });
    });
    roomName = input_rn.value;
    input_rn.value = "";
});

socket.on("welcome", (user) => {
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left😪`);
});

socket.on("new_message", addMessage);