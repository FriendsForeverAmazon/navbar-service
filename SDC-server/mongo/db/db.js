const mongoose = require('mongoose');
var Redis = require('ioredis');
const url = "mongodb://34.238.49.225:27017/";

const connection = mongoose.createConnection(url,{dbName:'navbar'});
var cache = new Redis();

module.exports = { connection, cache };