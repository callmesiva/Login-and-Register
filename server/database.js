const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@1010",
  database: "crud-operations"
});

 module.exports = con;
