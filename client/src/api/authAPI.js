import axios from "axios";

import { API_CALL_FAILED } from "../store/constants/messages";

export const requestAuth = async (payload) => {
  let response;
  try {
    if (!payload.isLoginMode) {
      response = await axios.put("/api/auth/signup", {
        email: payload.email,
        password: payload.password,
      });
    } else {
      response = await axios.post("/api/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      if (!response) {
        throw new Error(API_CALL_FAILED);
      }

      const { token } = response.data;

      return { token, email: payload.email };
    }
  } catch (error) {
    throw new Error(
      error.message || error.response?.data?.message || API_CALL_FAILED
    );
  }
};
