import { connect } from "react-redux";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error" style={message.style}>
      {message.message}
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(Notification);
