import axios from "axios";

const BASE_URL = "https://assigment-backend-8dln.onrender.com/newsletters";

export const subscribeNewsletter = async (email) => {
  const res = await axios.post(`${BASE_URL}/subscribe`, { email });
  return res.data;
};

export const getSubscribers = async (page = 0, size = 10) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
  return res.data;
};
