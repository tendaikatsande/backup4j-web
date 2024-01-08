import axios from "axios";

// Create a new instance of Axios with a custom configuration
const axiosConfig = axios.create({
  baseURL: "http://localhost:8080", 
});

export default axiosConfig;
