
import { axiosInstance } from "./axiosInstance";

export const getSuperAdminDashboard = (payload) => {
   return axiosInstance.post("/dashboard/getDashboardData", payload);
} 

export const getRecruiterDashboard = (payload) => {
   return axiosInstance.post("/dashboard/getRouterDashboardForRecruiter", payload);

}
  
