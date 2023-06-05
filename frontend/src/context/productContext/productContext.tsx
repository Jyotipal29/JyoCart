import { createContext, useContext, useReducer, useMemo } from "react";
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
    sort: {
      price: "",
    },
    filters: {
      category: "",
      size: "",
      brand: "",
      search: "",
    },
  });

  const filteredProducts = useMemo(() => {
    const filproducts: Product[] = !productState.sort.price
      ? productState.products
      : productState.products.sort((a, b) =>
          productState.sort.price === "asc"
            ? a.price - b.price
            : b.price - a.price
        );

    return filproducts
      .filter((product) => {
        return product.description
          .toLowerCase()
          .includes(productState.filters.search.toLowerCase());
      })
      .filter((product) => {
        // Filter By brand

        return (
          !productState.filters.brand ||
          product.brand.toLowerCase() ===
            productState.filters.brand.toLowerCase()
        );
      })
      .filter((product) => {
        // Filter By category

        return (
          !productState.filters.category ||
          product.category.toLowerCase() ===
            productState.filters.category.toLowerCase()
        );
      })
      .filter((product) => {
        // Filter By size

        return (
          !productState.filters.size ||
          product.size.some((size) =>
            size.toLowerCase().includes(productState.filters.size.toLowerCase())
          )
        );
      });
  }, [productState, productState.products]);

  return (
    <productContext.Provider
      value={{ productState, productDispatch, filteredProducts }}
    >
      {children}
    </productContext.Provider>
  );
};
