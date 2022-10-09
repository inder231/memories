import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// ========================== GET ALL POST ===============
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// ==================== GET SINGLE POST =================
export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with this id");
    const post = await PostMessage.findById(_id);
    if (!post) {
      return res.status(404).send("No post with this id");
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
/// ================ SEARCHED POSTS =============================
export const getSearchedPosts = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// ===================== CREATE NEW POST =================
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// ======================= UPDATE POST =======================
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json("Post Delete Successfully");
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
// ===================== LIKE_POST ===========================
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(400).json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with this id");
    }

    let post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // deslike the post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
// ==================== COMMENT THE POST =================
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
