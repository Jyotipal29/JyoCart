import { createContext, useContext, useReducer } from "react";
import { addressReducer } from "./addressReducer";
type ShopingCartProviderProps = {
  children: React.ReactNode;
};

const addressContext = createContext({} as AddressContextType);
export const useAddress = () => {
  return useContext(addressContext);
};

export const AddressProvider = ({ children }: ShopingCartProviderProps) => {
  const [addressState, addressDispatch] = useReducer<
    React.Reducer<AddressState, AddressAction>
  >(addressReducer, {
    address: [],
  });
  return (
    <addressContext.Provider value={{ addressState, addressDispatch }}>
      {children}
    </addressContext.Provider>
  );
};
