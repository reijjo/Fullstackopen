const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="error" style={message.style}>
			{message.message}
		</div>
	)
}

export default Notification;