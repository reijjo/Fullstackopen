import { createContext, useReducer, useContext } from "react";

const messageReducer = (state, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case "SHOW_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return null;
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null);

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const useMessageValue = () => {
  const messageAndDispatch = useContext(MessageContext);
  console.log("MESSAGEANDDISPATCH", messageAndDispatch);
  return messageAndDispatch;
};

export default MessageContext;
