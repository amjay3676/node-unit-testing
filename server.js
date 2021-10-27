const express = require("express");
const posts = require("./routes/posts");
const todos = require("./routes/todo");
const users = require("./routes/user");
require("dotenv").config();
const cors = require("cors");
  const app = express();
  app.use(express.json());
  app.use("/api", posts);
  app.use("/api", todos);
  app.use("/api", users);


module.exports = app;
