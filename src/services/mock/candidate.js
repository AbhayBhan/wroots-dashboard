import axios from "axios";

export const getAllCandidates = async (page = 0, filterTerm = "") => {
  const params = {
    params: { _page: page, ...(filterTerm && { name: filterTerm }) },
  };
  return await axios.get(`http://localhost:8000/candidates`, params);
};
export const getAllNotes = async (page = 0) => {
  return await axios.get(`http://localhost:8000/notes?_page=${page}`);
};
export const getAllProcessing = async () => {
  return await axios.get(`http://localhost:8000/processing`);
};

export const addNote = async (payload) => {
  return await axios.post(`http://localhost:8000/notes`, payload);
};
