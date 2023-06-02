export const addressReducer = (
  addressState: AddressState,
  action: AddressAction
) => {
    switch (action.type) {
      case "GET_ADDRESS":
        return {
          ...addressState,
          address: action.payload,
        };
      case "ADD_ADDRESS":
        return {
          ...addressState,
          address: [...addressState.address, action.payload],
        };
      default:
        return addressState;
    }
};
