const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";

const connection = mongoose.createConnection(url);

module.exports = { connection };