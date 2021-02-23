const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");

const bcryptjs = require("bcryptjs");

const Users = require("./auth-model");

const { isValidRegister, isValidLogin, isUnique } = require("./middleware");

router.post("/register", isValidRegister, isUnique, (req, res) => {
  const credentials = req.body;

  const rounds = process.env.BCYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.user_password, rounds);
  credentials.user_password = hash;

  res.status(200).json("made it through!");

  // Users.add(credentials)
  //   .then((user) => {
  //     res.status(201).json(user);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err });
  //   });
});

module.exports = router;
