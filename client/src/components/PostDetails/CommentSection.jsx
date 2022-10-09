import React from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/localstorage";
import { commentPost } from "../../redux/Appreducer/posts";
import useStyles from "./styles";
import { useState } from "react";
import { useRef } from "react";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.appreducer);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const user = getFromLocalStorage("profile");
  const commentsRef = useRef();
  const handleAddComment = () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    setComment("");
    dispatch(commentPost(finalComment, post._id)).then((res) => {
      if (res.type === "COMMENT_POST_SUCCESS") {
        setComments(res?.payload?.comments);
        commentsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.length > 0 &&
            comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(":")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              lebel="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="outlined"
              color="primary"
              onClick={handleAddComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
