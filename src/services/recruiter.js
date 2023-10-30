import { axiosInstance } from "./axiosInstance";

export const fetchRecruiters = (payload) => {
  return axiosInstance.post("/recruiter/getAllRecruiters",payload);
};
export const fetchCandidatesHandled = (payload) => {
  return axiosInstance.post("/recruiter/getCandidatesHandled", payload);
};

export const createRecruiter = (payload) => {
  return axiosInstance.post("/recruiter/insertRecruiter", payload);
};

export const updateRecruiter = (payload) => {
  return axiosInstance.post("/recruiter/editRecruiter", payload);
};
