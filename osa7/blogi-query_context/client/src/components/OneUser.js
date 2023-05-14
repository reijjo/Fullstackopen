import { useEffect, useState } from "react";
import userService from "../services/users";
import { useParams } from "react-router-dom";

const OneUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const res = await userService.oneUser(id);
      setUser(res.user);
      setBlogs(res.blogs);
      setIsLoading(false);
    };
    getUser();
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log("user", user);
  console.log("blogs", blogs);
  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <div>
        <ul>
          {blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default OneUser;
