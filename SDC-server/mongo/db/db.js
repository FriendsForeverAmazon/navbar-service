const mongoose = require('mongoose');
var Redis = require('ioredis');
const url = "mongodb://34.238.49.225:27017/";
var cache = new Redis("redis://3.92.213.254:6379/");

const connection = mongoose.createConnection(url,{dbName:'navbar'});

module.exports = { connection, cache };