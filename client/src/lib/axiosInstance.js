import axios from "axios";

const axiosInstance = axios.create({
  baseURL:`${import.meta.process.VITE_SERVER_HOST}/api`,
  withCredentials: true,
});

export default axiosInstance;   