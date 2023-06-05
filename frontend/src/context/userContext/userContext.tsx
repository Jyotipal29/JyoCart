import { createContext, useContext, useReducer, useState } from "react";
import { userReducer } from "./userReducer";

type ShopingCartProviderProps = {
  children: React.ReactNode;
};

const userContext = createContext({} as userContextType);
export const useUser = () => {
  return useContext(userContext);
};

const userFromStorage = localStorage.getItem("user");
const user = userFromStorage ? JSON.parse(userFromStorage) : null;
export const UserProvider = ({ children }: ShopingCartProviderProps) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<userState, userAction>
  >(userReducer, {
    user: user,
  });

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};
