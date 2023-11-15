import { axiosInstance } from "./axiosInstance";

export const fetchAllCandidates = (page, filterTerm, latestStatus, categoryId) => {
  const params = {
    pageno: page || 1,
    q: filterTerm || null,
    latestStatus,
    categoryId : categoryId || null
  };
  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const fetchSingleCandidate = (id) => {
  const params = {
    candidateId: id || null,
  };
  return axiosInstance.get("/nc/getSingleCandidate", { params });
};

export const fetchMyCandidates = (
  recruiterId,
  page,
  filterTerm,
  latestStatus
) => {
  const params = {
    recruiterId: recruiterId || null,
    pageno: page || 1,
    q: filterTerm || null,
    latestStatus,
  };
  return axiosInstance.get("/nc/getMyCandidiates", { params });
};

export const fetchUnassignCandidates = (category, page, filterTerm, isManager) => {
  const params = {
    categoryId: isManager ? null : category,
    pageno: page || 1,
    q: filterTerm || null,
  };
  return axiosInstance.get("/nc/getUnassignedCandidates", { params });
};

export const assignCandidate = (payload) =>
  axiosInstance.post("/candidate/assignStatus", payload);
  
export const assignCandidateInBulk = (payload) =>
  axiosInstance.post("/candidate/assignStatusinBulk", payload);

export const updateCandidate = (payload) =>
  axiosInstance.post("/location/updatelocation", payload);

export const createCandidate = (payload) =>
  axiosInstance.post("/candidate/addcandidate", payload);

export const deleteCandidate = (payload) =>
  axiosInstance.post("/location/deletelocation", payload);

export const deactivateCandidate = (payload) => 
  axiosInstance.post("/candidate/deactivateCandidate", payload);

export const createProcessing = (payload) =>
  axiosInstance.post("/newcp/newCP", payload);
