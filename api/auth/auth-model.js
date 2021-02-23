const db = require("../config/db-config");

module.exports = {
  add,
  findByEmail,
};

async function add(user) {
  const id = await db("users").insert(user);
  return id;
}

async function findByEmail(email) {
  console.log(email);
  const user = await db("users").where("user_email", email).first();
  return user;
}
