const pool = require("../../configuration/database");

module.exports = {
  createUser: (data, callback) => {
    pool.query(
      `INSERT INTO tb_users (firstName, lastName, gender, email, password, phoneNumber) VALUES (?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.phone,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `SELECT tb_users.userNo,tb_users.firstName,tb_users.lastName,tb_users.gender,tb_users.email,tb_users.phoneNumber,tb_users.createdAt FROM tb_users ORDER BY tb_users.userNo DESC`,
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getUser: (uid, callback) => {
    pool.query(
      `SELECT tb_users.userNo,tb_users.firstName,tb_users.lastName,tb_users.gender,tb_users.email,tb_users.phoneNumber,tb_users.createdAt FROM tb_users WHERE tb_users.userNo = ? ORDER BY tb_users.userNo DESC`,
      [uid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },
  updateUser: (data, callback) => {
    pool.query(
      `UPDATE tb_users SET tb_users.firstName = ?, tb_users.lastName = ?, tb_users.gender = ?, tb_users.email = ?, tb_users.password = ?, tb_users.phoneNumber = ? WHERE tb_users.userNo = ?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.phone,
        data.uid,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },

  deleteUser: (uid, callback) => {
    pool.query(
      `DELETE FROM tb_users WHERE tb_users.userNo = ?`,
      [uid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },

  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM tb_users WHERE tb_users.email = ?`,
      [email],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },
};
