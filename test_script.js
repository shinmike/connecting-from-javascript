const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let name = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE '%' || $1 || '%' OR last_name LIKE '%' || $1 || '%';", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Result:', result.rows);
    console.log('Found', result.rows.length, 'person(s)'); //output: 1
    result.rows.forEach(function (row) {
      console.log(row);
    });
    client.end();
  });
});