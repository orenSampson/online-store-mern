import axios from "axios";

import { AUTH_HEADER_NAME } from "../store/constants/auth";
import { API_CALL_FAILED } from "../store/constants/messages";

export const requestGetTransactions = async (token) => {
  let fetchedData;
  try {
    const headers = {
      [AUTH_HEADER_NAME]: `Bearer ${token}`,
    };

    fetchedData = await axios.get(
      "/api/transactions/transactionshistory",
      // "http://localhost:8080/api/transactions/transactionshistory",
      {
        headers,
      }
    );

    if (!fetchedData) {
      throw new Error(API_CALL_FAILED);
    }
  } catch (error) {
    throw new Error(
      error.message || error.response?.data?.message || API_CALL_FAILED
    );
  }

  return fetchedData;
};
