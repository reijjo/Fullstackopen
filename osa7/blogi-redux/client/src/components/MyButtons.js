const DeleteButton = ({ blog, handleDeleteBlog, }) => {
	return (
		<>
			<button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
		</>
	)
}

const ViewButton = ({ blog, getBlogInfo }) => {
	return (
		<>
			<button onClick={() => getBlogInfo(blog)}>view</button>
		</>
	)
}

const MyButtons = { DeleteButton, ViewButton }

export default MyButtons