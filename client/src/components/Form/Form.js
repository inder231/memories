import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
const Form = () => {
  const classes = useStyles();
  const handleSubmit = () => {};
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const handlePostChange = (e) => {
    const [name, value] = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const clear=()=>{}
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Creating a Memory</Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            onChange={handlePostChange}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            onChange={handlePostChange}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            onChange={handlePostChange}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            onChange={handlePostChange}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth >Submit</Button>
          <Button variant="contained" color="secondary" fullWidth onClick={clear} >Clear</Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
