const mongoose = require('mongoose');
var Redis = require('ioredis');
const url = "mongodb://3.88.197.225:27017/";

const connection = mongoose.createConnection(url,{dbName:'navbar'});
var cache = new Redis();

module.exports = { connection, cache };