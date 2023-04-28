const dotenv = require("dotenv");
const { Database } = require("sqlite3");
const users = require("./users.json");
const { syncUsers, getUsersList } = require("./user-functions");
dotenv.config();

const db = new Database(process.env.dbPath);

async function main() {
  await syncUsers(db, users);
  const results = await getUsersList(db);
  console.log(results);
}

main();
