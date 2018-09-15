var orm = require("../config/orm.js");

var code = {
    all: function (cb) {
        orm.all("tasks", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("tasks", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("tasks", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("tasks", condition, function (res) {
            cb(res);
        });
    }
};
module.exports = code;