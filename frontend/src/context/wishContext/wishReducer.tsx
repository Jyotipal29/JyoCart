export const wishReducer = (wishState: WishState, action: WishAction) => {
  switch (action.type) {
    case "ADD_TO_WISH": {
      const { productId, quantity } = action.payload;
      const existingCartItem = wishState.wish.find(
        (item) => item.product._id === productId
      );

      if (existingCartItem) {
        return {
          ...wishState,
          wish: wishState.wish.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...wishState,
          wish: [...wishState.wish, { product: productId, quantity: quantity }],
        };
      }
    }
    case "REMOVE_FROM_WISH": {
      return {
        ...wishState,
        wish: wishState.wish.filter(
          (item) => item.product._id !== action.payload
        ),
      };
    }

    case "GET_WISH":
      return {
        ...wishState,
        wish: action.payload,
      };

    default:
      return wishState;
  }
};
