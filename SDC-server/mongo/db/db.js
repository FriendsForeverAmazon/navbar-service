const mongoose = require('mongoose');
var Redis = require('ioredis');
const url = "mongodb://52.201.225.62:27017/";
var cache = new Redis("redis://54.86.203.33:6379/");

const connection = mongoose.createConnection(url,{dbName:'navbar'});

module.exports = { connection, cache };