import { useState, useEffect } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setQueryToken } from "./requests";

import Loginform from "./components/Loginform";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useMessageValue } from "./MessageContext";
import WhosIn from "./components/WhosIn";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import OneUser from "./components/OneUser";
import BlogInfo from "./components/BlogInfo";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [notification, setNotification] = useMessageValue();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      blogService.setToken(user.token);
      setQueryToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedIn", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        type: "SHOW_MESSAGE",
        payload: {
          message: exception.response.data.error,
        },
      });
      setTimeout(() => {
        setNotification({
          type: "CLEAR_MESSAGE",
        });
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const logout = () => {
    window.localStorage.removeItem("loggedIn");
    window.location.reload();
  };

  return (
    <div>
      {!user && (
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={notification}
        />
      )}
      {user && (
        <Router>
          <>
            <WhosIn user={user} logout={logout} />
            <h2>blog app</h2>
            <Notification message={notification} />
            <Routes>
              <Route
                path="/"
                element={
                  <Blogs user={user} setNotification={setNotification} />
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<OneUser />} />
              <Route path="/blogs/:id" element={<BlogInfo />} />
            </Routes>
          </>
        </Router>
      )}
    </div>
  );
};

export default App;
