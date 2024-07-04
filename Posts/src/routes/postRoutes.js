// src/routes/postRoutes.js
const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
} = require("../controllers/postController");
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:postId", getPostById);

module.exports = router;
