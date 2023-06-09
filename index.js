const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./backend/data/data");
const connectDB = require("./backend/config/db");
const userRoutes = require("./backend/routes/userRoutes");
const colors = require("colors");
const chatRoutes = require("./backend/routes/chatRoutes");
const messageRoutes = require("./backend/routes/messageRoutes");
const {
  notFound,
  errorHandler,
} = require("./backend/middleWare/errMiddleWare");
dotenv.config();
connectDB();
const app = express();
//add cors
const cors = require("cors");
const { connect } = require("mongoose");
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
const PORT = 5000 || process.env.PORT;
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1588815",
  key: "271e6288274030d8251a",
  secret: "f4875429002ed9e85c90",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
// Add headers to allow cross-origin requests
app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Set the Access-Control-Allow-Methods header to allow GET, POST, PUT, DELETE, and OPTIONS methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // Set the Access-Control-Allow-Headers header to allow the Origin, X-Requested-With, Content-Type, Accept, and Authorization headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // Call next() to pass the request to the next middleware function
  next();
});

app.get("/", (req, res) => {
  res.send("api is running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const chat = chats.find((c) => c._id === req.params.id);
//   res.send(chat);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", (userData) => {
    console.log("user Disconnected");
    socket.leave(userData._id);
  });
});
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://paradox:<password>@chatapp.hqh2cgo.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
