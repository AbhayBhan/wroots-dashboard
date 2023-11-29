import { axiosInstance } from "./axiosInstance";

export const fetchActiveJobs = () =>
  axiosInstance.get("/roleRouter/getActiveRoles");

export const fetchArchivedJobs = () => {
  return axiosInstance.post("/nc/getArchivedRoles");
};

export const addAjob = (payload) =>
  axiosInstance.post("/roleRouter/getActiveRoles", payload);

export const deleteJob = (payload) =>
  axiosInstance.post("/roleRouter/deleteRole", payload);

export const archiveSingleJob = (payload) =>
  axiosInstance.post("/roleRouter/archiveAJob", payload);

export const editJob = (payload) =>
  axiosInstance.post("/roleRouter/editRole", payload);

export const getSingleJob = (id) =>
  axiosInstance.get(`/roleRouter/getAjob/${id}`);

export const getCanddiatesReferred = (jobId) => {
  const params = {
    roleId: jobId,
  };
  return axiosInstance.get("/nc/getCandiatesForJobSubdetails", { params });
};

export const getCandidatesApplied = (jobId) => {
  const params = {
    roleId: jobId,
  };
  return axiosInstance.get("/nc/getCandiatesForJobSubdetails", { params });
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
    latestStatus : "Offered"
  };

  return axiosInstance.get("/nc/getCandiatesForJobSubdetails", { params });
};

export const getCanddiatesJoined = (jobId) => {
  const params = {
    roleId: jobId,
    latestStatus : "Joined"
  };

  return axiosInstance.get("/nc/getCandiatesForJobSubdetails", { params });
};

export const getCandidatesPeroidComplete = (jobId) => {
  const params = {
    roleId: jobId,
    latestStatus : "Period_complete"
  };

  return axiosInstance.get("/nc/getCandiatesForJobSubdetails", { params });
};

export const sendPush = (roleId) => {
  const params = {
    roleId: roleId || null,
  };

  return axiosInstance.get("/roleRouter/sendPush", {
    params,
  });
};
