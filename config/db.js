const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_kost",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
