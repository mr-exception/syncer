const dotenv = require("dotenv");
const { Database } = require("sqlite3");
dotenv.config();

const db = new Database(process.env.dbPath);
db.each("SELECT * FROM users", (err, row) => {
  console.log(row);
});
