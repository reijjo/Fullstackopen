import { Notification } from "../types";

const Notify = (message: Notification) => {
  if (!message) {
    return null;
  }
  return <p style={{ color: "red" }}>{message.message}</p>;
};

export default Notify;
