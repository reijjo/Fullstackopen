const DeleteButton = ({ blog, handleDeleteBlog }) => {
	return (
		<>
			<button onClick={() => handleDeleteBlog(blog.id)}>delete</button>
			{/* <button onClick={() => console.log('DeleteBUtton', blog)}>delete</button> */}

		</>
	)
}

export default DeleteButton