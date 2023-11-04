import { axiosInstance } from "./axiosInstance";

export const getAllNotes = (candidateId) => {
    let p = {
        candidateId: candidateId
    }
   return axiosInstance.post("/note/getNotesForACandidate", p);
}
export const updateCategory = (payload) =>
  axiosInstance.post("/category/updateCategory", payload);

export const addNote = (payload) => {
   return axiosInstance.post("/note/createNote", payload);
}

export const deleteCategory = (payload) =>
  axiosInstance.post("/category/deletCategory", payload);

