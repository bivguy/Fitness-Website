import { useState, useEffect } from "react";
import statusImgPath from "../../assets/status-img.jpg";
import axios from "../../axios";

function ProfileStatus(props) {
  const { loggedProfileInfo, fetchUserData } = props;

  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setStatus(loggedProfileInfo.headline);
    setName(loggedProfileInfo.displayname);
  }, [loggedProfileInfo]);

  const [newStatus, setNewStatus] = useState("");

  // Changing the status of the logged in user
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setStatus(newStatus);
    await axios.put("/headline", { headline: newStatus });
    setNewStatus("");
  };

  return (
    <div className="status-container">
      <h1 className="profile-status-name">{name}</h1>
      <div className="status-img-container">
        <img className="status-img" src={loggedProfileInfo.avatar} alt="" />
      </div>

      <div className="status">
        <h1 className="status-name">My Status</h1>
        <h2 className="status-value"> {status}</h2>
        <form action="" className="set-status-form">
          <input
            className="enter-status"
            type="text"
            onChange={(e) => setNewStatus(e.target.value)}
            value={newStatus}
            placeholder="Enter New Status"
          />
          <button className="status-btn" onClick={handleStatusUpdate}>
            New Status
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileStatus;
