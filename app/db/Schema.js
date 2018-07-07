const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const db = mongoose.createConnection('127.0.0.1', 'lcc'); //创建一个数据库连接



//首页Banner图
var ListSchema = new Schema({
    key: String
});

exports.List = db.model('List', ListSchema);
