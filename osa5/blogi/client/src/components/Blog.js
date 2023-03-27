import DeleteButton from "./DeleteButton"

const Blog = ({ blog, handleDeleteBlog }) => (
  <div key={blog.id}>
    {blog.title} {blog.author} <DeleteButton blog={blog} handleDeleteBlog={handleDeleteBlog} />
  </div>
)

export default Blog