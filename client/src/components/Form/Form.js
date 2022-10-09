import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, updatePost } from "../../redux/Appreducer/posts.js";
import { getFromLocalStorage } from "../../utils/localstorage";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getFromLocalStorage("profile");
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((store) =>
    currentId ? store.appreducer.posts.find((p) => p._id === currentId) : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createNewPost({ ...postData, name: user?.result?.name },navigate));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Pleaes Sign in to create your own memory!
        </Typography>
      </Paper>
    );
  }
  return (
    <>
      <Paper className={classes.paper} elevation={6} >
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{`${
            currentId ? "Editing" : "Creating"
          } a Memory`}</Typography>
          <TextField
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            label="Tags (comma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              value={postData.selectedFile}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
