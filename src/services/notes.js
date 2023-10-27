import { MdOutlineKeyboardReturn } from "react-icons/md";
import { axiosInstance } from "./axiosInstance";

export const getAllNotes = (candidateId) => {
    let p = {
        candidateId: candidateId
    }
   return axiosInstance.post("/note/getNotesForACandidate", p);
}
export const updateCategory = (payload) =>
  axiosInstance.post("/category/updateCategory", payload);

export const AddCategory = (candidateId, recruiterId, note) => {

   let p =  {
        "candidateId":candidateId,
        "recruiterId":recruiterId,
        "noteString":note
    }
   return axiosInstance.post("/note/createNote", p);

}

export const deleteCategory = (payload) =>
  axiosInstance.post("/category/deletCategory", payload);

