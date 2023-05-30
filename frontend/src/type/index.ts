export {};

declare global {
  type Product = {
    _id: number;
    brand: string;
    description: string;
    imageUrl: string;
    price: number;
    qty: number;
    size: string[];
    category: string;
  };
  type ProductState = {
    products: Product[];
    product: Product;
  };

  type ProductAction =
    | { type: "GET_PRODUCTS"; payload: Product[] }
    | { type: "GET_ONE_PRODUCT"; payload: Product[] }
    | { type: "REMOVE_PRODUCT"; payload: number };

  type ProductContextType = {
    productState: ProductState;
    productDispatch: React.Dispatch<ProductAction>;
  };

  type User = {
    name: string;
    email: string;
    password: string;
    token: string;
  };
  type userState = {
    user: User | null;
  };
  type userAction =
    | { type: "LOGIN"; payload: User }
    | { type: "REGISTER"; payload: User };

  type userContextType = {
    userState: userState;
    userDispatch: React.Dispatch<userAction>;
  };
  
}
