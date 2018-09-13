var orm = require("./connection");

var orm = {
    selectFunc: function (table) {
        connection.query("SELECT * FROM ??", [table], function (err, data) {
            if (err) throw err;
            res.render("index", { tasks: data });
        });
    },
    insertFunc: function (table, col, value) {
        connection.query("INSERT INTO ?? (??) VALUES (?)", [table, col, value], function (err, result) {
            if (err) throw err;
            res.json({ id: result.insertId });
        });
    },
    updateFunc: function (table, col, value) {
        connection.query("UPDATE ?? SET ?? WHERE id = ?", [table, col, value], function (err, data) {
            if (err) throw err;
            res.status(200).end();
        });
    },
    deleteFunc: function (table, value) {
        connection.query("DELETE FROM ?? WHERE id = ?", [table, value], function (err, data) {
            if (err) throw err;
            res.status(200).end();
        });
    }
}
module.exports = orm;