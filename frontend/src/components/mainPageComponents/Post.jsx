import { React, useEffect, useState } from "react";
import liftingPost from "../../assets/liftingPost.jpg";
import Comment from "./Comment";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import axios from "../../axios";
function Post(props) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(props.text);
  const { owned, fetchArticles, image } = props;

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/articles/${props.pid}`, {
        text: editedText,
      });
      // Update the local state with the edited text
      setEditedText(editedText);
      // Exit edit mode
      toggleEditMode();
    } catch (error) {
      console.error("Error editing article:", error);
    }
  };

  return (
    <div className="post-content">
      {image !== "" && <img className="post-img" src={image} alt="" />}
      <div className="other-post-info">
        <p className="post-body">{props.author}</p>
        <p className="post-body">{props.date}</p>
      </div>
      <div className="post-text">
        <h1 className="post-title">{props.title}</h1>
        {editMode ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="edit-textarea"
          />
        ) : (
          <p className="post-body">{editedText}</p>
        )}
      </div>

      <div className="post-btns">
        {owned && (
          <button className="post-edit" onClick={toggleEditMode}>
            {editMode ? "Cancel Edit" : "Edit"}
          </button>
        )}

        {editMode && (
          <button className="post-edit" onClick={handleEdit}>
            Save Edit
          </button>
        )}
      </div>

      <div className="toggle-comments">
        <button onClick={toggleOpen}>
          <ChatBubbleOutlineOutlinedIcon className="comment-icon" />
        </button>
      </div>
      <Comment
        open={open}
        comments={props.comments || []}
        fetchArticles={fetchArticles}
        toggleOpen={toggleOpen}
        pid={props.pid}
        username={props.username}
      />
    </div>
  );
}

export default Post;
