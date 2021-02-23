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

  Users.add(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", isValidLogin, (req, res) => {
  const { user_email, user_password } = req.body;

  Users.findByEmail(user_email)
    .then((user) => {
      const { user_first_name } = user;
      if (user && bcryptjs.compareSync(user_password, user.user_password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome, ${user_first_name}.`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal Error. ${err}` });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.user_email,
  };
  const options = {
    expiresIn: 1000 * 60,
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
