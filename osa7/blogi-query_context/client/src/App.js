import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { setQueryToken, getQueryAll, addQueryBlog } from "./requests";

import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Newblog from "./components/Newblog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useMessageValue } from "./MessageContext";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null);

  const queryClient = useQueryClient();
  const [notification, setNotification] = useMessageValue();
  const newBlogMutation = useMutation(addQueryBlog);
  // console.log("notificatio", setNotification);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      blogService.setToken(user.token);
      setQueryToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const blogsResult = useQuery("blogs", getQueryAll);

  if (blogsResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;

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
      // console.log('EXX', exception.response.data.error)
      // setErrorMessage({
      //   message: exception.response.data.error,
      //   style: { color: "red" },
      // });
      setNotification({
        type: "SHOW_MESSAGE",
        payload: {
          message: exception.response.data.error,
        },
      });
      setTimeout(() => {
        // setErrorMessage(null);
        setNotification({
          type: "CLEAR_MESSAGE",
        });
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const logout = () => {
    window.localStorage.removeItem("loggedIn");
    // window.localStorage.clear()
    window.location.reload();
  };

  const handleAddBlog = async (blogObject) => {
    newBlogMutation.mutate(blogObject, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("blogs");
        console.log("BLOG", data);
        console.log("BLOG MESS", data.message);
        setNotification({
          type: "SHOW_MESSAGE",
          payload: {
            message: data.message,
            style: { color: "green" },
          },
        });
        setTimeout(() => {
          setNotification({
            type: "CLEAR_MESSAGE",
          });
        }, 5000);
        blogFormRef.current.toggleVisibility();
      },
      onError: (error) => {
        console.error("error when adding", error);
        setNotification({
          type: "SHOW_MESSAGE",
          payload: {
            message: "Something strange happened.",
            style: { color: "red" },
          },
        });
        setTimeout(() => {
          setNotification({
            type: "CLEAR_MESSAGE",
          });
        }, 5000);
      },
    });
  };

  const handleDeleteBlog = async (blogId) => {
    console.log("alku", blogId);
    try {
      console.log("BLOGID", blogId);
      if (window.confirm(`Remove blog ${blogId.title} by ${blogId.author}`)) {
        await blogService.deleteBlog(blogId.id);
        // setBlogs(blogs.filter((blog) => blog.id !== blogId.id));
      }
    } catch (error) {
      console.error("Error deleting blog", error);
      // setErrorMessage({
      //   message:
      //     error.response.data.error ||
      //     "Something went wrong while deleting the blog",
      //   style: { color: "red" },
      // });
      setNotification({
        type: "SHOW_MESSAGE",
        payload: {
          message: error.response.data.error,
          style: { color: "red" },
        },
      });
      setTimeout(() => {
        // setErrorMessage(null);
        setNotification({
          type: "CLEAR_MESSAGE",
        });
      }, 5000);
    }
  };

  // const addLike = async (blog) => {
  //   try {
  // const response = await blogService.updateBlog(blog.id, blog);
  // setBlogs(
  //   blogs.map((b) =>
  //     b.id === blog.id ? { ...blog, likes: response.likes } : b
  //   )
  // );
  //   } catch (error) {
  //     console.error("Add Like fukked up");
  //   }
  // };

  return (
    <div>
      {!user && (
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          // errorMessage={errorMessage}
          errorMessage={notification}
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification message={notification} />
          {/* <Notification message={errorMessage} /> */}
          <p>
            {user.name} logged in <button onClick={logout}>log out</button>
          </p>
          <Togglable
            ref={blogFormRef}
            buttonLabel="create new blog"
            cancelLabel="cancel"
          >
            <Newblog createBlog={handleAddBlog} />
          </Togglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleDeleteBlog={() => handleDeleteBlog(blog)}
                // addLike={() => addLike(blog)}
                user={user}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
