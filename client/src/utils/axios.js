import axios from "axios";

// configure axios instance defaults
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.replace("/sign-in");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
