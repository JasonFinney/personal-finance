var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "moviePlanner_db"
});
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM movies;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.render("index", { movies: data });
    });
});

app.post("/movies", function (req, res) {
    connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});

app.put("/movies/:id", function (req, res) {
    connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

app.delete("/movies/:id", function (req, res) {
    connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function (err, result) {
        if (err) {
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});