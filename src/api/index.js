import axios from "axios";

const api = axios.create({
  baseURL: "https://lentera-be.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
