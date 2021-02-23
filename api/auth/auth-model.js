const db = require("../config/db-config");

module.exports = {
  add,
};

async function add(user) {
  const id = await db("users").insert(user);
  return id;
}
