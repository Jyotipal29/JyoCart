export const productReducer = (
  productState: ProductState,
  action: ProductAction
) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...productState,
        products: action.payload,
      };
    default:
      return productState;
  }
};
