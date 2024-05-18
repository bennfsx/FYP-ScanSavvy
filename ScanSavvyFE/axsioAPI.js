import axios from "axios";

// Create an instance of axios with the API base URL
const axiosAPI = axios.create({
  baseURL: "http://cicadahome.tplinkdns.com:6001",
  // baseURL: "http://127.0.0.1:6001",
});

export default axiosAPI;
