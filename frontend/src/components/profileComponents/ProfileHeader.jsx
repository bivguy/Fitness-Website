import { Link, useNavigate } from "react-router-dom";

function ProfileHeader() {
  const navigate = useNavigate();
  return (
    <div className="main-header-container">
      <div className="main-header">
        <h1>PR</h1>
        <div className="mainBtns">
          <button
            className="profileBtn"
            onClick={() => {
              navigate("/MainPage");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
