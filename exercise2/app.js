const express = require("express");
const app = express();
const todosRoute = require("./routes/todos.route");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// todos route
app.use("/api/v1/todos", todosRoute);

app.listen(8082, () => {
  console.log("Server running port 8082");
});
