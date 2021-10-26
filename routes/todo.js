var express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/todos", async (req, res) => {
    const todo = await Todo.find();
    res.json(todo);
});

router.post("/todos", async (req, res) => {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description
    });
    await todo.save();
    res.json(todo);
  });

module.exports = router;