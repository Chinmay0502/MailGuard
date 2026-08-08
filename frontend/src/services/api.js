import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001",
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

export default API;