// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://sentra-psic.onrender.com", // change if your backend uses another host/port
  headers: {
    "Content-Type": "application/json",
  },
});

// helper to attach token dynamically
export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

export default API;