// import { useState } from "react";
// import MyButtons from "./MyButtons";

import { Link } from "react-router-dom";

const Blog = ({
  blog,
  // handleDeleteBlog, addLike, user
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div key={blog.id} className="title-author">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  );
};

export default Blog;
