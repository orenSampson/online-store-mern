import axios from "axios";

import { API_CALL_FAILED } from "../store/constants/messages";

export const requestGetProducts = async (payload) => {
  let fetchedData;
  try {
    const config = {
      headers: {
        category: payload.category,
        page: payload.page,
      },
    };
    fetchedData = await axios.get(
      "http://localhost:8080/api/products/getproducts",
      config
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
