export const cartReducer = (cartState: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, quantity } = action.payload;
      const existingCartItem = cartState.cart.find(
        (item) => item.product._id === productId
      );

      if (existingCartItem) {
        return {
          ...cartState,
          cart: cartState.cart.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...cartState,
          cart: [...cartState.cart, { product: productId, quantity: quantity }],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...cartState,
        cart: cartState.cart.filter(
          (item) => item.product._id !== action.payload
        ),
      };
    }

    case "GET_CART":
      return {
        ...cartState,
        cart: action.payload,
      };

    default:
      return cartState;
  }
};
