async function getUsersList(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function getUser(db, username) {
  const users = await getUsersList(db);
  return users.find((item) => item.username === username);
}

async function createUser(db, { username, password }) {
  return new Promise((resolve, reject) =>
    db.run(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
}

async function syncUsers(db, users) {
  for (let i = 0; i < users.length; i++) {
    const exists = await getUser(db, users[i].username);
    if (!exists) {
      await createUser(db, users[i]);
    }
  }
}

module.exports = {
  getUsersList,
  getUser,
  syncUsers,
};
