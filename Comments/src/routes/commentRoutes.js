// src/routes/commentRoutes.js
const express = require("express");
const {
  getComments,
  createComment,
  getAllComments,
  getCommentById,
} = require("../controllers/commentController");
const router = express.Router();

router.get("/comments/", getAllComments); // List all comments
router.get("/comments/:commentId", getCommentById); // Get comment by ID
router.get("/post/:postId/comments", getComments); // Get comments by post ID
router.post("/post/:postId/comments", createComment); // Create comment for a post

module.exports = router;
