import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://192.168.1.9:3005",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default httpClient;