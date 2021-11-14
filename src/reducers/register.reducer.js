import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_VALIDATION_REQUEST,
  SIGNUP_VALIDATION_SUCCESS,
  SIGNUP_VALIDATION_FAIL,
} from "../constants/register.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name registerReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...action.payload, loading: true };
    case SIGNUP_SUCCESS:
      return { ...action.payload, loading: false };
    case SIGNUP_FAIL:
      return { ...action.payload, loading: false };

    case SIGNUP_VALIDATION_REQUEST:
      return { ...action.payload, loading: true };
    case SIGNUP_VALIDATION_SUCCESS:
      return { ...action.payload, loading: false };
    case SIGNUP_VALIDATION_FAIL:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};
