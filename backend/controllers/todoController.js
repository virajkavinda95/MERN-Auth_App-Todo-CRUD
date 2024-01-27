const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");
const User = require("../models/userModel");

//@desc Get Todos
//@route GET /api/todos
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json(todos);
});

//@desc Create Todos
//@route POST /api/todos
//@access Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  const todo = await Todo.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(todo);
});

//@desc Update Todos
//@route PUT /api/todos/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTodo);
});

//@desc Delete Todos
//@route DELETE /api/todos/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Data not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  res.status(200).json({ messgae: `${res.params.id} goal deleted` });
});

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
