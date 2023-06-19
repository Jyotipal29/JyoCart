import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";
type ShopingCartProviderProps = {
  children: React.ReactNode;
};

const cartContext = createContext({} as CartContextType);
export const useCart = () => {
  return useContext(cartContext);
};

export const CartProvider = ({ children }: ShopingCartProviderProps) => {
  const [cartState, cartDispatch] = useReducer<
    React.Reducer<CartState, CartAction>
  >(cartReducer, {
    cart: [],
  });

  return (
    <cartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </cartContext.Provider>
  );
};
