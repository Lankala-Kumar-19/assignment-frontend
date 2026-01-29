import axios from "axios";

const BASE_URL = "https://assigment-backend-8dln.onrender.com/contact-forms";

export const submitContactForm = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const getContactForms = async (page = 0, size = 10) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
  return res.data;
};
