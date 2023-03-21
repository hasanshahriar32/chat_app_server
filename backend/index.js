const express = require("express");
const { chats } = require("./data/data");
const app = express();
const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
