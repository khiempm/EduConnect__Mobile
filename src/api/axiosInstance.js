import axios from "axios";
import { handleApiError } from "./errorHandler.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
const axiosInstance = axios.create({
  baseURL: "https://educonnect-qz6g.onrender.com/api/",//192.168.176.3
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log("Bad Request");
          break;
        case 401:
          console.log("Unauthorized - Invalid credentials");
          break;
        case 403:
          console.log("Forbidden - Access denied");
          break;
        case 404:
          console.log("Resource not found");
          break;
        case 429:
          console.log("Too Many Requests - Rate limit exceeded");
          break;
        case 500:
          console.log("Server error occurred");
          break;
        default:
          console.log(`Unhandled status code: ${error.response.status}`);
      }
    } else if (error.request) {
      console.log("Network Error - No response received");
    } else {
      console.log("Request setup error:", error.message);
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
