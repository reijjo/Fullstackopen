import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRef } from "react";
import {
  // setQueryToken,
  getQueryAll,
  addQueryBlog,
  likeQueryBlog,
  deleteQueryBlog,
  // queryLogin,
} from "../requests";

import Togglable from "./Togglable";
import Newblog from "./Newblog";
import Blog from "./Blog";
// import { useMessageValue } from "..MessageContext";

const Blogs = ({ user, setNotification }) => {
  console.log("BLOGS", user);
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(addQueryBlog);
  const newLikeMutation = useMutation(likeQueryBlog);
  const delBlogMutation = useMutation(deleteQueryBlog);

  const blogFormRef = useRef();

  const blogsResult = useQuery("blogs", getQueryAll, {
    refetchOnReconnect: false,
  });

  if (blogsResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;

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
    console.log("blog", blogId);

    if (window.confirm(`Remove blog ${blogId.title} by ${blogId.author}?`)) {
      delBlogMutation.mutate(blogId.id, {
        onSuccess: () => {
          queryClient.invalidateQueries("blogs");
        },
        onError: (error) => {
          setNotification({
            type: "SHOW_MESSAGE",
            payload: {
              message: error.response.data.error,
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
    }
  };

  const addQueryLike = (blog) => {
    console.log("like button clicked");
    newLikeMutation.mutate(blog, {
      onSuccess: () => {
        queryClient.invalidateQueries("blogs");
      },
      onError: (error) => {
        console.error("error when liking", error);
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

  console.log("blog", blogs);

  return (
    <>
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
            addLike={() => addQueryLike(blog)}
            user={user}
          />
        ))}
    </>
  );
};

export default Blogs;
