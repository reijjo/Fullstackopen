import { Link } from "react-router-dom";

const WhosIn = ({ user, logout }) => {
  return (
    <div
      style={{
        display: "inline",
        backgroundColor: "gray",
        padding: "2vh",
        width: "100vw",
      }}
    >
      <Link to="/" style={{ margin: "0 1vw" }}>
        blogs
      </Link>
      <Link to="/users" style={{ margin: "0 1vw" }}>
        users
      </Link>
      {user.name} logged in
      <button onClick={logout} style={{ margin: "0 1vw" }}>
        log out
      </button>
    </div>
  );
};

export default WhosIn;
