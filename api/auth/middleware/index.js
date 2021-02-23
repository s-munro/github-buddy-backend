const db = require("../../config/db-config");

module.exports = {
  isValidRegister,
  isValidLogin,
  isUnique,
};

async function isValidRegister(req, res, next) {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_password,
  } = req.body;
  if (!user_first_name || !user_last_name || !user_email || !user_password) {
    return res.status(400).json({ message: "Missing credential(s)." });
  }
  return next();
}

async function isValidLogin(req, res, next) {
  return next();
}

async function isUnique(req, res, next) {
  const { user_email } = req.body;
  const returnedUser = await db("users")
    .where("user_email", user_email)
    .first();

  if (!returnedUser) {
    return next();
  } else {
    res.status(400).json({ error: "Email taken." });
  }
}
