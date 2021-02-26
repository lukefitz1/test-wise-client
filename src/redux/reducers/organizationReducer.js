export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ORGANIZATION":
      return action.payload;
    default:
      return state;
  }
};
