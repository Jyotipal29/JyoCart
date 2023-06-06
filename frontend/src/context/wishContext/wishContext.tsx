import { createContext, useContext, useReducer } from "react";
import { wishReducer } from "./wishReducer";
type ShopingWishProviderProps = {
  children: React.ReactNode;
};

const wishContext = createContext({} as WishContextType);
export const useWish = () => {
  return useContext(wishContext);
};

export const WishProvider = ({ children }: ShopingWishProviderProps) => {
  const [wishState, wishDispatch] = useReducer<
    React.Reducer<WishState, WishAction>
  >(wishReducer, {
    wish: [],
  });
  return (
    <wishContext.Provider value={{ wishState, wishDispatch }}>
      {children}
    </wishContext.Provider>
  );
};
