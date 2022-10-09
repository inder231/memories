import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/Appreducer/posts";
import Post from "./Post/Post";
import useStyles from "./styles";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const {posts,isLoading,isError} = useSelector((store) => store.appreducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  if(posts.lenght&&!isLoading){
    return "No posts exist yet."
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
