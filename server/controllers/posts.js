import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postsMessages = await PostMessage.find();
    res.status(200).json(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(req.body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
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

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(400).json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with this id");
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userid));
    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // deslike the post
      post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
