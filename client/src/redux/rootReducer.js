import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./features/user";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
