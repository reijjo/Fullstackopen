import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
	title: 'Reiska',
	author: 'Aleksis Kivi',
	url: 'www.com',
	likes: 55,
	user: {
		username: 'usernameTest',
		name: 'Testi Ukko',
		id: '123'
	},
	id: '12345'
}

const user = {
	username: 'usernameTest',
	name: 'Testi Ukko',
	blogs: [
		{
			title: 'Reiska',
			author: 'Aleksis Kivi',
			url: 'www.com',
			likes: 55,
			id: '12345'
		},
		{
			title: 'Paavo',
			author: 'Joku random',
			url: 'www.koirakauppias.com',
			likes: 2,
			id: '12345678'
		}
	],
	id: '123'
}

const mockAddLike = jest.fn()

describe('<Blog />', () => {
	let container

	beforeEach(() => {
		container = render(
			<Blog blog={blog} user={user} addLike={mockAddLike} />
		).container
	})

	test('renders title & author. NOT url & likes', () => {

		const element = container.querySelector('.title-author')
		expect(element).toHaveTextContent('Reiska Aleksis Kivi')
	})

	test('show url, likes and user after clicking "view" button', async () => {
		const user = userEvent.setup()
		const viewButton = screen.getByText('view')
		await user.click(viewButton)

		expect(screen.queryByText(`${blog.url}`)).toBeVisible()
		expect(screen.queryByText(`likes ${blog.likes}`)).toBeVisible()
		expect(screen.queryByText(`${blog.user.name}`)).toBeVisible()
	})

	test('like x 2', async () => {
		const user = userEvent.setup()
		const viewButton = screen.getByText('view')
		// const clicked = jest.fn()
		await user.click(viewButton)

		const likeButton = screen.getByText('like')
		await user.click(likeButton)
		await user.click(likeButton)

		expect(mockAddLike).toHaveBeenCalledTimes(2)
	})
})