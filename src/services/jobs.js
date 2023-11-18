import { axiosInstance } from "./axiosInstance";

export const fetchActiveJobs = () =>
  axiosInstance.get("/roleRouter/getActiveRoles");

export const fetchArchivedJobs = () => {
  return axiosInstance.post("/nc/getArchivedRoles");
};

export const addAjob = (payload) =>
  axiosInstance.post("/roleRouter/getActiveRoles", payload);

export const archiveSingleJob = (jobId) => {
  let payload = {
    roleId: jobId,
  };
  return axiosInstance.post("/roleRouter/archiveAJob", payload);
};

export const edtiAjob = (payload) =>
  axiosInstance.post("/roleRouter/getActiveRoles", payload);

export const getCanddiatesReferred = (jobId) => {
  const params = {
    roleId: jobId,
  };

  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const getCandidatesApplied = (jobId, page) => {
  const params = {
    roleId: jobId,
    pageno: page || 1,
  };
  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const getCandidatesSelected = (jobId, page) => {
  const params = {
    roleId: jobId,
    statusId: 5,
    pageno: page || 1,
  };

  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const getCandidatesOffered = (jobId, page) => {
  const params = {
    roleId: jobId,
    statusId: 7,
    pageno: page || 1,
  };

  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const getCanddiatesJoined = (jobId, page) => {
  const params = {
    roleId: jobId,
    statusId: 9,
    pageno: page || 1,
  };

  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const getCandidatesPeroidComplete = (jobId, page) => {
  const params = {
    roleId: jobId,
    statusId: 10,
    pageno: page || 1,
  };

  return axiosInstance.get("/nc/getAllCandidates", { params });
};

export const sendPush = (roleId) => {
  const params = {
    roleId: roleId || null,
  };

  return axiosInstance.get("/roleRouter/sendPush", {
    params,
  });
};
