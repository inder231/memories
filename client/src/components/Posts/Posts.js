import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((store)=>store.appreducer.posts);
  console.log(posts);
  return (
    <>
    <div>Posts</div>
    </>
  )
}

export default Posts