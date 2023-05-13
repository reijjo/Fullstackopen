import { useState, useEffect, useRef } from "react";
import { setMessage, clearMessage, addBlog, addBlogLike } from "./reduxActions";

import Blog from "./components/Blog";
import Loginform from "./components/Loginform";
import Newblog from "./components/Newblog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { connect } from "react-redux";

const App = ({ message, setMessage, clearMessage, addBlog, blogs }) => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        blogs.forEach((blog) => addBlog(blog));
      } catch (exception) {
        console.error("Error fetching blogs", exception);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

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
      setMessage({
        message: exception.response.data.error,
        style: { color: "red" },
      });
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const logout = () => {
    window.localStorage.removeItem("loggedIn");
    window.location.reload();
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const blog = await blogService.addBlog(blogObject);
      console.log("BLOG", blog);
      // setBlogs(blogs.concat(blog.savedBlog));
      addBlog(blog.savedBlog);
      setMessage({
        message: blog.message,
        style: { color: "green" },
      });
      setTimeout(() => {
        clearMessage();
      }, 5000);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.error("error when adding", exception);
      setMessage({
        message: message,
        style: { color: "red" },
      });
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
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
      setMessage({
        message:
          error.response.data.error ||
          "Something went wrong while deleting the blog",
        style: { color: "red" },
      });
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
  };

  const addLike = async (blog, addBlogLike) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const response = await blogService.updateBlog(blog.id, updatedBlog);
      console.log("resp", response);
      // const response = await blogService.updateBlog(blog.id, blog);
      // setBlogs(
      //   blogs.map((b) =>
      //     b.id === blog.id ? { ...blog, likes: response.likes } : b
      //   )
      // );
      // addBlog({ ...blog, likes: response.likes });
      // const updateBlog = { ...blog, likes: response.likes };
      console.log("props.addBlogLike:", addBlogLike); // Add this line
      addBlogLike(response);
    } catch (error) {
      console.error("Add Like fukked up");
    }
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
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification message={message} />
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
                addLike={() => addLike(blog, addBlogLike)}
                user={user}
              />
            ))}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  blogs: state.blog,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
    clearMessage: () => dispatch(clearMessage()),
    addBlog: (blogObject) => dispatch(addBlog(blogObject)),
    addBlogLike: (blogObject) => {
      console.log("Dispatching addBlogLike action", blogObject);
      dispatch(addBlogLike(blogObject));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
