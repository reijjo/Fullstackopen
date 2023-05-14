import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  // setQueryToken,
  // getQueryAll,
  // addQueryBlog,
  likeQueryBlog,
  // deleteQueryBlog,
  // // queryLogin,
} from "../requests";
import { useMessageValue } from "../MessageContext";

const BlogInfo = () => {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const { id } = useParams();

  const getOneBlog = async () => {
    const res = await blogService.getBlog(id);
    console.log("res", res);
    setBlog(res.blog);
    setUser(res.user);
    setAllComments(res.blog.comments);
  };

  useEffect(() => {
    getOneBlog();
  }, [id]);

  console.log("Blog", blog);
  console.log("user", user);
  // if (user) console.log("TEST user", user.username, "BLOG", blog.user.username);

  const queryClient = useQueryClient();

  const newLikeMutation = useMutation(likeQueryBlog);
  const [notification, setNotification] = useMessageValue();

  console.log(notification);

  const addQueryLike = (blog) => {
    console.log("like button clicked");
    newLikeMutation.mutate(blog, {
      onSuccess: () => {
        queryClient.invalidateQueries("blogs");
        getOneBlog();
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

  console.log("TAA", blog.id);

  const [comment, setComment] = useState("");

  const addComment = async () => {
    const res = await blogService.newComment(id, comment);
    console.log("addComment res", res);
    setAllComments(res.comments);
    setComment("");
  };

  console.log("allComments", allComments);

  return (
    <>
      <div className="blog-url">{blog.url}</div>
      <div className="blog-likes">
        likes {blog.likes}{" "}
        <button onClick={() => addQueryLike(blog)}>like</button>
      </div>
      <div className="blogcreator">added by {user.name}</div>
      <h2>comments</h2>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={() => addComment(id)}>add comment</button>
        <ul>
          {allComments.map((com) => {
            return <li key={uuidv4()}>{com}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default BlogInfo;
