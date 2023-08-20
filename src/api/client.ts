import axios from "axios";
const client = axios.create({
  baseURL: process.env.NEXT_API_URL || "http://localhost:3000",
});
client.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers!.Authorization = `Token ${localStorage.getItem("token")}`;
  }
  return config;
});

export default client;
