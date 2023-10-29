import { axiosInstance } from "./axiosInstance";

export const fetchAllCandidates = (page) => {
  const params = {
    pageno: page || 1,
  };
  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const fetchSingleCandidate = (id) => {
  const params = {
    candidateId: id || null,
  };
  return axiosInstance.get("/nc/getSingleCandidate", { params });
};

export const fetchMyCandidates = (recruiterId, page) => {
  const params = {
    recruiterId: recruiterId || null,
    pageno: page || 1,
  };
  return axiosInstance.get("/nc/getMyCandidiates", { params });
};

export const fetchUnassignCandidates = (categoryId, page) => {
  const params = {
    categoryId: categoryId || null,
    pageno: page || 0,
  };
  return axiosInstance.get("/nc/getUnassignedCandidates", { params });
};

export const assignCandidate = (payload) =>
  axiosInstance.post("/candidate/assignStatus", payload);

export const updateCandidate = (payload) =>
  axiosInstance.post("/location/updatelocation", payload);

export const addCandidate = (payload) =>
  axiosInstance.post("/location/addlocation", payload);

export const deleteCandidate = (payload) =>
  axiosInstance.post("/location/deletelocation", payload);

export const createProcessing = (payload) =>
  axiosInstance.post("/cp/createNewProcessing", payload);
