const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'https://mygamescore-86946.web.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8100",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('videoChange', (newSource) => {
    io.emit('videoChange', newSource);
  });

  socket.on('score', (newSource) => {
    io.emit('score', newSource);
  });

  socket.on('set', (newSource) => {
    io.emit('set', newSource);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
