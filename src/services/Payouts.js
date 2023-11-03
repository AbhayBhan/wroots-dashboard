import { axiosInstance } from "./axiosInstance";
import axios from "axios";

export const getPendingPayouts = (page) =>  {
  let params = {
    paymentType: "due",
    pageno: page
  }

  //This one was not working
//  return   axiosInstance.get("/payments/payments", {params});

// So i made it this way
 return axios.get("https://wroots-backend.onrender.com/payments/payments?paymentType=due&pageno=0");

}

export const getCompletedPayouts = (page) =>  {
    let params = {
      paymentType: "comp",
      pageno: page
    }
  //  return   axiosInstance.get("/payments/payments", {params});
 return axios.get("https://wroots-backend.onrender.com/payments/payments?paymentType=comp&pageno=0");
  }

export const approveAPayout = (payload) =>{
  // axiosInstance.post("/payments/createPayment", payload);
 return axios.post("https://wroots-backend.onrender.com/createPayment/createPayment", payload);
}
