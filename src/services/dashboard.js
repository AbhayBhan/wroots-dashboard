
import { axiosInstance } from "./axiosInstance";

export const getSuperAdminDashboard = (startDate, endDate, categoryId) => {
    let payload = {
        startDate: startDate,
        enddate: endDate,
        categoryId: categoryId
    }
   return axiosInstance.post("/dashboard/getSuperAdmin", payload);

} 
export const getRecruiterDashboard = (payload) => {
    let payload = {
        startDate: startDate,
        enddate: endDate,
        categoryId: categoryId,
        recruiterId: recruiterId
    }
   return axiosInstance.post("/dashboard/getRecruiterDashboard", payload);

}

export const getRecruiterWiseDashboard = (startDate, endDate) => {
    let payload = {
        startDate: startDate,
        enddate: endDate
    }
   return axiosInstance.post("/dashboard/getRecruiterDashboard", payload);

}
  
