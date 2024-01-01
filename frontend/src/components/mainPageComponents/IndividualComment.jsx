import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import axios from "../../axios";
import Button from "@mui/material/Button";

function IndividualComment(props) {
  const { author, text, cid } = props.comment;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  //   const [currentText, setCurrentText] = useState(text);
  const { pid, fetchArticles } = props;

  const canEdit = author === props.username;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Save the edited comment and update the UI
    onEdit();
    setIsEditing(false);
  };

  const onEdit = async () => {
    const response = await axios.put(`/articles/${pid}`, {
      text: editedText,
      commentId: cid,
    });
  };

  return (
    <div className="comment">
      <div className="comment-info">
        <DialogTitle className="comment-author">{author}</DialogTitle>
        <DialogTitle className="comment-time">{props.comment.date}</DialogTitle>
      </div>
      <DialogContent className="comment-text">
        {isEditing ? (
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <Button variant="outlined" onClick={handleSaveEdit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <p>{editedText}</p>
            {canEdit && (
              <Button variant="outlined" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </>
        )}
      </DialogContent>{" "}
    </div>
  );
}

export default IndividualComment;
