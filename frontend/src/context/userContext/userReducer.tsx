export const userReducer = (userState: userState, action: userAction) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...userState,
        user: action.payload,
      };
    default:
      return userState;
  }
};
