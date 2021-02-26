export default (state = "", action) => {
  switch (action.type) {
    case "STORE_LOGIN_DATA":
      return action.payload;
    default:
      return state;
  }
};
