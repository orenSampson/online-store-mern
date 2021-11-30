import axios from "axios";

import { API_CALL_FAILED } from "../store/constants/messages";

export const requestGetCategories = async () => {
  let fetchedData;
  try {
    fetchedData = await axios.get("/api/categories/getcategories");

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
