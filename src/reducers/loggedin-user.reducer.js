import {
  LOGGEDIN_USER_SUCCESS,
  LOGGEDIN_USER_REQUEST,
  LOGGEDIN_USER_FAIL,
} from "../constants/loggedin-user.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name loggedinUserReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const loggedinUserReducer = (state = {}, action) => {
  switch (action.type) {

    case LOGGEDIN_USER_REQUEST:
      return { ...action.payload, loading: true };
    case LOGGEDIN_USER_SUCCESS:
      return { ...action.payload, loading: false };
    case LOGGEDIN_USER_FAIL:
      return { ...action.payload, loading: false };


    default:
      return state;
  }
};
