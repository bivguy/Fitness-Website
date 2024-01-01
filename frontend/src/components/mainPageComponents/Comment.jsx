import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IndividualComment from "./IndividualComment";
import Button from "@mui/material/Button";
import axios from "../../axios";

export default function Comment(props) {
  const { open, toggleOpen, fetchArticles, pid, username } = props;

  const [comments, setComments] = useState(props.comments || []);
  const [newCommentText, setNewCommentText] = useState("");

  const addComment = async () => {
    const response = await axios.put(`/articles/${pid}`, {
      text: newCommentText,
      commentId: "-1",
    });

    setComments(response.data.articles[0].comments);
  };

  return (
    <Dialog open={open}>
      <div className="comment-container">
        <div className="toggle-comment-container">
          <p className="toggle-comment" onClick={toggleOpen}>
            Close
          </p>
        </div>
        <div className="comments">
          {comments.map((comment) => (
            <IndividualComment
              key={comment.cid}
              comment={comment}
              cid={comment.cid}
              pid={pid}
              username={username}
              fetchArticles={fetchArticles}
            />
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
      {/* Button to submit the new comment */}
      <Button variant="outlined" onClick={() => addComment()}>
        Add Comment
      </Button>
    </Dialog>
  );
}
