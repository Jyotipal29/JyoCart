import { createContext, useContext, useReducer } from "react";
import { productReducer } from "./productReducer";
type ShopingCartProviderProps = {
  children: React.ReactNode;
};

const productContext = createContext({} as ProductContextType);
export const useProduct = () => {
  return useContext(productContext);
};

export const ProductProvider = ({ children }: ShopingCartProviderProps) => {
  const [productState, productDispatch] = useReducer<
    React.Reducer<ProductState, ProductAction>
  >(productReducer, {
    products: [],
    product: {} as Product,
  });
  return (
    <productContext.Provider value={{ productState, productDispatch }}>
      {children}
    </productContext.Provider>
  );
};
