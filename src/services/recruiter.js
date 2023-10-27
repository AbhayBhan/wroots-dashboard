import { axiosInstance } from "./axiosInstance";

export const fetchRecruiters = (page) => {
  const params = {
    pageno: page || 0,
  };
  return axiosInstance.post("/recruiter/getAllRecruiters", { params });
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
