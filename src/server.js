import http from "http";
import express from "express";
import socketio from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = socketio(httpServer);

wsServer.on("connect", socket => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 3000)
    });
});

httpServer.listen(3000, handleListen);

/*
import webSocket from "ws"
const wss = new webSocket.Server({server});
const sockets = [];

wss.on("connection", (socket) => {
    socket["nickname"] = "Unknown";
    sockets.push(socket);
    console.log("Connected to Browser ⭕");
    socket.on("close", () => console.log("Disconnected from Browser ❌"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case "new_message":
                for(let i = 0; i < sockets.length; i++) {
                    if(socket === sockets[i])
                        continue;
                    sockets[i].send(`${sockets[i].nickname}: ${message.payload}`);
                }
                break;
            case "nickname":
                const bn = socket.nickname;
                socket["nickname"] = message.payload;
                socket.send("nickname changed: " + bn + " -> " + socket.nickname);
                break;
            default:
                console.log("정의되지 않은 타입입니다.", message.type);
                break;
        }
    });
});

server.listen(3000, handleListen); 
*/

