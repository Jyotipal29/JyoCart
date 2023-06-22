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
  type Sort = {
    price: string;
  };
  type Filter = {
    category: string;
    size: string;
    brand: string;
    search: string;
  };
  type ProductState = {
    products: Product[];
    product: Product;
    sort: Sort;
    filters: Filter;
  };

  type ProductAction =
    | { type: "GET_PRODUCTS"; payload: Product[] }
    | { type: "GET_ONE_PRODUCT"; payload: Product }
    | { type: "REMOVE_PRODUCT"; payload: number }
    | { type: "FILTER_CHANGE"; payload: { sort: Sort; filters: Filter } };

  type ProductContextType = {
    productState: ProductState;
    productDispatch: React.Dispatch<ProductAction>;
    filteredProducts: Product[];
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
  type CartItem = {
    product: Product;
    quantity: number;
  };

  type Cart = {
    user: string;
    items: CartItem[];
  };
  type CartState = {
    cart: CartItem[];
  };
  type CartAction =
    | { type: "ADD_TO_CART"; payload: { productId: number; quantity: number } }
    | { type: "GET_CART"; payload: CartItem[] }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "INC_QTY"; payload: number }
    | { type: "REMOVE_ALL" }
    | { type: "DEC_QTY"; payload: number };

  type CartContextType = {
    cartState: CartState;
    cartDispatch: React.Dispatch<CartAction>;
  };
  type WishItem = {
    product: Product;
    quantity: number;
  };

  type WishState = {
    wish: WishItem[];
  };
  type WishAction =
    | { type: "ADD_TO_WISH"; payload: { productId: number; quantity: number } }
    | { type: "GET_WISH"; payload: { productId: number; quantity: number } }
    | { type: "REMOVE_FROM_WISH"; payload: number }
    | { type: "INC_QTY"; payload: number }
    | { type: "DEC_QTY"; payload: number };

  type WishContextType = {
    wishState: WishState;
    wishDispatch: React.Dispatch<WishAction>;
  };

  type Address = {
    _id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  type AddressState = {
    address: Address[];
  };
  type AddressAction =
    | {
        type: "GET_ADDRESS";
        payload: Address[];
      }
    | {
        type: "ADD_ADDRESS";
        payload: Address;
      }
    | {
        type: "DELETE_ADDRESS";
        payload: string;
      }
    | {
        type: "UPDATE_ADDRESS";
        payload: { addressId: string; updatedAddress: Address };
      };

  type AddressContextType = {
    addressState: AddressState;
    addressDispatch: React.Dispatch<AddressAction>;
  };
  interface Window {
    Razorpay: any;
  }
}
