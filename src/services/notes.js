import { axiosInstance } from "./axiosInstance";

export const getAllNotes = (candidateId) => {
    let p = {
        candidateId: candidateId
    }
   return axiosInstance.post("/note/getNotesForACandidate", p);
}
export const updateNote = (payload) =>
  axiosInstance.post("/note/updateNote", payload);

export const addNote = (payload) => {
   return axiosInstance.post("/note/createNote", payload);
}

export const deleteNote = (payload) =>
  axiosInstance.post("/note/deletNote", payload);

