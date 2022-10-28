const {
  createUser,
  getUserByID,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getAllUsers);
router.get("/:id", checkToken, getUserByID);
router.patch("/", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
