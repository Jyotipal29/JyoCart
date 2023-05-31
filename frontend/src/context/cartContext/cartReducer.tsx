export const cartReducer = (cartState: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, quantity } = action.payload;
      const existingCartItem = cartState.cart.find(
        (item) => item.product._id === productId
      );

      if (existingCartItem) {
        // If the item already exists in the cart, update the quantity
        return {
          ...cartState,
          cart: cartState.cart.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // If the item doesn't exist in the cart, add it as a new item
        return {
          ...cartState,
          cart: [...cartState.cart, { productId, quantity }],
        };
      }
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
