import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getSearchedPosts
} from "../controllers/posts.js";
import { auth } from "../middlewares/auth.js";
const router = Router();

router.get("/search",getSearchedPosts);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
