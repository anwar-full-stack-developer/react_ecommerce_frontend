import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middleware/logger";
// import rootReducer from './reducers'

import { productListReducer } from "../reducers/productReducer";
import { loginReducer } from "../reducers/login.reducer";
import { loggedinUserReducer } from "../reducers/loggedin-user.reducer";
import { forgotPasswordReducer } from "../reducers/forgot-password.reducer";
import { resetPasswordReducer } from "../reducers/reset-password.reducer";
import { registerReducer } from "../reducers/register.reducer";

const initialState = {};
const rootReducer = combineReducers({
  productList: productListReducer,
  loginReducer,
  loggedinUserReducer: loggedinUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  registerReducer,
});

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = compose(...enhancers)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   return store
// }

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    initialState: initialState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware).concat(thunkMiddleware),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
