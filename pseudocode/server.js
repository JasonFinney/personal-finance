var orm = require("./config/orm");
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", selectFunc("tasks"));
app.post("/tasks", insertFunc("tasks", "task", newMovie));
app.put("/tasks/:id", updateFunc("tasks", req.body.task, req.params.id));
app.delete("/tasks/:id", deleteFunc("tasks", req.params.id));

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});