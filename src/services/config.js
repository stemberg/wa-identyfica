import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7048",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;