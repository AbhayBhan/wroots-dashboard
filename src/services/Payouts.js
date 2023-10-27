import { axiosInstance } from "./axiosInstance";

export const getPendingPayouts = (page) =>  {
  let params = {
    paymentType: "due",
    pageno: page
  }
 return   axiosInstance.get("/payments/payments", {params});
}

export const getCompletedPayouts = (page) =>  {
    let params = {
      paymentType: "comp",
      pageno: page
    }
   return   axiosInstance.get("/payments/payments", {params});
  }

export const approveAPayout = (payload) =>
  axiosInstance.post("/payments/createPayment", payload);
