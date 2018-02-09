const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const checkUser = (req, res, next) => {
    db.any("SELECT username FROM users WHERE username=${username}", {username: req.body.username})
      .then(users => {
          if(users.length === 0) {
            next();
            return;
          }
          res.status(400).json({message: "user already exists"});
          return;
      })
      .catch((err) => {
          console.log("err:", err);
        res.status(500).json({message: "error creating user"});
      });
};

function createUser(req, res, next) {
    const hash = authHelpers.createHash(req.body.password);
    console.log("create user hash:", hash);
    db
      .none(
        "INSERT INTO users (username, password_digest) VALUES (${username}, ${password})",
        { username: req.body.username, password: hash }
      )
      .then(() => {
        res.send(`created user: ${req.body.username}`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("error creating user");
    });
}

function logoutUser(req, res, next) {
    req.logout();
    res.status(200).send("log out success");
};
  
function getSingleUser(req, res, next) {
    db
      .any("SELECT * FROM users WHERE username = ${username}", req.user)
      .then(function(data) {
        res.status(200).json({
          status: "success",
          data: data,
          message: "Fetched one user"
        });
      })
      .catch(function(err) {
        return next(err);
      });
  }
  
  const updateSingleUser = (req, res, next) => {
    db
      .none(
        "update users set username = ${newName} where username = ${username}",
        req.body
      )
      .then(function(data) {
        res.status(200).json({
          status: "success",
          message: "Changed one user"
        });
      })
      .catch(function(err) {
        return next(err);
      });
};

module.exports = {
    checkUser,
    createUser,
    logoutUser,
    getSingleUser,
    updateSingleUser,
};