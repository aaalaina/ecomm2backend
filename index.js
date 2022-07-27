const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const port = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));




const pool  = mysql.createPool({
  connectionLimit : 8,
  host            : process.env.HOST,
  user            : process.env.USERNAME,
  port            : process.env.DB_PORT,
  password        : process.env.PASSWORD,
  database        : process.env.DATABASE
});
//req means REQUIRE....not request...... crazy
app.get("/ProductList", (req,res) => {
      pool.query(`SELECT * FROM products`, (err, results) => {
        if (err) {
          console.log(err)
        } else {res.send(results)}
      })
    });




app.listen(3000, () =>
console.log("Running server on port 3000!")
)