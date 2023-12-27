const express = require("express");
const todosRoute = express.Router();
const fs = require("fs");
const path = require("path");

// lấy ra dữ liệu từ todos.json
// http://localhost:8082/api/v1/todos
todosRoute.get("/", (req, res) => {
  const jsonString = fs.readFileSync(
    path.join(__dirname, "../ask-community-project/todos.json")
  );
  const jsonData = JSON.parse(jsonString);
  res.status(200).json(jsonData);
});

// lấy ra dữ liệu từ todos.json theo id
// http://localhost:8082/api/v1/todos/:id
todosRoute.get("/:id", (req, res) => {
  const jsonString = fs.readFileSync(
    path.join(__dirname, "../ask-community-project/todos.json")
  );
  const jsonData = JSON.parse(jsonString);
  const byId = jsonData.find((todos) => todos.id == req.params.id);
  res.status(200).json(byId);
});

// thêm dữ liệu vào todos.json
// http://localhost:8082/api/v1/todos
todosRoute.post("/", (req, res) => {
  const jsonString = fs.readFileSync(
    path.join(__dirname, "../ask-community-project/todos.json")
  );
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body;

  const dataCreate = {
    userId,
    title,
    completed,
    id: jsonData[jsonData.length - 1].id + 1,
  };

  jsonData.push(dataCreate);

  fs.writeFileSync(
    path.join(__dirname, "../ask-community-project/todos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );

  res.status(200).json(dataCreate);
});

// thay đổi dữ liệu theo id
// http://localhost:8082/api/v1/todos/:id
todosRoute.put("/:id", (req, res) => {
  const jsonString = fs.readFileSync(
    path.join(__dirname, "../ask-community-project/todos.json")
  );
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body;

  const listUpdated = jsonData.map((todos) => {
    if (todos.id == req.params.id) {
      todos.userId = userId;
      todos.title = title;
      todos.completed = completed;
    }
    return todos;
  });

  fs.writeFileSync(
    path.join(__dirname, "../ask-community-project/todos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );

  res.status(200).json(req.body);
});

module.exports = todosRoute;
