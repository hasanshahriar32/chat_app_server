const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./backend/data/data");
const app = express();
dotenv.config();
const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const chat = chats.find((c) => c._id === req.params.id);
  res.send(chat);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
