import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_VALIDATION_REQUEST,
  FORGOT_PASSWORD_VALIDATION_SUCCESS,
  FORGOT_PASSWORD_VALIDATION_FAIL,
} from "../constants/forgot-password.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name forgotPasswordReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { ...action.payload, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...action.payload, loading: false };
    case FORGOT_PASSWORD_FAIL:
      return { ...action.payload, loading: false };

    case FORGOT_PASSWORD_VALIDATION_REQUEST:
      return { ...action.payload, loading: true };
    case FORGOT_PASSWORD_VALIDATION_SUCCESS:
      return { ...action.payload, loading: false };
    case FORGOT_PASSWORD_VALIDATION_FAIL:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};
