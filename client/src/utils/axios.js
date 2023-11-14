import axios from "axios";

// configure axios instance defaults
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
