export {};
export type Product = {
  id: number;
  brand: string;
  description: string;
  imageUrl: string;
  price: number;
  qty: number;
  size: string[];
  category: string;
};

declare global {
  //   type Product = {
  //     id: number;
  //     brand: string;
  //     description: string;
  //     imageUrl: string;
  //     price: number;
  //     qty: number;
  //     size: string[];
  //     category: string;
  //   };
  type ProductState = {
    products: Product[];
    product: Product;
  };

  type ProductAction =
    | { type: "GET_PRODUCTS"; payload: Product[] }
    | { type: "REMOVE_PRODUCT"; payload: number };

  type ProductContextType = {
    productState: ProductState;
    productDispatch: React.Dispatch<ProductAction>;
  };
}
