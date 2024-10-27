import axios from "axios";
import Cookies from "js-cookie";
import { SCHEMA } from "@/constant/schema";
const getBearerToken = () => {
  return Cookies.get("printzy_ac_token"); // Replace with your actual cookie name
};
const axiosInstance = axios.create({
  baseURL: `${SCHEMA.API_BASE}`, // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here
    config.headers["Authorization"] = `Bearer ${getBearerToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here
    return response;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error?.response?.data ?? "Something went wrong!");
  },
);
export default axiosInstance;
