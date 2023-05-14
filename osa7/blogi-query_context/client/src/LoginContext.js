import { createContext, useReducer, useContext } from "react";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, error: null };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, {
    user: null,
    error: null,
  });
  return (
    <LoginContext.Provider value={[loginState, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export const useLoginValue = () => {
  const loginStateAndDispatch = useContext(LoginContext);
  return loginStateAndDispatch;
};
