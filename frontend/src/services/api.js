import axios from "axios";

const API = axios.create({
  baseURL: "https://spam-mail-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkEmail = async (email) => {
  const response = await API.post("/api/emails/check", {
    email,
  });

  return response.data;
};

export const getHistory = async () => {
  const response = await API.get("/api/history");

  return response.data;
};

export default API;