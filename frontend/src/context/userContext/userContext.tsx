import { createContext, useContext, useReducer, useState } from "react";
import { userReducer } from "./userReducer";

type ShopingCartProviderProps = {
  children: React.ReactNode;
};

const userContext = createContext({} as userContextType);
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }: ShopingCartProviderProps) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<userState, userAction>
  >(userReducer, {
    user: null,
  });

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};
