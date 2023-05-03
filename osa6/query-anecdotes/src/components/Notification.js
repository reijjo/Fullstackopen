import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const { state } = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!state.notification) return null;

  return <div style={style}>{state.notification}</div>;
};

export default Notification;
