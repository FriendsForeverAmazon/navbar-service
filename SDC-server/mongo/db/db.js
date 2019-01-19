const mongoose = require('mongoose');
var Redis = require('ioredis');
const url = "mongodb://localhost:27017/";

const connection = mongoose.createConnection(url,{dbName:'navbar'});
var cache = new Redis();

module.exports = { connection, cache };