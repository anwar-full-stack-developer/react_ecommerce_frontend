import {
  GLOBAL_CONFIG_REQUEST,
  GLOBAL_CONFIG_SUCCESS,
  GLOBAL_CONFIG_FAIL,
} from "../constants/global-config.constant";

/**
 * Store data in redux store, on every state change during dispatch
 * @name globalConfigReducer
 * @function
 * @param {Object} state - initial state
 * @param {Object} action  - action type with payload data
 * @returns {Object} newstate - return new state
 */
export const globalConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_CONFIG_REQUEST:
      return { ...action.payload, loading: true };
    case GLOBAL_CONFIG_SUCCESS:
      return { ...action.payload, loading: false };
    case GLOBAL_CONFIG_FAIL:
      return { ...action.payload, loading: false };

    default:
      return state;
  }
};
