export function userReducer(state = {}, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    default:
      return state;
  }
}
