import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return { notification: action.payload };
    case "HIDE_NOTIFICATION":
      return { notification: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notification: null,
  });
  console.log("CHID", props);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  console.log("CONTEXT", context);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationContextProvider"
    );
  }
  return context.dispatch;
};

export default NotificationContext;
