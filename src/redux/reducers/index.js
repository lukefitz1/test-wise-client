import { combineReducers } from "redux";
import loginDataReducer from "./loginDataReducer";
import organizationReducer from "./organizationReducer";

export default combineReducers({
  login: loginDataReducer,
  organization: organizationReducer,
});
