const exp = require("constants");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
app.get("/form.html", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/form.html"));
});
app.get("/result.html", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/result.html"));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
