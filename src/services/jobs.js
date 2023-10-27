import { axiosInstance } from "./axiosInstance";

export const fetchActiveJobs = (payload) =>
  axiosInstance.get("/roleRouter/getActiveRoles",payload);



  export const fetchArchivedJobs = () => {  
    return axiosInstance.post("/nc/getArchivedRoles",);
  
  }
  axiosInstance.get("/roleRouter/getActiveRoles",payload);



export const addAjob = (payload) =>
axiosInstance.post("/roleRouter/getActiveRoles",payload);


export const archiveSingleJob = (jobId) => {
  let payload = {
    roleId: jobId
  }
return axiosInstance.post("/roleRouter/archiveAJob",payload);
}


export const edtiAjob = (payload) => 
  axiosInstance.post("/roleRouter/getActiveRoles",payload);




export const getCanddiatesReferred = (jobId) => {
  const params = {
    roleId: jobId
  };
  
  return axiosInstance.post("/nc/getAllCandidates",{params});

}


export const getCandidatesApplied = (jobId) => {
  const params = {
    roleId: jobId
  };
  return axiosInstance.get("/nc/getAllCandidates", { params });

}



export const getCandidatesSelected = (jobId) => {
  const params = {
    roleId: jobId,
    statusId: 5
  };
  
  return axiosInstance.post("/nc/getAllCandidates",{params});

}


export const getCandidatesOffered = (jobId) => {
  const params = {
    roleId: jobId,
    statusId: 7
  };
  
  return axiosInstance.post("/nc/getAllCandidates",{params});

}

export const getCanddiatesJoined = (jobId) => {
  const params = {
    roleId: jobId,
    statusId: 9
  };
  
  return axiosInstance.post("/nc/getAllCandidates",{params});
}


export const getCandidatesPeroidComplete = (jobId) => {
  const params = {
    roleId: jobId,
    statusId: 10
  };
  
  return axiosInstance.post("/nc/getAllCandidates",{params});
}




