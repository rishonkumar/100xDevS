const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.json());

let todos = [];

/**
 * Handles POST requests to create a new todo item.
 * Extracts the title and description properties from the req.body object
 * and adds a new todo item to the todos array.
 */
function createTodoItem(req, res) {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
}

/**
 * Handles GET requests to fetch a specific todo item by ID.
 * Searches the todos array for a todo item with the specified ID.
 * If found, returns the todo item as JSON response. Otherwise, returns an error.
 */
function getTodoItem(req, res) {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id.toString() === id);

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
}

/**
 * Handles GET requests to fetch all todo items.
 * Returns the todos array as JSON response.
 */
function getAllTodoItems(req, res) {
  res.json(todos);
}

/**
 * Handles PUT requests to update a specific todo item by ID.
 * Searches the todos array for the specified ID, updates the title and description
 * properties of the todo item, and returns the updated todo item as JSON response.
 * If the ID is not found, returns a 404 error.
 */
function updateTodoItem(req, res) {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
}

/**
 * Handles DELETE requests to delete a specific todo item by ID.
 * Searches the todos array for the specified ID, removes the todo item,
 * and returns a success message if deleted. If the ID is not found, returns a 404 error.
 */
function deleteTodoItem(req, res) {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
}

// Routes
app.get("/todos/:id", getTodoItem);
app.get("/todos", getAllTodoItems);
app.post("/todos", createTodoItem);
app.put("/todos/:id", updateTodoItem);
app.delete("/todos/:id", deleteTodoItem);

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;
