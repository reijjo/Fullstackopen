import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Newblog from '../components/Newblog'
import userEvent from '@testing-library/user-event'

describe('<Newblog /> ', () => {

	test('updates parent state and calls onSubmit', async () => {
		const user = userEvent.setup()
		const createBlog = jest.fn()

		render(<Newblog createBlog={createBlog} />)
		const title = screen.getByPlaceholderText('Note Title')
		const author = screen.getByPlaceholderText('Note Author')
		const url = screen.getByPlaceholderText('Note Url')
		const button = screen.getByText('create')

		await user.type(title, 'testi title')
		await user.type(author, 'Jest MASTER')
		await user.type(url, 'www.jestonperseesta.com')
		await user.click(button)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('testi title')
		expect(createBlog.mock.calls[0][0].author).toBe('Jest MASTER')
		expect(createBlog.mock.calls[0][0].url).toBe('www.jestonperseesta.com')
	})
})