const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./backend/data/data");
const connectDB = require("./backend/config/db");
const userRoutes = require("./backend/routes/userRoutes");
const colors = require("colors");
const chatRoutes = require("./backend/routes/chatRoutes");
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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
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
