const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.write("<h1>Einstuan</h1>");
  res.end();
});

app.listen(8081, () => {
  console.log("Server running port 8081");
});
