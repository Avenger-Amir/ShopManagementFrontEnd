// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9098/api", // adjust backend URL if needed
});

export default api;
