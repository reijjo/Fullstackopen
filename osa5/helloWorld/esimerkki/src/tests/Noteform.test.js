import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Noteform from '../components/Noteform'
import userEvent from '@testing-library/user-event'

test('<Noteform /> updates parent state and calls onSubmit', async () => {
	const user = userEvent.setup()
	const createNote = jest.fn()

	render(<Noteform createNote={createNote} />)

	// const input = screen.getByRole('textbox')
	const input = screen.getByPlaceholderText('write note content here')
	const sendButton = screen.getByText('save')

	await user.type(input, 'testing a form...')
	await user.click(sendButton)

	expect(createNote.mock.calls).toHaveLength(1)
	expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})