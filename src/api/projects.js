import axios from "axios";

const BASE_URL = "https://assigment-backend-8dln.onrender.com/projects";

export const getProjects = async (page = 0, size = 11) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/id/${id}`);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, data);
  return res.data;
};

export const getProjectByName = async (name) => {
  const res = await axios.get(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  return res.data;
};

