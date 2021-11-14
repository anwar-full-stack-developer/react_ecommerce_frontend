import * as yup from "yup";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_VALIDATION_REQUEST,
  LOGIN_VALIDATION_SUCCESS,
  LOGIN_VALIDATION_FAIL,
  GET_LOGGEDIN_USER_REQUEST,
  GET_LOGGEDIN_USER_FAIL,
  GET_LOGGEDIN_USER_SUCCESS,
} from "../constants/login.constant";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_VALIDATION_FAIL,
  FORGOT_PASSWORD_VALIDATION_REQUEST,
  FORGOT_PASSWORD_VALIDATION_SUCCESS,
} from "../constants/forgot-password.constant";
import {
  LOGGEDIN_USER_FAIL,
  LOGGEDIN_USER_REQUEST,
  LOGGEDIN_USER_SUCCESS,
} from "../constants/loggedin-user.constant";
import {
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_VALIDATION_FAIL,
  SIGNUP_VALIDATION_REQUEST,
} from "../constants/register.constant";
import {
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_VALIDATION_FAIL,
  RESET_PASSWORD_VALIDATION_REQUEST,
  RESET_PASSWORD_VALIDATION_SUCCESS,
} from "../constants/reset-password.constant";
import { USER_TYPE_ALLOWED_FOR_REGISTRATION } from "../constants/user.constant";
import { userService } from "../service/user.service";

const login = (requestData) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
    payload: { request: { ...requestData } },
  });
  const res = await userService.login(requestData);
  if (!res || res?.error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: { request: { ...requestData }, error: { ...res?.error } },
    });
  } else {
    //set loggedin user to browser
    await localStorage.setItem("userLoginToken", res.result.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        request: { ...requestData },
        result: { ...res.result },
        isLoggedin: true,
      },
    });

    await getLoggedInUser(dispatch);
  }
};

const loginHandleSubmit = (requestData) => async (dispatch) => {
  let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  try {
    dispatch({
      type: LOGIN_VALIDATION_REQUEST,
      payload: { request: { ...requestData } },
    });
    schema
      .validate({ ...requestData }, { abortEarly: false, recursive: true })
      .then(async (valid) => {
        dispatch({
          type: LOGIN_VALIDATION_SUCCESS,
          payload: { request: { ...requestData } },
        });

        dispatch(await login(requestData));
      })
      .catch(async (errors) => {
        let allErrors = {};
        await (errors?.inner ? errors.inner : []).forEach((error, i) => {
          allErrors[error.path] = {
            message: error.message,
            name: error.path,
            value: error.value,
            path: error.path,
            type: error.type,
          };
        });
        if (Object.keys(allErrors).length === 0) {
          allErrors["unknown"] = {
            message: "Internal server error. Please try again.",
            name: "unknown",
            value: "",
            path: "unknown",
            type: "unknown",
          };
        }
        dispatch({
          type: LOGIN_VALIDATION_FAIL,
          payload: { request: { ...requestData }, error: { ...allErrors } },
        });
      })
      .finally(() => {
        // console.log("callback always ");
      });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

/**
 * Get current loggedin user. If loggedin user previously set in the browser local storage then response back with previously stored info
 * either will load user details from database
 * @param {*} dispatch - Dispatch REQUEST, SUCCESS, FAIL event or response
 * @returns
 */
const getLoggedInUser = async (dispatch) => {
  dispatch({
    type: GET_LOGGEDIN_USER_REQUEST,
  });
  const loginToken = await localStorage.getItem("userLoginToken");
  if (!loginToken) {
    dispatch({
      type: GET_LOGGEDIN_USER_FAIL,
      payload: { error: { message: "Login token not found" } },
    });
    dispatch({
      type: LOGGEDIN_USER_FAIL,
      payload: {
        error: { message: "Login token not found" },
        isLoggedin: false,
      },
    });
    return null;
  }

  let loggedinUser = await localStorage.getItem("loggedinUser");
  if (loggedinUser) {
    loggedinUser = JSON.parse(loggedinUser);
    dispatch({
      type: GET_LOGGEDIN_USER_SUCCESS,
      payload: { result: { ...loggedinUser } },
    });
    dispatch({
      type: LOGGEDIN_USER_SUCCESS,
      payload: {
        result: { ...loggedinUser },
        isLoggedin: true,
      },
    });
    return;
  }

  const res = await userService.getLoggedInUser(loginToken);
  if (!res || res?.error) {
    dispatch({
      type: GET_LOGGEDIN_USER_FAIL,
      payload: { error: { ...res?.error } },
    });
    dispatch({
      type: LOGGEDIN_USER_FAIL,
      payload: {
        error: { ...res?.error },
        isLoggedin: false,
      },
    });
  } else {
    await localStorage.setItem(
      "loggedinUser",
      JSON.stringify({ ...res.result })
    );
    dispatch({
      type: GET_LOGGEDIN_USER_SUCCESS,
      payload: { result: { ...res.result } },
    });
    dispatch({
      type: LOGGEDIN_USER_SUCCESS,
      payload: {
        result: { ...res.result },
        isLoggedin: true,
      },
    });
  }
};

/**
 * When user info update then let reload user info from database and sync to browser local storage
 * @param {*} dispatch dispatch user action
 * @returns
 */
const reloadLoggedinUserInfoToLocalStorage = async (dispatch) => {
  dispatch({
    type: GET_LOGGEDIN_USER_REQUEST,
  });
  const loginToken = await localStorage.getItem("userLoginToken");
  if (!loginToken) {
    dispatch({
      type: GET_LOGGEDIN_USER_FAIL,
      payload: { error: { message: "Login token not found" } },
    });
    dispatch({
      type: LOGGEDIN_USER_FAIL,
      payload: {
        error: { message: "Login token not found" },
        isLoggedin: false,
      },
    });
    return null;
  }
  const res = await userService.getLoggedInUser(loginToken);
  if (!res || res?.error) {
    dispatch({
      type: GET_LOGGEDIN_USER_FAIL,
      payload: { error: { ...res?.error } },
    });
    dispatch({
      type: LOGGEDIN_USER_FAIL,
      payload: {
        error: { ...res?.error },
        isLoggedin: false,
      },
    });
  } else {
    await localStorage.setItem(
      "loggedinUser",
      JSON.stringify({ ...res.result })
    );
    dispatch({
      type: GET_LOGGEDIN_USER_SUCCESS,
      payload: { result: { ...res.result } },
    });
    dispatch({
      type: LOGGEDIN_USER_SUCCESS,
      payload: {
        result: { ...res.result },
        isLoggedin: true,
      },
    });
  }
};

const logout = async (dispatch) => {
  await localStorage.removeItem("userLoginToken");
  await localStorage.removeItem("loggedinUser");
  dispatch({
    type: GET_LOGGEDIN_USER_SUCCESS,
    payload: {},
  });
  dispatch({
    type: LOGGEDIN_USER_SUCCESS,
    payload: {
      result: {},
      isLoggedin: false,
    },
  });
};

const forgotPasswordHandleSubmit = (requestData) => async (dispatch) => {
  let schema = yup.object().shape({
    email: yup.string().required().email(),
  });
  try {
    dispatch({
      type: FORGOT_PASSWORD_VALIDATION_REQUEST,
      payload: { request: { ...requestData } },
    });
    schema
      .validate({ ...requestData }, { abortEarly: false, recursive: true })
      .then(async (valid) => {
        dispatch({
          type: FORGOT_PASSWORD_VALIDATION_SUCCESS,
          payload: { request: { ...requestData } },
        });

        dispatch(await forgotPassword(requestData));
      })
      .catch(async (errors) => {
        let allErrors = {};
        await (errors?.inner ? errors.inner : []).forEach((error, i) => {
          allErrors[error.path] = {
            message: error.message,
            name: error.path,
            value: error.value,
            path: error.path,
            type: error.type,
          };
        });
        if (Object.keys(allErrors).length === 0) {
          allErrors["unknown"] = {
            message: "Internal server error. Please try again.",
            name: "unknown",
            value: "",
            path: "unknown",
            type: "unknown",
          };
        }
        dispatch({
          type: FORGOT_PASSWORD_VALIDATION_FAIL,
          payload: { request: { ...requestData }, error: { ...allErrors } },
        });
      })
      .finally(() => {
        // console.log("callback always ");
      });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const forgotPassword = (requestData) => async (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
    payload: { request: { ...requestData } },
  });
  let res = await userService.forgotPassword(requestData);
  if (!res || res?.error) {
    if (Object.keys(res?.error || []).length === 0) {
      res = { ...res, error: {} };
      res.error["unknown"] = {
        message: "Internal server error. Please try again.",
        name: "unknown",
        value: "",
        path: "unknown",
        type: "unknown",
      };
    }
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: { request: { ...requestData }, error: { ...res?.error } },
    });
  } else {
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: {
        request: { ...requestData },
        result: { ...res.result },
      },
    });
  }
};

const resetPasswordHandleSubmit = (requestData) => async (dispatch) => {
  let schema = yup.object().shape({
    password_reset_token: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Passwords must match with confirm password"
      )
      .required(),
  });
  try {
    dispatch({
      type: RESET_PASSWORD_VALIDATION_REQUEST,
      payload: { request: { ...requestData } },
    });
    schema
      .validate({ ...requestData }, { abortEarly: false, recursive: true })
      .then(async (valid) => {
        dispatch({
          type: RESET_PASSWORD_VALIDATION_SUCCESS,
          payload: { request: { ...requestData } },
        });

        dispatch(await resetPassword(requestData));
      })
      .catch(async (errors) => {
        let allErrors = {};
        await (errors?.inner ? errors.inner : []).forEach((error, i) => {
          allErrors[error.path] = {
            message: error.message,
            name: error.path,
            value: error.value,
            path: error.path,
            type: error.type,
          };
        });
        if (Object.keys(allErrors).length === 0) {
          allErrors["unknown"] = {
            message: "Internal server error. Please try again.",
            name: "unknown",
            value: "",
            path: "unknown",
            type: "unknown",
          };
        }
        dispatch({
          type: RESET_PASSWORD_VALIDATION_FAIL,
          payload: { request: { ...requestData }, error: { ...allErrors } },
        });
      })
      .finally(() => {
        // console.log("callback always ");
      });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const resetPassword = (requestData) => async (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
    payload: { request: { ...requestData } },
  });
  let res = await userService.resetPassword(requestData);
  if (!res || res?.error) {
    if (Object.keys(res?.error || []).length === 0) {
      res = { ...res, error: {} };
      res.error["unknown"] = {
        message: "Internal server error. Please try again.",
        name: "unknown",
        value: "",
        path: "unknown",
        type: "unknown",
      };
    }
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: { request: { ...requestData }, error: { ...res?.error } },
    });
  } else {
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: {
        request: { ...requestData },
        result: { ...res.result },
      },
    });
  }
};

const registerHandleSubmit = (requestData) => async (dispatch) => {
  let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Passwords must match with confirm password"
      )
      .required("Comfirm password is a required field"),
    user_type: yup
      .string()
      .oneOf(
        [...USER_TYPE_ALLOWED_FOR_REGISTRATION],
        "User account type must be selected"
      )
      .required(),
    first_name: yup
      .string()
      .min(3, "First name atleast 3 characters")
      .required("First name is required field"),
    tnc: yup
      .boolean()
      .isTrue("Must be checked terms and conditions")
      .required(),
  });
  try {
    dispatch({
      type: SIGNUP_VALIDATION_REQUEST,
      payload: { request: { ...requestData } },
    });
    schema
      .validate({ ...requestData }, { abortEarly: false, recursive: true })
      .then(async (valid) => {
        dispatch({
          type: RESET_PASSWORD_VALIDATION_SUCCESS,
          payload: { request: { ...requestData } },
        });

        dispatch(await register(requestData));
      })
      .catch(async (errors) => {
        let allErrors = {};
        await (errors?.inner ? errors.inner : []).forEach((error, i) => {
          allErrors[error.path] = {
            message: error.message,
            name: error.path,
            value: error.value,
            path: error.path,
            type: error.type,
          };
        });
        if (Object.keys(allErrors).length === 0) {
          allErrors["unknown"] = {
            message: "Internal server error. Please try again.",
            name: "unknown",
            value: "",
            path: "unknown",
            type: "unknown",
          };
        }
        dispatch({
          type: SIGNUP_VALIDATION_FAIL,
          payload: { request: { ...requestData }, error: { ...allErrors } },
        });
      })
      .finally(() => {
        // console.log("callback always ");
      });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

const register = (requestData) => async (dispatch) => {
  dispatch({
    type: SIGNUP_REQUEST,
    payload: { request: { ...requestData } },
  });
  let res = await userService.register(requestData);
  if (!res || res?.error) {
    if (Object.keys(res?.error || []).length === 0) {
      res = { ...res, error: {} };
      res.error["unknown"] = {
        message: "Internal server error. Please try again.",
        name: "unknown",
        value: "",
        path: "unknown",
        type: "unknown",
      };
    }
    dispatch({
      type: SIGNUP_FAIL,
      payload: { request: { ...requestData }, error: { ...res?.error } },
    });
  } else {
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        request: { ...requestData },
        result: { ...res.result },
      },
    });
  }
};

export const authAction = {
  register,
  registerHandleSubmit,
  login,
  loginHandleSubmit,
  getLoggedInUser,
  reloadLoggedinUserInfoToLocalStorage,
  logout,
  forgotPasswordHandleSubmit,
  forgotPassword,
  resetPasswordHandleSubmit,
  resetPassword,
};
