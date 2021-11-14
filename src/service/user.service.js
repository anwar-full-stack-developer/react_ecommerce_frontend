import axios from "axios";

const register = async (payload) => {
  try {
    const { data } = await axios.post("auth/basic/register", payload);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const login = async (payload) => {
  try {
    const { data } = await axios.post("auth/basic/login", payload);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const forgotPassword = async (payload) => {
  try {
    const { data } = await axios.post("auth/basic/forgot-password", payload);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const resetPassword = async (payload) => {
  try {
    const { data } = await axios.post("auth/basic/reset-password", payload);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const getLoggedInUser = async (token) => {
  try {
    const { data } = await axios.get("users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const userService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getLoggedInUser,
};
