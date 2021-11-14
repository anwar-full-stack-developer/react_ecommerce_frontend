import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  
  LOGIN_VALIDATION_SUCCESS,
  LOGIN_VALIDATION_REQUEST,
  LOGIN_VALIDATION_FAIL,

  GET_LOGGEDIN_USER_SUCCESS,
  GET_LOGGEDIN_USER_REQUEST,
  GET_LOGGEDIN_USER_FAIL,
} from "../constants/login.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name loginReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const loginReducer = (state = { result: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...action.payload, loading: true };
    case LOGIN_SUCCESS:
      return { ...action.payload, loading: false, isLoggedin: true };
    case LOGIN_FAIL:
      return { ...action.payload, loading: false };

    case LOGIN_VALIDATION_REQUEST:
      return { ...action.payload, loading: true };
    case LOGIN_VALIDATION_SUCCESS:
      return { ...action.payload, loading: false };
    case LOGIN_VALIDATION_FAIL:
      return { ...action.payload, loading: false };

    case GET_LOGGEDIN_USER_REQUEST:
      return { ...action.payload, loading: true };
    case GET_LOGGEDIN_USER_SUCCESS:
      return { ...action.payload, loading: false };
    case GET_LOGGEDIN_USER_FAIL:
      return { ...action.payload, loading: false };


    default:
      return state;
  }
};

