require("dotenv").config();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserByID: (req, res) => {
    const id = req.params.id;
    getUser(id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else if (!result) {
        return res.json({
          success: 0,
          message: "No user record not found",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },

  getAllUsers: (req, res) => {
    getUsers((err, result) => {
      if (err) {
        console.log(err);
        return;
      } else if (!result) {
        return res.json({
          success: 0,
          message: "No users record not found",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "User updated successfully.",
      });
    });
  },
  deleteUser: (req, res) => {
    const uid = req.params.id;
    deleteUser(uid, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "User deleted successfully.",
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (error, result) => {
      if (error) {
        console.log(error);
      } else if (!result) {
        return res.json({
          success: 0,
          message: "Incorrect email or password",
        });
      }
      const results = compareSync(body.password, result.password);
      if (results) {
        result.password = undefined;
        const jsontoken = sign({ results: result }, process.env.TOKEN_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "Incorrect email or password",
        });
      }
    });
  },
};
