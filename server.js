const express = require("express");
const posts = require("./routes/posts");
const todos = require("./routes/todo");
  const app = express();
  app.use(express.json());
  app.use("/api", posts);
  app.use("/api", todos);


module.exports = app;
