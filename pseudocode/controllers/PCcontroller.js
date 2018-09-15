var express = require("express");
var router = express.Router();

var code = require("../models/code.js");

router.get("/", function (req, res) {
    code.all(function (data) {
        var hbsObject = {
            tasks: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/tasks", function (req, res) {
    code.create([
        "name", "completed"
    ], [
            req.body.name, req.body.completed
        ], function (result) {
            console.log("name: " + req.body.name + "completed: " + req.body.completed);
            res.json({ id: result.insertId });
        });
});

router.put("/api/tasks/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    code.update({
        completed: req.body.completed
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/tasks/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    code.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
module.exports = router;