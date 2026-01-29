import axios from "axios";

const BASE_URL = "https://assigment-backend-8dln.onrender.com/clients";

export const getClients = async (page = 0, size = 10) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
  return res.data;
};

export const createClient = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/by-id/${id}`);
  return res.data;
};

export const updateClient = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, data);
  return res.data;
};
