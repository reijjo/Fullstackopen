import { useState } from 'react'
import MyButtons from "./MyButtons"

const Blog = ({ blog, handleDeleteBlog, addLike, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [buttonText, setButtonText] = useState('view')

	const toggleText = () => setButtonText(prev => prev === 'view' ? 'hide' : 'view')

	const BlogInfo = () => {
		console.log('TEST user', user.username, 'BLOG', blog.user.username)
		return (
			<>
				<div className='blog-url'>
					{blog.url}
				</div>
				<div className='blog-likes'>
					likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
				</div>
				<div>
					{blog.user.name}
				</div>
			</>
		)
	}


	// console.log('taallta', blog)
	return (
		<div style={blogStyle}>
			<div key={blog.id} className='title-author'>
				{blog.title} {blog.author}
					<button onClick={toggleText}>{buttonText}</button>
					{buttonText === 'hide' ? (
						<>
							<BlogInfo />
							{user.username !== blog.user.username ? (
								null
							) : (
							<div>
								<MyButtons.DeleteButton blog={blog} handleDeleteBlog={handleDeleteBlog} />
							</div>

							)}
						</>
					) : (
						null
					)}
			</div>
		</div>
	)
}

export default Blog