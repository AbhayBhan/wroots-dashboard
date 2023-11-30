import { axiosInstance } from "./axiosInstance";

// Data Fetch API Functions
export const fetchAllCandidates = (
  page,
  filterTerm,
  latestStatus,
  categoryId,
  recruiterIds,
  startDate,
  endDate
) => {
  const params = {
    pageno: page || 1,
    q: filterTerm || null,
    latestStatus,
    categoryId: categoryId || null,
    recruiterIds: recruiterIds || null,
    // startDate,
    // endDate
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

export const fetchUnassignCandidates = (
  category,
  page,
  filterTerm,
  isManager
) => {
  const params = {
    categoryId: isManager ? null : category,
    pageno: page || 1,
    q: filterTerm || null,
  };
  return axiosInstance.get("/nc/getUnassignedCandidates", { params });
};

export const fetchArchivedCandidate = (pageno, categoryId) => {
  const params = {
    categoryId,
    pageno,
  };
  return axiosInstance.get("/nc/getArchivedCandidates", { params });
};

export const fetchAppliedJobs = (candidateId) => {
  const params = {
    candidateId,
  };
  axiosInstance.get("/candidate/getJobsApplied", { params });
};

// Data Manipulation API Functions
export const assignCandidate = (payload) =>
  axiosInstance.post("/candidate/assignStatus", payload);

export const assignCandidateInBulk = (payload) =>
  axiosInstance.post("/candidate/assignStatusinBulk", payload);

export const updateCandidate = (payload) =>
  axiosInstance.post("/location/updatelocation", payload);

export const createCandidate = (payload) =>
  axiosInstance.post("/candidate/insertCandidate", payload);

export const deleteCandidate = (payload) =>
  axiosInstance.post("/location/deletelocation", payload);

export const deactivateCandidate = (payload) =>
  axiosInstance.post("/candidate/deactivateCandidate", payload);

export const createProcessing = (payload) =>
  axiosInstance.post("/newcp/newCP", payload);

export const deleteProcessing = (payload) =>
  axiosInstance.post("/newcp/deleteCandidatehistory", payload);

export const editCandidateDetails = (payload) =>
  axiosInstance.post("/candidate/editCandidates", payload);

// Data Export API Functions

export const exportMyCandidates = (categoryId, recruiterId) => {
  const url = `https://wroots-backend.onrender.com/candidate/getCandidateExporter?categoryId=${categoryId}&recruiterId=${recruiterId}`;
  window.open(url, "_blank");
};

export const exportArchivedCandidates = (categoryId, recruiterId) => {
  const url = `https://wroots-backend.onrender.com/candidate/getArchivedExporter?categoryId=${categoryId}&recruiterId=${recruiterId}`;
  window.open(url, "_blank");
};

export const exportAllCandidates = (categoryId, recruiterId, latestStatus) => {
  const queryParams = [];
  if (categoryId) {
    queryParams.push(`categoryId=${categoryId}`);
  }
  if (recruiterId) {
    queryParams.push(`recruiterId=${recruiterId}`);
  }
  if (latestStatus) {
    queryParams.push(`latestStatus=${latestStatus}`);
  }

  const url = `https://wroots-backend.onrender.com/candidate/getCandidateExporter${
    queryParams.length > 0 ? "?" + queryParams.join("&") : ""
  }`;

  window.open(url, "_blank");
};
