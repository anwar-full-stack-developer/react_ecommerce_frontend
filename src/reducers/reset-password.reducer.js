import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_VALIDATION_REQUEST,
  RESET_PASSWORD_VALIDATION_SUCCESS,
  RESET_PASSWORD_VALIDATION_FAIL,
} from "../constants/reset-password.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name resetPasswordReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...action.payload, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...action.payload, loading: false };
    case RESET_PASSWORD_FAIL:
      return { ...action.payload, loading: false };

    case RESET_PASSWORD_VALIDATION_REQUEST:
      return { ...action.payload, loading: true };
    case RESET_PASSWORD_VALIDATION_SUCCESS:
      return { ...action.payload, loading: false };
    case RESET_PASSWORD_VALIDATION_FAIL:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};
