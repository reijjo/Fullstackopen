import { useEffect, useState } from "react";
import React from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.allUsers();
      setUsers(res);
    };
    getUsers();
  }, []);

  console.log("users", users);

  const style = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    width: "40vw",
  };

  return (
    <>
      <h2>Users</h2>
      <div style={style}>
        <div></div>
        <div>
          <strong>blogs created</strong>
        </div>
        {users.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <div>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </div>
              <div>{user.blogs.length}</div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Users;
