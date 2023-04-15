const express = require("express");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addUser,
  deleteChat,
} = require("../controllers/chatControllers");
const { protect } = require("../middleWare/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/:id").delete(protect, deleteChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/removeFromGroup").put(protect, removeFromGroup);
router.route("/addUser").put(protect, addUser);

module.exports = router;
