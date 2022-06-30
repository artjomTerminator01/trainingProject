const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/index.hbs", (req, res) => {
  res.render("index", {});
});

app.get("/form.hbs", (req, res) => {
  res.render("form", {});
});
app.get("/result.hbs", (req, res) => {
  res.render("result", {});
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
