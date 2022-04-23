const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// (http, {
//     cors: {
//         origin: "http://localhost:3001",
//         methods: ["GET", "POST"],
//         //allowedHeaders: ["my-custom-header"],
//         credentials: true
//     }
// });app.use(bodyParser.json())

// const corsOptions = {
//     origin: '*',
//     credentials:true,
//     optionSuccessStatus:200,
//   }

app.use(cors());
//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
//   });

// app.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
//     next();
// });

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ res: "I am alive" });
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("listening on *:8080");
});
