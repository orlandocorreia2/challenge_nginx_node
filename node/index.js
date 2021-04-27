const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);
  connection.connect();

  let sql = `DROP TABLE people`;

  // connection.query(sql);

  sql = `CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL)`;

  connection.query(sql);

  sql = `INSERT INTO people(name) values('Orlando Nascimento')`;
  connection.query(sql);

  let liHTML = "";

  connection.query("SELECT * FROM people", (error, results, fields) => {
    if (error) throw error;

    if (results && results.length) {
      results.forEach((result) => {
        liHTML += `<li><strong>ID:</strong> ${result.id} - <strong>Nome:</strong> ${result.name}</li>`;
      });
    }

    res.send(`<h1>Full Cycle Rocks!</h1><ul>${liHTML}</ul>`);
  });

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
