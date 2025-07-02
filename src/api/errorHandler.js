import { AxiosError } from "axios";

export const handleApiError = (error) => {
  if (error.response) {
    console.log(`API Error: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    console.log("API Error: No response received from server 1");
    console.log(error.request);
  } else {
    console.log("API Error:", error.message);
  }
  throw error;
};